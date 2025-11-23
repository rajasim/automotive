export interface Option {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string }>;
  withCount?: boolean;
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  duration: string;
  targetAudience: string;
  price: number;
  currency: string;
  image: string;
  topics: string[];
  eligibility?: string[];
  learningOutcomes?: string[];
  benefits?: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface EnrollmentFormData {
  name: string;
  email: string;
  phone: string;
  education: string;
  experience: string;
  message?: string;
}

export interface Order {
  id: string;
  user_id?: string;
  items: OrderItem[];
  total_amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  stripe_session_id?: string;
  stripe_payment_intent_id?: string;
  customer_email?: string;
  customer_name?: string;
  completed_at?: string;
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
}
