import $api, { BASE_API_URL } from '@/http';
import { IFilters } from '@/models/IFilters';
import { IObject } from '@/models/IObject';
import { AxiosResponse } from 'axios';

export default class ObjectService {
  static async getObjects(
    filters: Omit<IFilters, 'total'>
  ): Promise<AxiosResponse<IObject>> {
    return $api.get(
      `${BASE_API_URL}/rental_object?limit=${filters.limit}&skip=${
        filters.skip
      }${filters.search ? `&search=${filters.search}` : ''}`
    );
  }

  static async addObject(object: IObject): Promise<AxiosResponse<IObject>> {
    return $api.post(`${BASE_API_URL}/rental_object`, object);
  }

  static async getObjectById(id: number): Promise<AxiosResponse<IObject>> {
    return $api.get(`${BASE_API_URL}/rental_object/${id}`);
  }
}
