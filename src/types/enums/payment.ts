export enum PaymentMethod {
  CASH = 'cash',
  CREDIT_CARD = 'credit_card',
}

export const PaymentTypeOptions: PaymentMethod[] = Object.values(PaymentMethod);
