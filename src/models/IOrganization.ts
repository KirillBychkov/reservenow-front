import { IUser } from './IUser';

export interface IOrganization {
  id: number;
  name: string;
  user: IUser[];
  description: string;
  photo: string;
  phone: string;
  address: string;
  monday_start_hours: number;
  monday_end_hours: number;
  tuesday_start_hours: number;
  tuesday_end_hours: number;
  wednesday_start_hours: number;
  wednesday_end_hours: number;
  thursday_start_hours: number;
  thursday_end_hours: number;
  friday_start_hours: number;
  friday_end_hours: number;
  saturday_start_hours: number;
  saturday_end_hours: number;
  sunday_start_hours: number;
  sunday_end_hours: number;
  created_at: string;
  update_at: string;
}