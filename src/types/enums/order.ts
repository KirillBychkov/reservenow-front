export enum OrderStatus {
  PENDING = 'pending',
  NOT_PAID = 'not_paid',
  PAID = 'paid',
  REJECTED = 'rejected',
}

export const OrderStatusOptions: OrderStatus[] = Object.values(OrderStatus);
