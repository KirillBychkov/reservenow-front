import { WeekWorkingHours } from '@/types/weekWorkingHours';
import { Account, User } from './User';

export interface Trainer extends WeekWorkingHours {
  id: number;
  user: User;
  first_name: string;
  last_name: string;
  phone: string;
  description: string;
  image?: string;
  hired_at: Date | string;
  resigned_at?: Date | string;
  account: Account;
  created_at: Date | string;
  updated_at: Date | string;
  price_per_hour: number;
}
