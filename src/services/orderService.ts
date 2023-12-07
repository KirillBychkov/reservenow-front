import $api from '@/http';
import { Filters } from '@/models/Filters';
import { Order } from '@/models/Order';
import {
  CreateOrderDTO,
  UpdateOrderDTO,
} from '@/models/requests/OrderRequests';
import { Orders } from '@/models/response/OrderResponse';
import { AxiosResponse } from 'axios';
export class OrderService {
  static async getOrders(
    filters: Omit<Filters, 'total'>,
    rentalObjectId?: number,
    equipmentId?: number,
    trainerId?: number,
  ): Promise<AxiosResponse<Orders>> {
    let path = `/order?limit=${filters.limit}&skip=${filters.skip}${
      filters.sort ? `&sort=${filters.sort}` : ''
    }${filters.search ? `&search=${filters.search}` : ''}`;
    // only one of these params can be used at a time
    if (rentalObjectId) {
      path += `&rental_object_id=${rentalObjectId}`;
    } else if (equipmentId) {
      path += `&equipment_id=${equipmentId}`;
    } else if (trainerId) {
      path += `&trainer_id=${trainerId}`;
    }
    return $api.get(path);
  }

  static async getOrderById(id: number): Promise<AxiosResponse<Order>> {
    return $api.get(`/order/${id}`);
  }

  static async addOrder(order: CreateOrderDTO): Promise<AxiosResponse<Order>> {
    return $api.post('/order', order);
  }

  static async editOrder(
    id: number,
    order: UpdateOrderDTO,
  ): Promise<AxiosResponse<Order>> {
    return $api.patch(`/order/${id}`, order);
  }

  static async deleteOrder(id: number): Promise<AxiosResponse<void>> {
    return $api.delete(`/order/${id}`);
  }
}
