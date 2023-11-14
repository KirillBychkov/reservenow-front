import $api from '@/http';
import { IFilters } from '@/models/IFilters';
import { IObject } from '@/models/IObject';
import { AxiosResponse } from 'axios';

export default class ObjectService {
  static async getObjects(filters: Omit<IFilters, 'total'>) {
    return $api.get(
      `/rental_object?limit=${filters.limit}&skip=${filters.skip}${
        filters.search ? `&search=${filters.search}` : ''
      }`
    );
  }

  static async addObject(object: IObject): Promise<AxiosResponse> {
    return $api.post('/rental_object', object);
  }

  static async getObjectById(id: number): Promise<AxiosResponse> {
    return $api.get(`/rental_object/${id}`);
  }
}
