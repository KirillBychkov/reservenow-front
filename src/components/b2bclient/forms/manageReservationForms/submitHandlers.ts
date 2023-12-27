import { CreateClientDTO } from '@/models/requests/ClientRequests';
import { CreateReservationDTO } from '@/models/requests/OrderRequests';
import ordersStore from '@/store/ordersStore';
import { OrderStatus } from '@/types/enums/order';
import { PaymentMethod } from '@/types/enums/payment';
import { formatObjectOut } from '@/utils/formatters/formatObject';

type OrderFormData = {
  first_name: string;
  last_name: string;
  phone: string;
  description: string;
  payment: {
    value: PaymentMethod;
    label: string;
  };
  status: {
    value: OrderStatus;
    label: string;
  };
};

export const createOrder = async (
  values: OrderFormData,
  reservations: CreateReservationDTO[],
) => {
  const client: CreateClientDTO = {
    phone: values.phone,
    description: values.description,
    first_name: values.first_name,
    last_name: values.last_name,
  };

  const response = await ordersStore.createOrder({
    client: formatObjectOut(client),
    reservations,
    status: OrderStatus.PENDING,
    payment_method: values.payment.value,
  });

  return response;
};

export const editOrder = async (
  id: number,
  values: OrderFormData,
  reservations: CreateReservationDTO[],
) => {
  const client: CreateClientDTO = {
    phone: values.phone,
    description: values.description,
    first_name: values.first_name,
    last_name: values.last_name,
  };

  const response = await ordersStore.editOrder(id, {
    client: formatObjectOut(client),
    reservations,
    status: values.status.value,
    payment_method: values.payment.value,
  });

  return response;
};
