import { ClientStatus } from '@/types/enums/client';
import { Order } from './Order';
export interface Client {
  id: number;
  first_name: string;
  last_name: string;
  phone: string;
  status: ClientStatus;
  orders: Order[];
  description?: string;
  userId?: number;
  total_reservation_sum: number | null;
  total_reservation_amount: number;
  created_at: Date | string;
  updated_at: Date | string;
}
