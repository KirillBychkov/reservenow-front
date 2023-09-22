import { IAccount } from '@/models/IUser';
import { IFilters } from '@/models/response/GetUsersResponse';
import UserService from '@/services/userService';
import { makeAutoObservable } from 'mobx';

class ClientsStore {
  // consider using Map instead of array
  clients = [] as IAccount[];
  filters = {} as IFilters;

  constructor() {
    makeAutoObservable(this);
  }

  setClients(clients: IAccount[]) {
    this.clients = clients;
  }

  setFilters(filters: IFilters) {
    this.filters = filters;
  }

  getUserById(id: number) {
    return this.clients.find((client) => client.id === id);
  }

  async getClients(): Promise<IAccount[]> {
    try {
      const response = await UserService.getUsers();
      this.setClients(response.data.data);
      this.setFilters(response.data.filters);
      return response.data.data;
    } catch (e) {
      console.log(e);
      return [] as IAccount[];
    }
  }
}

const clientsStore = new ClientsStore();
export default clientsStore;
