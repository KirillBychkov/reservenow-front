import $api from '@/http';
import { Equipment } from '@/models/Equipment';
import { Filters } from '@/models/Filters';
import {
  CreateEquipmentDTO,
  UpdateEquipmentDTO,
} from '@/models/requests/EquipmentRequests';
import { Equipments } from '@/models/response/GetEquipmentResponse';
import { AxiosResponse } from 'axios';

export default class EquipmentService {
  static getEquipment(
    filters?: Omit<Filters, 'total'>,
  ): Promise<AxiosResponse<Equipments>> {
    return $api.get(
      `/equipment?${filters?.limit ? `limit=${filters.limit}` : ''}${
        filters?.skip ? `&skip=${filters.skip}` : ''
      }${filters?.search ? `&search=${filters.search}` : ''}${
        filters?.sort ? `&sort=${filters.sort}` : ''
      }`,
    );
  }

  static createEquipment(
    equipment: CreateEquipmentDTO,
  ): Promise<AxiosResponse<Equipment>> {
    return $api.post('/equipment', equipment);
  }

  static getEquipmentById(id: number): Promise<AxiosResponse<Equipment>> {
    return $api.get(`/equipment/${id}`);
  }

  static updateEquipment(
    id: number,
    equipment: UpdateEquipmentDTO,
  ): Promise<AxiosResponse<Equipment>> {
    return $api.patch(`/equipment/${id}`, equipment);
  }

  static deleteEquipment(id: number): Promise<AxiosResponse> {
    return $api.delete(`/equipment/${id}`);
  }
}
