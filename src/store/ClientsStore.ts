import { PlainClientInfo } from '@/components/forms/addClientForm';
import { IUser } from '@/models/IUser';
import { IFilters } from '@/models/response/GetUsersResponse';
import UserService from '@/services/userService';
import { UserStatus } from '@/types/user';
import { makeAutoObservable } from 'mobx';

class ClientsStore {
  // consider using Map instead of array
  clients = [] as IUser[];
  filters = {} as IFilters;

  constructor() {
    makeAutoObservable(this);
  }

  setClients(clients: IUser[]) {
    this.clients = clients;
  }

  setFilters(filters: IFilters) {
    this.filters = filters;
  }

  getUserById(id: number) {
    return this.clients.find((client) => client.id === id);
  }

  getPlainClientInfo(id: number): PlainClientInfo {
    const client = this.getUserById(id);
    return {
      id: client?.id,
      email: client?.account.email || '',
      status: client?.account.status || UserStatus.PENDING,
      firstName: client?.first_name || '',
      lastName: client?.last_name || '',
      phone: client?.phone || '',
      companyName: client?.domain_url || '',
      description: client?.description || '',
    };
  }

  async getClients(): Promise<IUser[]> {
    try {
      const response = await UserService.getUsers();
      console.log(response);

      this.setClients(response.data.data);
      this.setFilters(response.data.filters);
      return response.data.data;
    } catch (e) {
      console.log(e);
      return [] as IUser[];
    }
  }
}

const clientsStore = new ClientsStore();
export default clientsStore;
