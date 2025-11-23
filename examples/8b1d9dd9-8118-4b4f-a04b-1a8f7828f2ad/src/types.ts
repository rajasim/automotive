import { LucideIcon } from 'lucide-react';

export interface ExpenseCategory {
  id: number;
  name: string;
  icon: LucideIcon;
  color: string;
}

export interface Expense {
  id: number;
  category: ExpenseCategory;
  amount: number;
  date: Date;
}