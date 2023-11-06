import { UserStatus } from '@/types/enums/user';
import { IRole } from './IRole';

export interface IAccount {
  id: number;
  email: string;
  password?: string;
  manager?: IUser;
  trainer?: IUser;
  role: IRole;
  status: UserStatus;
  created_at: Date;
  updated_at: Date;
  user: IUser | null;
}

export interface IUserDTO {
  first_name: string;
  last_name: string;
  phone: string;
  domain_url: string;
  image?: string;
  description?: string;
}

export interface IUser extends IUserDTO {
  id: number;
  created_at: Date | string;
  updated_at: Date | string;
  account: IAccount;
}
