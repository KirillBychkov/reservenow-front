import { Equipment } from './Equipment';
// import { RentalObject } from './RentalObject';
// import { Organization } from './Organization';
import { Trainer } from './Trainer';
import { User } from './User';
import { Order } from './Order';

export interface Reservation {
  id: number;
  user: User;
  trainer: Trainer;
  // rental_object: RentalObject;
  equipment: Equipment;
  // organization: Organization;
  reservation_time_start: Date | string;
  reservation_time_end: Date | string;
  description?: string;
  price: number;
  order: Order;
  created_at: Date | string;
  updated_at: Date | string;
}
