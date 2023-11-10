import { WeekWorkingHours } from '@/types/weekWorkingHours';
import { IUser } from './IUser';
import { IObject } from './IObject';

export interface IOrganization extends WeekWorkingHours {
  id: number;
  name: string;
  user: IUser;
  rental_objects: IObject[];
  description: string;
  photo: string;
  phone: string;
  address: string;
  created_at: string;
  update_at: string;
}
