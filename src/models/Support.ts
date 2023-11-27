import { User } from './User';

export interface Support {
  id: number;
  user: User;
  file?: string;
  client_description: string;
  result_description?: string;
  status: string;
  created_at: Date | string;
  updated_at: Date | string;
}
