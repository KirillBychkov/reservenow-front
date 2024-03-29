import { Filters } from '@/models/Filters';
import { Order } from '@/models/Order';
import {
  CreateOrderDTO,
  UpdateOrderDTO,
} from '@/models/requests/OrderRequests';
import { ResponseOrError, SuccessOrError } from '@/types/store';
import { OrderSearchBy, OrderService } from '@/services/orderService';
import { makeAutoObservable } from 'mobx';
import { TimeRange } from '@/types/timeRange';

class OrdersStore {
  orders: Order[] = [];
  filters: Filters = { total: 0, limit: 8 };

  constructor() {
    makeAutoObservable(this);
  }

  setOrders(orders: Order[]) {
    this.orders = orders;
  }

  setFilters(filters: Filters) {
    this.filters = filters;
  }

  getOrders = async (
    filters?: Omit<Filters, 'total'>,
    orderSearchBy?: OrderSearchBy,
    timeRange?: TimeRange,
  ): Promise<ResponseOrError<Order[]>> => {
    try {
      const response = await OrderService.getOrders(
        filters,
        orderSearchBy,
        timeRange,
      );
      this.setOrders(response.data.data);
      this.setFilters(response.data.filters);
      return { data: response.data.data, error: '' };
    } catch (e) {
      return { data: [], error: 'An error occurred while fetching orders.' };
    }
  };

  createOrder = async (order: CreateOrderDTO): Promise<SuccessOrError> => {
    try {
      const { data: createdOrder } = await OrderService.addOrder(order);
      this.orders.push(createdOrder);
      return { successMsg: 'Order was created', errorMsg: '' };
    } catch (e) {
      return {
        successMsg: '',
        errorMsg: 'An error occurred while creating order',
      };
    }
  };

  editOrder = async (
    id: number,
    order: UpdateOrderDTO,
  ): Promise<SuccessOrError> => {
    try {
      await OrderService.editOrder(id, order);
      return { successMsg: 'Order was edited', errorMsg: '' };
    } catch (e) {
      return {
        successMsg: '',
        errorMsg: 'An error occurred while editing order',
      };
    }
  };

  getOrderById = async (id: number): Promise<ResponseOrError<Order>> => {
    const order = this.orders.find((order) => order.id === id);

    if (order) {
      return { data: order, error: '' };
    }

    try {
      const { data: order } = await OrderService.getOrderById(id);
      this.orders.push(order);
      return { data: order, error: '' };
    } catch {
      return { data: {} as Order, error: 'Error fetching order' };
    }
  };

  getOrdersWithTrainers = async (): Promise<ResponseOrError<Order[]>> => {
    try {
      const { data: order } = await OrderService.getOrdersWithTrainers();
      return { data: order, error: '' };
    } catch {
      return { data: [] as Order[], error: 'Error fetching order' };
    }
  };

  exportOrders = async (
    filters: Omit<Filters, 'total'>,
  ): Promise<ResponseOrError<string>> => {
    try {
      const response = await OrderService.exportOrders(filters);

      return { data: response.data, error: '' };
    } catch (e) {
      return { data: '', error: 'An error occurred while exporting clients.' };
    }
  };

  exportOrder = async (id: number): Promise<ResponseOrError<string>> => {
    try {
      const response = await OrderService.exportOrder(id);

      return { data: response.data, error: '' };
    } catch (e) {
      return { data: '', error: 'An error occurred while exporting client' };
    }
  };

  initiateExport = async (options: Omit<Filters, 'total'> | number) => {
    const isExportById = typeof options === 'number';
    try {
      const response = isExportById
        ? await this.exportOrder(options)
        : await this.exportOrders(options);

      const blobUrl = URL.createObjectURL(new Blob([response.data]));

      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = `order${isExportById ? options : 's'}.xlsx`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
}

const ordersStore = new OrdersStore();
export default ordersStore;
