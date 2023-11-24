import { UserStatus } from '@/types/enums/user';
import { Role } from './Role';

export interface Account {
  id: number;
  email: string;
  password?: string;
  manager?: User;
  trainer?: User;
  role: Role;
  status: UserStatus;
  created_at: Date;
  updated_at: Date;
  user: User | null;
}

export interface UserDTO {
  first_name: string;
  last_name: string;
  phone: string;
  domain_url: string;
  image?: string;
  description?: string;
}

export interface User extends UserDTO {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  account: Account;
}
