export interface Course {
  id: string;
  title: string;
  subTitle: string;
  description: string;
  rating: number;
  reviewCount: number;
  price: string;
  icon: string;
  image?: string;
  levelDetails: {
    level: string;
    topics: string[];
  }[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  course: string;
  avatarLetter: string;
}

export interface Registration {
  name: string;
  email: string;
  phone: string;
  course: string;
  level: string;
  preferredTime: string;
  notes?: string;
  country?: string;
  city?: string;
  whatsapp?: string;
  paymentPlan?: string;
  studentType?: "single" | "multiple";
  additionalStudents?: string[];
  generatedId?: string;
}
