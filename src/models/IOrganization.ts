import { WeekWorkingHours } from '@/types/weekWorkingHours';
import { IUser } from './IUser';

export interface IOrganization extends WeekWorkingHours {
  id: number;
  name: string;
  user: IUser[];
  description: string;
  photo: string;
  phone: string;
  address: string;
  created_at: string;
  update_at: string;
}
