import $api from '@/http';
import { IFilters } from '@/models/IFilters';
import { IObject } from '@/models/IObject';
import {
  CreateRentalObjectDTO,
  UpdateRentalObjectDTO,
} from '@/models/requests/ObjectsRequests';
import { AxiosResponse } from 'axios';

export default class ObjectService {
  static async getObjects(filters: Omit<IFilters, 'total'>) {
    return $api.get(
      `/rental_object?limit=${filters.limit}&skip=${filters.skip}${
        filters.search ? `&search=${filters.search}` : ''
      }`
    );
  }

  static async addObject(
    object: CreateRentalObjectDTO
  ): Promise<AxiosResponse<IObject>> {
    return $api.post('/rental_object', object);
  }

  static async getObjectById(id: number): Promise<AxiosResponse> {
    return $api.get(`/rental_object/${id}`);
  }

  static async editObject(id: number, object: UpdateRentalObjectDTO) {
    return $api.patch(`/rental_object/${id}`, object);
  }

  static async deleteObject(id: number) {
    return $api.delete(`/rental_object/${id}`);
  }
}
