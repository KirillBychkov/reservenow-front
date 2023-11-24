import { Account, User } from './User';

export interface Client {
  id: number;
  user: User;
  first_name: string;
  last_name: string;
  phone: string;
  account: Account;
  description?: string;
  created_at: Date | string;
  updated_at: Date | string;
}
