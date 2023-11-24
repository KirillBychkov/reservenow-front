import { WeekWorkingHours } from '@/types/weekWorkingHours';

export interface Trainer extends WeekWorkingHours {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  description: string;
  image?: string;
  hired_at: Date | string;
  resigned_at?: Date | string;
  created_at: Date | string;
  updated_at: Date | string;
  price_per_hour: number;
}
