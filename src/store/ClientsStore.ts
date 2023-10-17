import { IUser } from '@/models/IUser';
import { ICreateUserDTO, IUpdateUserDTO } from '@/models/requests/UserRequests';
import { IFilters } from '@/models/response/GetUsersResponse';
import UserService from '@/services/userService';
import { ResponseOrError, SuccessOrError } from '@/types/store';
import { PlainClientInfo } from '@/types/user';
import { makeAutoObservable } from 'mobx';

export interface Pagination {
  rowsPerPage: number;
}

class ClientsStore {
  clients: IUser[] = [];
  filters: IFilters = { total: 0, limit: 8 };
  pagination: Pagination = {
    rowsPerPage: 8,
  };

  constructor() {
    makeAutoObservable(this);
  }

  getFilters() {
    return this.filters;
  }

  setClients(clients: IUser[]) {
    this.clients = clients;
  }

  setFilters(filters: IFilters) {
    this.filters = filters;
  }

  addClient = async (data: ICreateUserDTO): Promise<SuccessOrError> => {
    try {
      await UserService.createUser(data);
      return { successMsg: 'Created client', errorMsg: '' };
    } catch (e) {
      console.log(e);
      return { successMsg: '', errorMsg: 'Error creating client' };
    }
  };

  updateClient = async (
    id: number,
    data: IUpdateUserDTO
  ): Promise<SuccessOrError> => {
    try {
      await UserService.updateUser(id, data);
      return { successMsg: 'Updated client', errorMsg: '' };
    } catch (e) {
      console.log(e);
      return { successMsg: '', errorMsg: 'Error updating client' };
    }
  };

  getClientById = async (id: number): Promise<ResponseOrError<IUser>> => {
    const client = this.clients.find((client) => client.id === id);
    if (client) {
      return { data: client, error: '' };
    }
    try {
      const fetchedClient = await UserService.getUserById(id);
      this.clients.push(fetchedClient.data);
      return { data: fetchedClient.data, error: '' };
    } catch (error) {
      return { data: {} as IUser, error: 'Client not found' };
    }
  };

  deleteClient = async (id: number): Promise<void> => {
    try {
      await UserService.deleteUser(id);
      this.clients = this.clients.filter((client) => client.id !== id);
    } catch (e) {
      console.log(e);
    }
  };

  getPlainClientInfo = async (
    id: number
  ): Promise<ResponseOrError<PlainClientInfo>> => {
    const { data: client, error } = await this.getClientById(id);
    if (error) {
      return { data: {} as PlainClientInfo, error: error };
    }
    const plainClientInfo: PlainClientInfo = {
      id: client.id,
      email: client?.account?.email || '',
      status: client?.account?.status,
      firstName: client.first_name,
      lastName: client.last_name,
      phone: client.phone,
      companyName: client.domain_url,
      description: client.description || '',
    };
    return { data: plainClientInfo, error: '' };
  };

  getClients = async (
    filters: Omit<IFilters, 'total'>
  ): Promise<ResponseOrError<IUser[]>> => {
    try {
      const response = await UserService.getUsers(filters);
      if (response.data.data.length === 0) {
        return { data: [], error: 'No clients found' };
      }
      this.setFilters(response.data.filters);
      this.setClients(response.data.data);
      return { data: response.data.data, error: '' };
    } catch (e) {
      console.log(e);
      return { data: [], error: 'An error occurred while fetching clients.' };
    }
  };
}

const clientsStore = new ClientsStore();
export default clientsStore;
