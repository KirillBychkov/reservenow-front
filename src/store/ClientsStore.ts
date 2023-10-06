import { PlainClientInfo } from '@/components/forms/addClientForm';
import { IUser } from '@/models/IUser';
import { IFilters } from '@/models/response/GetUsersResponse';
import UserService from '@/services/userService';
import { ResponseWithErrors } from '@/types/store';
import { makeAutoObservable } from 'mobx';

class ClientsStore {
  clients: IUser[] = [];
  filters: IFilters = { total: 0 };

  constructor() {
    makeAutoObservable(this);
  }

  setClients(clients: IUser[]) {
    this.clients = clients;
  }

  setFilters(filters: IFilters) {
    this.filters = filters;
  }

  getClientById = async (id: number): Promise<ResponseWithErrors<IUser>> => {
    const client = this.clients.find((client) => client.id === id);
    if (client) {
      return { data: client, error: '' };
    }
    const fetchedClient = await UserService.getUserById(id);
    this.clients.push(fetchedClient.data);
    return { data: fetchedClient.data, error: '' };
  };

  deleteClient = async (id: number): Promise<void> => {
    try {
      await UserService.deleteUser(id);
      this.clients = this.clients.filter((client) => client.id !== id);
    } catch (e) {
      console.log(e);
    }
  };

  getPlainClientInfo = async (id: number): Promise<PlainClientInfo> => {
    const { data: client } = await this.getClientById(id);
    return {
      id: client.id,
      email: client?.account?.email || '',
      status: client?.account?.status,
      firstName: client.first_name,
      lastName: client.last_name,
      phone: client.phone,
      companyName: client.domain_url,
      description: client.description || '',
    };
  };

  getClients = async (): Promise<ResponseWithErrors<IUser[]>> => {
    try {
      const response = await UserService.getUsers();
      this.setClients(response.data.data);
      this.setFilters(response.data.filters);
      return { data: response.data.data, error: '' };
    } catch (e) {
      console.log(e);
      return { data: [], error: 'An error occurred while fetching clients.' };
    }
  };
}

const clientsStore = new ClientsStore();
export default clientsStore;
