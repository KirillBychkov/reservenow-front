import $api from '@/http';
import { Filters } from '@/models/Filters';
import { Order } from '@/models/Order';
import {
  CreateOrderDTO,
  UpdateOrderDTO,
} from '@/models/requests/OrderRequests';
import { Orders } from '@/models/response/OrderResponse';
import { TimeRange } from '@/types/timeRange';
import { AxiosResponse } from 'axios';

export interface OrderSearchBy {
  rentalObjectId?: number;
  equipmentId?: number;
  trainerId?: number;
  clientId?: number;
}

export class OrderService {
  static async getOrders(
    filters?: Omit<Filters, 'total'>,
    orderSearchBy?: OrderSearchBy,
    timeRange?: TimeRange,
  ): Promise<AxiosResponse<Orders>> {
    // url path
    let path = `/order?${filters?.limit ? `limit=${filters.limit}` : ''}${
      filters?.skip ? `&skip=${filters.skip}` : ''
    }${filters?.search ? `&search=${filters.search}` : ''}${
      filters?.sort ? `&sort=${filters.sort}` : ''
    }`;

    // only one of these params can be used at a time
    if (orderSearchBy?.rentalObjectId) {
      path += `&rental_object_id=${orderSearchBy.rentalObjectId}`;
    } else if (orderSearchBy?.equipmentId) {
      path += `&equipment_id=${orderSearchBy.equipmentId}`;
    } else if (orderSearchBy?.trainerId) {
      path += `&trainer_id=${orderSearchBy.trainerId}`;
    } else if (orderSearchBy?.clientId) {
      path += `&client_id=${orderSearchBy.clientId}`;
    } else if (timeRange?.startDate && timeRange.endDate) {
      path += `&start_date=${timeRange.startDate}&end_date=${timeRange.endDate}`;
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

  static async getOrdersWithTrainers(): Promise<AxiosResponse<Order[]>> {
    return $api.get('order/withTrainer');
  }

  static async exportOrders({
    limit,
    skip,
    search,
    sort,
  }: Omit<Filters, 'total'>): Promise<AxiosResponse> {
    return $api.get(
      `/order/export?limit=${limit}&skip=${skip}${
        search ? `&search=${search}` : ''
      }${sort ? `&sort=${sort}` : ''}`,
      {
        responseType: 'blob',
      },
    );
  }

  static async exportOrder(id: number): Promise<AxiosResponse> {
    return $api.get(`/order/${id}/export`, {
      responseType: 'blob',
    });
  }
}
