import $api from '@/http';
import { Organization } from '@/models/Organization';
import { CreateOrganizationDTO } from '@/models/requests/OrganizationRequests';
import { AxiosResponse } from 'axios';

export default class OrganizationService {
  static async getOrganizations(): Promise<Organization[]> {
    const response = await $api.get('/organization');
    return response.data;
  }

  static async addOrganization(
    organization: CreateOrganizationDTO
  ): Promise<AxiosResponse<Organization>> {
    const response = await $api.post('/organization', organization);
    return response.data;
  }

  static async getOrganizationById(
    id: number
  ): Promise<AxiosResponse<Organization>> {
    return $api.get(`/organization/${id}`);
  }

  static async uploadImage(id: number, file: any): Promise<AxiosResponse> {
    const formData = new FormData();
    formData.append('image', file);
    const reponse = await $api.post(
      `/organization/upload/image/${id}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return reponse.data;
  }

  static async editOrganization(
    id: number,
    organization: CreateOrganizationDTO
  ): Promise<AxiosResponse<Organization>> {
    return $api.patch(`/organization/${id}`, organization);
  }
}
