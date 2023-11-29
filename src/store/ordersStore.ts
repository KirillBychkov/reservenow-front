import { Filters } from '@/models/Filters';
import { Order } from '@/models/Order';
import { OrderService } from '@/services/orderService';
import { ResponseOrError } from '@/types/store';
import { makeAutoObservable } from 'mobx';

class OrdersStore {
  orders: Order[] = [];
  filters: Filters = { total: 0, limit: 4 };

  constructor() {
    makeAutoObservable(this);
  }

  setOrders(orders: Order[]) {
    this.orders = orders;
  }

  setFilters(filters: Filters) {
    this.filters = filters;
  }

  getOrders = async (): Promise<ResponseOrError<Order[]>> => {
    try {
      const response = await OrderService.getOrders();
      this.setOrders(response.data);
      return { data: response.data, error: '' };
    } catch (e) {
      return { data: [], error: 'An error occurred while fetching orders.' };
    }
  };
}

const ordersStore = new OrdersStore();
export default ordersStore;
