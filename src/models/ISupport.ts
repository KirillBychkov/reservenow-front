import { IUser } from './IUser';

export interface ISupport {
  id: number;
  user: IUser;
  file?: string;
  client_description: string;
  result_description?: string;
  status: string;
  created_at: Date | string;
  updated_at: Date | string;
}
