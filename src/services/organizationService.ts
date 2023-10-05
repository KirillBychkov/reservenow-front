import $api, { BASE_API_URL } from '@/http';
import { IOrganization } from '@/models/response/OrganizationsResponse';
import { AxiosResponse } from 'axios';

export default class OrganizationService {
  static async getOrganizations(): Promise<IOrganization[]> {
    const response = await $api.get(`${BASE_API_URL}/organization`);
    return response.data;
  }

  static async addOrganization(
    organization: IOrganization
  ): Promise<AxiosResponse> {
    const response = await $api.post(
      `${BASE_API_URL}/organization`,
      organization
    );
    return response.data;
  }
}
