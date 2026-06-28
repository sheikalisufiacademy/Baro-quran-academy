import React, { useState, useEffect, useRef } from "react";
import { Send, X, MessageSquare, Bot, User, Check, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

const BOT_RESPONSES = [
  {
    keywords: ["hi", "hello", "asc", "salaam", "assalamu", "how", "baro"],
    response: "Waalaykum Assalaam Warahmatullah! Welcome to Baro Quran Academy. How can I help you take your Quran & Arabic studies to the next level today?",
  },
  {
    keywords: ["price", "cost", "lacag", "qiimo", "payment", "membership"],
    response: "Our premium 1-on-1 programs start at just $20-$30/Month. All programs include personalized study plans, 24/7 scheduler, and official graduation certificates verified on the blockchain!",
  },
  {
    keywords: ["trial", "free", "tijaabo", "bilaash", "class", "book"],
    response: "You can book a fully free 45-minute trial class with any of our expert male/female teachers! Click the 'Book Free Trial' button in the main navigation or inside any course card.",
  },
  {
    keywords: ["teacher", "macalin", "sheikh", "ustadh", "ustaad", "expert"],
    response: "We have over 25+ certified Quran scholars from Al-Azhar, Islamic University of Madinah, and Umm Al-Qura. Both male and female instructors are available for kids and adults.",
  },
  {
    keywords: ["child", "kids", "carruur", "adult", "da'da", "old"],
    response: "Yes! We have specialized curriculum customized for young children (starting age 4) utilizing modern interactive tools, as well as executive classes for busy adults.",
  },
];

const DEFAULT_RESPONSE = "Thank you for reaching out! To assist you best, you can register for our Free Trial class, or direct chat with our Head of Admissions via WhatsApp at +251 999 451 777. Is there a specific program you are interested in?";

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Assalamu Alaykum! I am your Ustadh AI Counselor. Ask me anything about our classes, pricing, scheduling, or certificates!",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: input,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMessage]);
    const query = input.toLowerCase();
    setInput("");
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      let matchedResponse = DEFAULT_RESPONSE;

      for (const item of BOT_RESPONSES) {
        if (item.keywords.some((kw) => query.includes(kw))) {
          matchedResponse = item.response;
          break;
        }
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: matchedResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Action Buttons Area */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
        {/* WhatsApp Button Wrapper */}
        <div className="pointer-events-auto">
          <a
            id="floating-whatsapp-trigger"
            href="https://wa.me/251999451777?text=Assalamu%20Alaykum%20Baro%20Quran%20Academy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 group hover:shadow-emerald-500/30"
            title="Nagala soo xiriir WhatsApp"
          >
            <span className="absolute right-full mr-3 rounded-xl bg-stone-900/95 px-3 py-1.5 text-[10px] font-bold text-white opacity-0 transition duration-300 group-hover:opacity-100 whitespace-nowrap pointer-events-none shadow-md border border-white/5">
              WhatsApp Direct Support
            </span>
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 2c-5.511 0-9.99 4.479-9.99 9.99 0 2.08.636 4.016 1.733 5.62l-1.134 4.148 4.254-1.116c1.554.954 3.372 1.512 5.32 1.512 5.511 0 9.99-4.479 9.99-9.99s-4.479-9.99-9.99-9.99zm5.348 14.152c-.226.636-1.116 1.171-1.84 1.258-.619.075-1.423.111-3.69-.836-2.906-1.212-4.739-4.168-4.885-4.364-.146-.195-1.185-1.579-1.185-3.009 0-1.43.748-2.133.1013-2.428-.266-.295-.583-.37-.778-.37-.195 0-.39.012-.562.024-.515.035-.86.291-1.116.54-.367.366-.991 1.096-.991 2.67s1.144 3.1 1.299 3.313c.155.213 2.25 3.435 5.451 4.819.762.329 1.356.525 1.82.673.766.243 1.464.209 2.015.127.615-.092 1.84-.753 2.101-1.442.261-.69.261-1.282.183-1.402-.078-.12-.284-.195-.592-.35-.308-.155-1.82-.898-2.101-1.001-.281-.102-.486-.155-.69.155-.205.308-.795.998-.975 1.205-.18.207-.36.231-.669.075-.309-.155-1.303-.481-2.482-1.534-.918-.82-1.538-1.832-1.718-2.141-.18-.309-.019-.476.136-.63.139-.138.309-.36.463-.54.154-.18.205-.309.308-.515.103-.206.051-.386-.026-.54-.077-.155-.69-1.666-.945-2.282-.249-.6-.547-.519-.748-.529-.193-.01-.414-.012-.636-.012s-.583.084-.888.423c-.305.339-1.168 1.144-1.168 2.788z" />
            </svg>
          </a>
        </div>

        {/* Ustadh AI Advisor Trigger Button */}
        <div className="pointer-events-auto">
          <button
            id="ustadh-ai-chat-trigger"
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-tr from-emerald-600 to-emerald-800 text-white shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group relative border border-emerald-400/30"
          >
            {isOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
            {!isOpen && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500 text-[8px] font-bold text-stone-900 justify-center items-center">
                  1
                </span>
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Interactive Counselor Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-40 w-80 sm:w-96 h-[480px] bg-stone-900/95 backdrop-blur-md rounded-2xl border border-stone-800 flex flex-col overflow-hidden shadow-2xl shadow-emerald-950/40 text-stone-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-800 to-emerald-950 p-4 border-b border-stone-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-amber-500/20 p-2 border border-amber-500/30 text-amber-400">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-white flex items-center gap-1.5">
                    <span>Ustadh AI Advisor</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-semibold tracking-wider flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    ONLINE COUNSELOR
                  </span>
                </div>
              </div>

              <button
                id="close-chat-window-btn"
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-stone-400 hover:bg-white/10 hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Helper Prompts */}
            <div className="bg-stone-950/60 p-2.5 border-b border-stone-800 flex items-center gap-2 overflow-x-auto scrollbar-none whitespace-nowrap text-[10px]">
              {[
                { label: "💰 Qiimaha (Prices)", text: "What are the program prices?" },
                { label: "⭐ Bilaash (Trial Class)", text: "How can I book a free trial class?" },
                { label: "📚 Macalimiinta (Teachers)", text: "Who are your teachers?" },
                { label: "👧 Carruurta (Kids curriculum)", text: "Do you have classes for kids?" }
              ].map((pill, i) => (
                <button
                  key={i}
                  id={`chat-pill-${i}`}
                  onClick={() => {
                    setInput(pill.text);
                  }}
                  className="rounded-full bg-stone-800 hover:bg-emerald-800 text-stone-300 hover:text-white px-3 py-1.5 border border-stone-700/50 transition cursor-pointer"
                >
                  {pill.label}
                </button>
              ))}
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg) => {
                const isBot = msg.sender === "bot";
                return (
                  <div key={msg.id} className={`flex gap-2.5 ${isBot ? "" : "flex-row-reverse"}`}>
                    <div className={`h-8 w-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                      isBot ? "bg-amber-500/10 text-amber-400 border border-amber-500/20" : "bg-emerald-600 text-white"
                    }`}>
                      {isBot ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
                    </div>
                    <div className={`flex flex-col max-w-[70%] ${isBot ? "" : "items-end"}`}>
                      <div className={`rounded-2xl p-3 text-xs leading-relaxed ${
                        isBot ? "bg-stone-800 text-stone-100 rounded-tl-none border border-stone-700/30" : "bg-emerald-800 text-white rounded-tr-none"
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[9px] text-stone-500 mt-1 flex items-center gap-1">
                        <span>{msg.timestamp}</span>
                        {!isBot && <Check className="w-3 h-3 text-emerald-500" />}
                      </span>
                    </div>
                  </div>
                );
              })}

              {isTyping && (
                <div className="flex gap-2.5">
                  <div className="h-8 w-8 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-stone-800 rounded-2xl rounded-tl-none p-3 border border-stone-700/30">
                    <span className="flex items-center gap-1">
                      <span className="h-1.5 w-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-3 bg-stone-950/80 border-t border-stone-800 flex gap-2">
              <input
                id="live-chat-input-field"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ku qor halkan / Write your message..."
                className="flex-1 rounded-xl bg-stone-900 border border-stone-800 p-3 text-xs text-stone-100 placeholder-stone-500 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600/30"
              />
              <button
                id="live-chat-send-btn"
                type="submit"
                className="rounded-xl bg-emerald-700 p-3 text-white hover:bg-emerald-600 transition flex items-center justify-center shadow-lg shadow-emerald-950/30"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
