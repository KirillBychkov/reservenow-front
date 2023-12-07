export enum OrderStatus {
  PENDING = 'pending',
  NOT_PAID = 'not_paid',
  PAID = 'paid',
  REJECTED = 'rejected',
}

export enum PaymentMethod {
  CASH = 'cash',
  CARD = 'card',
}

export const OrderStatusOptions: OrderStatus[] = Object.values(OrderStatus);
