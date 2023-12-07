import $api from '@/http';
import { Organization } from '@/models/Organization';
import { CreateOrganizationDTO } from '@/models/requests/OrganizationRequests';
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
    start_date?: string,
    end_date?: string,
  ): Promise<AxiosResponse> {
    return $api.get(`/organization/${id}/statistics`);
  }
}
