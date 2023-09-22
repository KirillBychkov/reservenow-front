import { UserStatus } from '@/types/user';
import { IRole } from './IRole';

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
}

export interface ICreateUserDTO {
  email: string;
  status: UserStatus;
  user: IUserDTO;
}

export interface IAccount {
  id: number;
  email: string;
  password?: string;
  user?: IUser;
  manager?: IUser;
  trainer?: IUser;
  role: IRole;
  status: UserStatus;
  created_at: Date;
  updated_at: Date;
}
