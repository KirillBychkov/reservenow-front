import $api, { BASE_API_URL } from '@/http';
import { IObject } from '@/models/IObject';
import { IFilters } from '@/types/pagination';

import { AxiosResponse } from 'axios';

export default class ObjectService {
  static async getObjects(filters: Omit<IFilters, 'total'>) {
    const response = await $api.get(
      `${BASE_API_URL}/rental_object?limit=${filters.limit}&skip=${
        filters.skip
      }${filters.search ? `&search=${filters.search}` : ''}`
    );
    return response;
  }

  static async addObject(object: IObject): Promise<AxiosResponse> {
    const response = await $api.post(`${BASE_API_URL}/rental_object`, object);
    return response.data;
  }

  static async getObjectById(id: number): Promise<any> {
    const response = await $api.get(`${BASE_API_URL}/rental_object/${id}`);
    return response.data;
  }
}
