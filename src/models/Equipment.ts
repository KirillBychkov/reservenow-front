import { User } from './User';

export interface Equipment {
  id: number;
  user: User;
  name: string;
  description?: string;
  price_per_hour: number;
  created_at: Date | string;
  updated_at: Date | string;
}
