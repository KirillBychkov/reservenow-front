import { OrderStatus, PaymentMethod } from '@/types/enums/order';
import { User } from './User';
import { Client } from './Client';
import { Reservation } from './Reservations';

export interface Order {
  id: number;
  user: User;
  status: OrderStatus;
  payment_method: PaymentMethod
  orders_sum: number;
  reservations: Reservation[]
  client: Client;
  created_at: Date | string;
  updated_at: Date | string;
}
