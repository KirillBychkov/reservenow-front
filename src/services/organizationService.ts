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
}
