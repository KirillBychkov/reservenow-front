import $api, { BASE_API_URL } from '@/http';
import { IRole } from '@/models/IRole';
import { AxiosResponse } from 'axios';

export default class RoleService {
  static async getRoles(): Promise<AxiosResponse<IRole[]>> {
    return $api.get(`${BASE_API_URL}/role`);
  }

  static async createRole(role: IRole): Promise<AxiosResponse> {
    return $api.post(`${BASE_API_URL}/role`, role);
  }

  static async getRoleByID(id: string): Promise<AxiosResponse<IRole>> {
    return $api.get(`${BASE_API_URL}/role/${id}`);
  }

  static async updateRole(role: Partial<IRole>): Promise<AxiosResponse<IRole>> {
    return $api.patch(`${BASE_API_URL}/role/${role.id}`, role);
  }

  static async deleteRole(id: string): Promise<AxiosResponse> {
    return $api.delete(`${BASE_API_URL}/role/${id}`);
  }
}
