export interface GmailMessage {
  id: string;
  threadId: string;
  snippet: string;
  subject: string;
  from: string;
  to: string;
  date: string;
  body: string;
}

export async function fetchGmailMessages(accessToken: string, maxResults = 10): Promise<GmailMessage[]> {
  try {
    const listRes = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=${maxResults}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: "application/json",
        },
      }
    );

    if (!listRes.ok) {
      throw new Error(`Failed to list messages: ${listRes.statusText}`);
    }

    const listData = await listRes.json();
    if (!listData.messages || listData.messages.length === 0) {
      return [];
    }

    // Fetch details of each message in parallel
    const detailPromises = listData.messages.map(async (msg: { id: string }) => {
      try {
        const detailRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (!detailRes.ok) return null;
        const detailData = await detailRes.json();

        // Extract headers
        const headers = detailData.payload?.headers || [];
        const subject = headers.find((h: any) => h.name.toLowerCase() === "subject")?.value || "No Subject";
        const from = headers.find((h: any) => h.name.toLowerCase() === "from")?.value || "Unknown";
        const to = headers.find((h: any) => h.name.toLowerCase() === "to")?.value || "Unknown";
        const dateHeader = headers.find((h: any) => h.name.toLowerCase() === "date")?.value || "";
        const formattedDate = dateHeader ? new Date(dateHeader).toLocaleString() : "Unknown Date";

        // Extract body (from payload.body.data or parts)
        let body = "";
        if (detailData.payload?.body?.data) {
          body = decodeBase64(detailData.payload.body.data);
        } else if (detailData.payload?.parts) {
          // Look for text/html or text/plain
          const parts = detailData.payload.parts;
          const htmlPart = parts.find((p: any) => p.mimeType === "text/html");
          const plainPart = parts.find((p: any) => p.mimeType === "text/plain");
          
          if (htmlPart?.body?.data) {
            body = decodeBase64(htmlPart.body.data);
          } else if (plainPart?.body?.data) {
            body = decodeBase64(plainPart.body.data);
          }
        }

        if (!body) {
          body = detailData.snippet || "No body content available.";
        }

        return {
          id: msg.id,
          threadId: detailData.threadId,
          snippet: detailData.snippet || "",
          subject,
          from,
          to,
          date: formattedDate,
          body,
        };
      } catch (err) {
        console.error(`Error fetching detail for message ${msg.id}:`, err);
        return null;
      }
    });

    const results = await Promise.all(detailPromises);
    return results.filter((r) => r !== null) as GmailMessage[];
  } catch (error) {
    console.error("fetchGmailMessages error:", error);
    throw error;
  }
}

export async function sendGmailMessage(
  accessToken: string,
  to: string,
  subject: string,
  body: string
): Promise<any> {
  try {
    const emailLines = [
      `To: ${to}`,
      `Subject: ${subject}`,
      "Content-Type: text/html; charset=utf-8",
      "MIME-Version: 1.0",
      "",
      body,
    ];

    const raw = btoa(unescape(encodeURIComponent(emailLines.join("\r\n"))))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");

    const response = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ raw }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to send email: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("sendGmailMessage error:", error);
    throw error;
  }
}

export async function deleteGmailMessage(accessToken: string, id: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}/trash`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to delete message: ${response.statusText}`);
    }

    return true;
  } catch (error) {
    console.error("deleteGmailMessage error:", error);
    throw error;
  }
}

function decodeBase64(data: string): string {
  try {
    // Replace base64url characters
    const base64 = data.replace(/-/g, "+").replace(/_/g, "/");
    return decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch (err) {
    console.error("decodeBase64 error:", err);
    try {
      return atob(data.replace(/-/g, "+").replace(/_/g, "/"));
    } catch {
      return "Unable to decode email content.";
    }
  }
}
