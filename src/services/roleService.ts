import $api from '@/http';
import { Role } from '@/models/Role';
import { AxiosResponse } from 'axios';

export default class RoleService {
  static async getRoles(): Promise<AxiosResponse<Role[]>> {
    return $api.get('/role');
  }

  static async createRole(role: Role): Promise<AxiosResponse> {
    return $api.post('/role', role);
  }

  static async getRoleByID(id: string): Promise<AxiosResponse<Role>> {
    return $api.get(`/role/${id}`);
  }

  static async updateRole(role: Partial<Role>): Promise<AxiosResponse<Role>> {
    return $api.patch(`/role/${role.id}`, role);
  }

  static async deleteRole(id: string): Promise<AxiosResponse> {
    return $api.delete(`/role/${id}`);
  }
}
