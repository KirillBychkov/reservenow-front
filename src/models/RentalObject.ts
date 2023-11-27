import { WeekWorkingHours } from '@/types/weekWorkingHours';
// import { Organization } from './Organization';

export interface RentalObject extends WeekWorkingHours {
  id: number;
  price_per_hour: number;
  // organization: Organization;
  name: string;
  description?: string;
  photo?: string;
  phone: string;
  address: string;
  created_at: Date | string;
  updated_at: Date | string;
}
