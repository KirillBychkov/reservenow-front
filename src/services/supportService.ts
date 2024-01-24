import $api from '@/http';
import { Filters } from '@/models/Filters';
import { Support } from '@/models/Support';
import { UpdateSupportDTO } from '@/models/requests/SupportRequests';
import { SupportRecords } from '@/models/response/GetSupportRecordsResponse';
import { AxiosResponse } from 'axios';

export default class SupportService {
  static async createSupportRecord(
    client_description: string,
  ): Promise<AxiosResponse<Support>> {
    return $api.post('/support', { client_description });
  }

  static async getAllSupportRecords(
    filters: Omit<Filters, 'total'>,
  ): Promise<AxiosResponse<SupportRecords>> {
    return $api.get(
      `/support?limit=${filters.limit}&skip=${filters.skip}${
        filters.search ? `&search=${filters.search}` : ''
      }${filters.sort ? `&sort=${filters.sort}` : ''}`,
    );
  }

  static async getSupportRecordById(
    id: number,
  ): Promise<AxiosResponse<Support>> {
    return $api.get(`/support/${id}`);
  }

  static async updateSupportRecordById(
    id: number,
    updateDTO: UpdateSupportDTO,
  ) {
    return $api.patch(`/support/${id}`, updateDTO);
  }

  static async deleteSupportRecordById(id: number) {
    return $api.delete(`/support/${id}`);
  }

  static async uploadImageForRecord(id: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const response = $api.put(`/support/${id}/upload/image/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }
}
