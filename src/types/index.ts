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
