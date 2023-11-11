import $api from '@/http';
import { IRole } from '@/models/IRole';
import { AxiosResponse } from 'axios';

export default class RoleService {
  static async getRoles(): Promise<AxiosResponse<IRole[]>> {
    return $api.get('/role');
  }

  static async createRole(role: IRole): Promise<AxiosResponse> {
    return $api.post('/role', role);
  }

  static async getRoleByID(id: string): Promise<AxiosResponse<IRole>> {
    return $api.get(`/role/${id}`);
  }

  static async updateRole(role: Partial<IRole>): Promise<AxiosResponse<IRole>> {
    return $api.patch(`/role/${role.id}`, role);
  }

  static async deleteRole(id: string): Promise<AxiosResponse> {
    return $api.delete(`/role/${id}`);
  }
}
