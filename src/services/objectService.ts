import $api from '@/http';
import { IFilters } from '@/models/IFilters';
import { IObject } from '@/models/IObject';
import { AxiosResponse } from 'axios';

export default class ObjectService {
  static async getObjects(filters: Omit<IFilters, 'total'>) {
    const response = await $api.get(
      `/rental_object?limit=${filters.limit}&skip=${
        filters.skip
      }${filters.search ? `&search=${filters.search}` : ''}`
    );
    return response;
  }

  static async addObject(object: IObject): Promise<AxiosResponse> {
    const response = await $api.post('/rental_object', object);
    return response.data;
  }

  static async getObjectById(id: number): Promise<AxiosResponse> {
    const response = await $api.get(`/rental_object/${id}`);
    return response.data;
  }
}
