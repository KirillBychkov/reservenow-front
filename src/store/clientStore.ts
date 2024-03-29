import { Client } from '@/models/Client';
import { Filters } from '@/models/Filters';
import { Order } from '@/models/Order';
import {
  CreateClientDTO,
  UpdateClientDTO,
} from '@/models/requests/ClientRequests';
import ClientService from '@/services/clientService';
import { ResponseOrError, SuccessOrError } from '@/types/store';
import { makeAutoObservable } from 'mobx';

class ClientStore {
  clients: Client[] = [];
  filters: Filters = { total: 0, limit: 8 };
  clientOrders: Order[] = [];
  ordersFilters: Filters = { total: 0, limit: 10 };

  constructor() {
    makeAutoObservable(this);
  }

  getFilters() {
    return this.filters;
  }

  setFilters(filters: Filters) {
    this.filters = filters;
  }

  setClients(clients: Client[]) {
    this.clients = clients;
  }

  setClientOrders = (orders: Order[]) => {
    this.clientOrders = orders;
  };

  setOrdersFilters = (filters: Filters) => {
    this.ordersFilters = filters;
  };

  getOrdersFilters = () => {
    return this.ordersFilters;
  };

  addClient = async (client: CreateClientDTO): Promise<SuccessOrError> => {
    try {
      const { data: createdClient } = await ClientService.createClient(client);

      this.clients.push(createdClient);
      return { successMsg: 'Client was created', errorMsg: '' };
    } catch {
      return { successMsg: '', errorMsg: 'Error creating client' };
    }
  };

  getClients = async (
    filters: Omit<Filters, 'total'>,
  ): Promise<ResponseOrError<Client[]>> => {
    try {
      const { data } = await ClientService.getClients(filters);
      this.setClients(data.data);
      this.setFilters(data.filters);
      return { data: data.data, error: '' };
    } catch {
      return { data: [], error: 'An error occurred while fetching clients' };
    }
  };

  getClientById = async (id: number): Promise<ResponseOrError<Client>> => {
    const client = this.clients.find((client) => client.id === id);

    if (client) {
      return { data: client, error: '' };
    }

    try {
      const { data: fetchedClient } = await ClientService.getClientById(id);

      this.clients.push(fetchedClient);
      return { data: fetchedClient, error: '' };
    } catch {
      return { data: {} as Client, error: 'Client not found' };
    }
  };

  updateClient = async (
    id: number,
    client: UpdateClientDTO,
  ): Promise<SuccessOrError> => {
    try {
      const { data: updatedClient } = await ClientService.updateClient(
        id,
        client,
      );

      this.clients = this.clients.map((client) => {
        if (client.id === id) {
          return updatedClient;
        }

        return client;
      });

      return { successMsg: 'Updated client', errorMsg: '' };
    } catch {
      return { successMsg: '', errorMsg: 'Error updating client' };
    }
  };

  deleteClient = async (id: number): Promise<SuccessOrError> => {
    try {
      await ClientService.deleteClient(id);
      this.clients = this.clients.filter((client) => client.id !== id);

      return { successMsg: 'Deleted client successfully', errorMsg: '' };
    } catch {
      return { successMsg: '', errorMsg: 'Error deleting client' };
    }
  };

  getClientOrders = async (
    id: number,
    filters: Omit<Filters, 'total'>,
  ): Promise<ResponseOrError<Order[]>> => {
    try {
      const { data } = await ClientService.getClientOrders(id, filters);

      this.setClientOrders(data.data);
      this.setOrdersFilters(data.filters);
      return { data: data.data, error: '' };
    } catch {
      return {
        data: [],
        error: 'An error occurred while fetching client orders',
      };
    }
  };

  getClientByPhone = async (
    phone: string,
  ): Promise<ResponseOrError<Client>> => {
    const client = this.clients.find((client) => client.phone === phone);

    if (client) {
      return { data: client, error: '' };
    }

    try {
      const { data } = await ClientService.getClientByPhone(
        encodeURIComponent(phone),
      );
      this.clients.push(data);
      return { data: data, error: '' };
    } catch {
      return {
        data: {} as Client,
        error: 'An error occurred while fetching client orders',
      };
    }
  };

  exportClients = async (
    filters: Omit<Filters, 'total'>,
  ): Promise<ResponseOrError<string>> => {
    try {
      const response = await ClientService.exportClient(filters);

      return { data: response.data, error: '' };
    } catch (e) {
      return { data: '', error: 'An error occurred while exporting clients.' };
    }
  };

  initiateExport = async (filters: Omit<Filters, 'total'>) => {
    try {
      const response = await this.exportClients(filters);

      const blobUrl = URL.createObjectURL(new Blob([response.data]));

      const downloadLink = document.createElement('a');
      downloadLink.href = blobUrl;
      downloadLink.download = 'clients.xlsx';
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);

      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
}

const clientStore = new ClientStore();
export default clientStore;
