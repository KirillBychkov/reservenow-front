import $api from '@/http';
import { Filters } from '@/models/Filters';
import { RentalObject } from '@/models/RentalObject';
import {
  CreateRentalObjectDTO,
  UpdateRentalObjectDTO,
} from '@/models/requests/ObjectsRequests';
import { AxiosResponse } from 'axios';

export default class ObjectService {
  static async getObjects(
    filters: Omit<Filters, 'total'>,
    organizationId?: number,
  ) {
    return $api.get(
      `/rental_object?limit=${filters.limit}&skip=${filters.skip}${
        filters.search ? `&search=${filters.search}` : ''
      }${organizationId ? `&organizationId=${organizationId}` : ''}`,
    );
  }

  static async addObject(
    object: CreateRentalObjectDTO,
  ): Promise<AxiosResponse<RentalObject>> {
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

  static async uploadImage(id: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const response = $api.put(`/rental_object/upload/image/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }
}
