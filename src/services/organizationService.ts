import $api from '@/http';
import { Organization } from '@/models/Organization';
import { CreateOrganizationDTO } from '@/models/requests/OrganizationRequests';
import { TimeFrame } from '@/types/enums/timeFrame';
import { SuccessOrError } from '@/types/store';
import { AxiosResponse } from 'axios';

export default class OrganizationService {
  static async getOrganizations(): Promise<AxiosResponse<Organization[]>> {
    return $api.get('/organization');
  }

  static async addOrganization(
    organization: CreateOrganizationDTO,
  ): Promise<AxiosResponse<Organization>> {
    return $api.post('/organization', organization);
  }

  static async getOrganizationById(
    id: number,
  ): Promise<AxiosResponse<Organization>> {
    return $api.get(`/organization/${id}`);
  }

  static async deleteOrganization(
    id: number,
  ): Promise<AxiosResponse<SuccessOrError>> {
    return $api.delete(`/organization/${id}`);
  }

  static async uploadImage(id: number, file: File): Promise<AxiosResponse> {
    const formData = new FormData();
    formData.append('file', file);
    const reponse = $api.put(`/organization/upload/image/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return reponse;
  }

  static async editOrganization(
    id: number,
    organization: CreateOrganizationDTO,
  ): Promise<AxiosResponse<Organization>> {
    return $api.patch(`/organization/${id}`, organization);
  }

  static async getOrganizationStatistics(
    id: number,
    time_frame: TimeFrame,
    start_date?: string,
    end_date?: string,
  ): Promise<AxiosResponse> {
    let path = `/organization/${id}/statistics?time_frame=${time_frame}`;
    if (start_date && end_date) {
      path += `&start_date=${start_date}&end_date=${end_date}`;
    }
    return $api.get(path);
  }
}
