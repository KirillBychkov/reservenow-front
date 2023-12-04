import { OrderStatus } from '@/types/enums/order';
import { User } from './User';
import { Client } from './Client';
import { PaymentMethod } from '@/types/enums/payment';
import { Reservation } from './Reservation';

export interface Order {
  id: number;
  user: User;
  status: OrderStatus;
  payment_method: PaymentMethod;
  order_sum: number;
  reservations: Reservation[];
  client: Client;
  created_at: Date | string;
  updated_at: Date | string;
}
