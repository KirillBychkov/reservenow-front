import { OrderStatus } from '@/types/enums/order';
import { User } from './User';
import { Client } from './Client';

export interface Order {
  id: number;
  user: User;
  status: OrderStatus;
  client: Client;
  created_at: Date | string;
  updated_at: Date | string;
}
