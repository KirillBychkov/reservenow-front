import $api, { BASE_API_URL } from '@/http';
import { ISupport } from '@/models/ISupport';
import { IUpdateSupportDTO } from '@/models/requests/SupportRequests';
import { AxiosResponse } from 'axios';

export default class SupportService {
  static async createSupportRecord(client_description: string) {
    return $api.post(`${BASE_API_URL}/support`, { client_description });
  }

  static async getAllSupportRecords(): Promise<AxiosResponse<ISupport[]>> {
    return $api.get(`${BASE_API_URL}/support`);
  }

  static async getSupportRecordById(
    id: number
  ): Promise<AxiosResponse<ISupport>> {
    return $api.get(`${BASE_API_URL}/support/${id}`);
  }

  static async updateSupportRecordById(
    id: number,
    updateDTO: IUpdateSupportDTO
  ) {
    return $api.patch(`${BASE_API_URL}/support/${id}`, updateDTO);
  }

  static async deleteSupportRecordById(id: number) {
    return $api.delete(`${BASE_API_URL}/support/${id}`);
  }
}