import { OrderStatus } from '@/types/enums/order';
import { PaymentMethod } from '@/types/enums/payment';
import { CreateClientDTO } from './ClientRequests';

export interface CreateReservationDTO {
  trainer_id?: number;
  rental_object_id?: number;
  equipment_id?: number;
  reservation_time_start: Date | string;
  reservation_time_end: Date | string;
  description?: string;
}

export interface CreateOrderDTO {
  client: CreateClientDTO;
  reservations: CreateReservationDTO[];
  status: OrderStatus;
  payment_method: PaymentMethod;
}

export interface UpdateOrderDTO extends Partial<CreateOrderDTO> {}
