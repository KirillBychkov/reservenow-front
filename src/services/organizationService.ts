import $api from '@/http';
import { Organization } from '@/models/Organization';
import { CreateOrganizationDTO } from '@/models/requests/OrganizationRequests';
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
    const reponse = $api.put(`/organization/${id}/upload/image/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return reponse;
  }

  static async deleteImage(id: number): Promise<AxiosResponse> {
    return $api.put(`/organization/${id}/delete/image/`);
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
    let path = `/organization/${id}/statistics?`;

    if (start_date && end_date) {
      path += `start_date=${start_date}&end_date=${end_date}`;
    }
    return $api.get(path);
  }
}
