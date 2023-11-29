import $api from '@/http';
import { Order } from '@/models/Order';
import {
  CreateOrderDTO,
  UpdateOrderDTO,
} from '@/models/requests/OrderRequests';
import { AxiosResponse } from 'axios';
export class OrderService {
  // TODO: add query params when api is ready
  static async getOrders(): Promise<AxiosResponse<Order[]>> {
    return $api.get('/order');
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
