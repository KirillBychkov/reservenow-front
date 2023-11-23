import { WeekWorkingHours } from '@/types/weekWorkingHours';
// import { IOrganization } from './IOrganization';

export interface IObject extends WeekWorkingHours {
  id: number;
  price_per_hour: number;
  // organization: IOrganization;
  name: string;
  description?: string;
  photo?: string;
  phone: string;
  address: string;
  created_at: Date | string;
  updated_at: Date | string;
}
