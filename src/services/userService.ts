import $api, { BASE_API_URL } from '@/http';
import { ICreateUserDTO, IUserDTO } from '@/models/IUser';
import { AxiosResponse } from 'axios';

export default class UserService {
  static async getUsers(): Promise<AxiosResponse> {
    return $api.get(`${BASE_API_URL}/users`);
  }

  static async createUser(user: ICreateUserDTO): Promise<AxiosResponse> {
    return $api.post(`${BASE_API_URL}/users`, user);
  }

  static async exportUsers(
    limit = 10,
    skip = 0,
    search?: string
  ): Promise<AxiosResponse> {
    return $api.get(
      `${BASE_API_URL}/users/export?limit=${limit}&skip=${skip}&search=${search}`
    );
  }

  static async updateUser(
    id: string,
    user: Partial<IUserDTO>
  ): Promise<AxiosResponse> {
    return $api.patch(`${BASE_API_URL}/users/${id}`, user);
  }

  static async deleteUser(id: string): Promise<AxiosResponse> {
    return $api.delete(`${BASE_API_URL}/users/${id}`);
  }
}
