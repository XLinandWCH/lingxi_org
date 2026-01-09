
export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN'
}

export interface User {
  email: string;
  role: UserRole;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  type: 'markdown' | 'block';
  coverImage?: string; // Base64 或 URL
}

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlight?: boolean;
}

export interface Plugin {
  id: string;
  name: string;
  description: string;
  author: string;
  category: string;
  stars: number;
}
