import $api from "@/http";
import { IEquipment } from "@/models/IEquipment";
import { ICreateEquipmentDTO, IUpdateEquipmentDTO } from "@/models/requests/EquipmentRequests";
import { AxiosResponse } from "axios";

export default class EquipmentService {
  static getEquipment(): Promise<AxiosResponse<IEquipment[]>> {
    return $api.get('/equipment')
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