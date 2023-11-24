import $api from '@/http';
import { Filters } from '@/models/Filters';
import { User } from '@/models/User';
import { CreateUserDTO, UpdateUserDTO } from '@/models/requests/UserRequests';
import { Users } from '@/models/response/GetUsersResponse';
import { AxiosResponse } from 'axios';

export default class UserService {
  static async getUsers(
    filters: Omit<Filters, 'total'>
  ): Promise<AxiosResponse<Users>> {
    return $api.get(
      `/users?limit=${filters.limit}&skip=${filters.skip}${
        filters.search ? `&search=${filters.search}` : ''
      }${filters.sort ? `&sort=${filters.sort}` : ''}`
    );
  }

  static async createUser(user: CreateUserDTO): Promise<AxiosResponse> {
    return $api.post('/users', user);
  }

  static async exportUsers(
    limit = 10,
    skip = 0,
    search?: string
  ): Promise<AxiosResponse> {
    return $api.get(
      `/users/export?limit=${limit}&skip=${skip}&search=${search}`
    );
  }

  static async getUserById(id: number): Promise<AxiosResponse<User>> {
    return $api.get(`/users/${id}`);
  }

  static async updateUser(
    id: number,
    user: UpdateUserDTO
  ): Promise<AxiosResponse> {
    return $api.patch(`/users/${id}`, user);
  }

  static async deleteUser(id: number): Promise<AxiosResponse> {
    return $api.delete(`/users/${id}`);
  }
}
