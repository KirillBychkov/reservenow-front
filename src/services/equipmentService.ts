import $api from "@/http";
import { IEquipment } from "@/models/IEquipment";
import { IFilters } from "@/models/IFilters";
import { ICreateEquipmentDTO, IUpdateEquipmentDTO } from "@/models/requests/EquipmentRequests";
import { IEquipments } from "@/models/response/GetEquipmentResponse";
import { AxiosResponse } from "axios";

export default class EquipmentService {
  static getEquipment(filters: Omit<IFilters, 'total'>): Promise<AxiosResponse<IEquipments>> {
    return $api.get(
      `/equipment?limit=${filters.limit}&skip=${filters.skip}${
        filters.search ? `&search=${filters.search}` : ''
      }${filters.sort ? `&sort=${filters.sort}` : ''}`
    );
  }

  static createEquipment(equipment: ICreateEquipmentDTO): Promise<AxiosResponse<IEquipment>> {
    return $api.post('/equipment', equipment)
  }

  static getEquipmentById(id: number): Promise<AxiosResponse<IEquipment>> {
    return $api.get(`/equipment/${id}`)
  }

  static updateEquipment(id: number, equipment: IUpdateEquipmentDTO): Promise<AxiosResponse<IEquipment>>{
    return $api.patch(`/equipment/${id}`, equipment)
  }

  static deleteEquipment(id: number): Promise<AxiosResponse>{
    return $api.delete(`/equipment/${id}`)
  }
}