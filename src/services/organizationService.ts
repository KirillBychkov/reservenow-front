import $api, { BASE_API_URL } from '@/http';
import { IOrganization } from '@/models/IOrganization';
import { ICreateOrganizationDTO } from '@/models/requests/OrganizationRequests';
import { AxiosResponse } from 'axios';

export default class OrganizationService {
  static async getOrganizations(): Promise<IOrganization[]> {
    const response = await $api.get(`${BASE_API_URL}/organization`);
    return response.data;
  }

  static async addOrganization(
    organization: ICreateOrganizationDTO
  ): Promise<AxiosResponse> {
    const response = await $api.post(
      `${BASE_API_URL}/organization`,
      organization
    );
    return response.data;
  }

  static async getOrganizationById(id: number): Promise<any> {
    const response = await $api.get(`${BASE_API_URL}/organization/${id}`);
    return response.data;
  }

  static async uploadImage(id: number, file: any): Promise<any> {
    const formData = new FormData();
    formData.append('image', file);
    const reponse = await $api.post(
      `${BASE_API_URL}/organization/upload/image/${id}`,
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
    organization: ICreateOrganizationDTO
  ): Promise<any> {
    const response = await $api.patch(
      `${BASE_API_URL}/organization/${id}`,
      organization
    );
    return response.data;
  }
}
