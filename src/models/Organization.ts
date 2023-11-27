import { WeekWorkingHours } from '@/types/weekWorkingHours';
import { User } from './User';
import { RentalObject } from './RentalObject';

export interface Organization extends WeekWorkingHours {
  id: number;
  name: string;
  user: User;
  rental_objects: RentalObject[];
  // TODO: add reservations like reservations: IReservation[];
  description?: string;
  photo?: string;
  phone: string;
  address: string;
  created_at: string;
  update_at: string;
}
