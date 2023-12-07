import $api from '@/http';
import { Client } from '@/models/Client';
import { Filters } from '@/models/Filters';
import {
  CreateClientDTO,
  UpdateClientDTO,
} from '@/models/requests/ClientRequests';
import {
  ClientOrders,
  Clients,
} from '@/models/response/GetClientsResponse';
import { AxiosResponse } from 'axios';

export default class ClientService {
  static getClients(
    filters: Omit<Filters, 'total'>,
  ): Promise<AxiosResponse<Clients>> {
    return $api.get(
      `/client?limit=${filters.limit}&skip=${filters.skip}${
        filters.search ? `&search=${filters.search}` : ''
      }${filters.sort ? `&sort=${filters.sort}` : ''}`,
    );
  }

  static createClient(client: CreateClientDTO): Promise<AxiosResponse<Client>> {
    return $api.post('/client', client);
  }

  static getClientById(id: number): Promise<AxiosResponse<Client>> {
    return $api.get(`/client/${id}`);
  }

  static getClientOrders(
    id: number,
    filters: Omit<Filters, 'total'>,
  ): Promise<AxiosResponse<ClientOrders>> {
    return $api.get(
      `/order?client_id=${id}&limit=${filters.limit}&skip=${filters.skip}${
        filters.search ? `&search=${filters.search}` : ''
      }${filters.sort ? `&sort=${filters.sort}` : ''}`,
    );
  }

  static updateClient(
    id: number,
    client: UpdateClientDTO,
  ): Promise<AxiosResponse<Client>> {
    return $api.patch(`/client/${id}`, client);
  }

  static deleteClient(id: number): Promise<AxiosResponse> {
    return $api.delete(`/client/${id}`);
  }
}
