import $api from '@/http';
import { IFilters } from '@/models/IFilters';
import { ISupport } from '@/models/ISupport';
import { IUpdateSupportDTO } from '@/models/requests/SupportRequests';
import { ISupportRecords } from '@/models/response/GetSupportRecordsResponse';
import { AxiosResponse } from 'axios';

export default class SupportService {
  static async createSupportRecord(client_description: string) {
    return $api.post('/support', { client_description });
  }

  static async getAllSupportRecords(
    filters: Omit<IFilters, 'total'>
  ): Promise<AxiosResponse<ISupportRecords>> {
    return $api.get(
      `/support?limit=${filters.limit}&skip=${filters.skip}${
        filters.search ? `&search=${filters.search}` : ''
      }${filters.sort ? `&sort=${filters.sort}` : ''}`
    );
  }

  static async getSupportRecordById(
    id: number
  ): Promise<AxiosResponse<ISupport>> {
    return $api.get(`/support/${id}`);
  }

  static async updateSupportRecordById(
    id: number,
    updateDTO: IUpdateSupportDTO
  ) {
    return $api.patch(`/support/${id}`, updateDTO);
  }

  static async deleteSupportRecordById(id: number) {
    return $api.delete(`/support/${id}`);
  }
}
