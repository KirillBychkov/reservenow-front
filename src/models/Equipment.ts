import { User } from './User';

export interface Equipment {
  id: number;
  user: User;
  name: string;
  description?: string;
  price: number;
  created_at: Date | string;
  updated_at: Date | string;
}
