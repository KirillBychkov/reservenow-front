import $api from '@/http';
import { IFilters } from '@/models/IFilters';
import { IUser } from '@/models/IUser';
import { ICreateUserDTO, IUpdateUserDTO } from '@/models/requests/UserRequests';
import { IUsers } from '@/models/response/GetUsersResponse';
import { AxiosResponse } from 'axios';

export default class UserService {
  static async getUsers(
    filters: Omit<IFilters, 'total'>
  ): Promise<AxiosResponse<IUsers>> {
    return $api.get(
      `/users?limit=${filters.limit}&skip=${filters.skip}${
        filters.search ? `&search=${filters.search}` : ''
      }${filters.sort ? `&sort=${filters.sort}` : ''}`
    );
  }

  static async createUser(user: ICreateUserDTO): Promise<AxiosResponse> {
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

  static async getUserById(id: number): Promise<AxiosResponse<IUser>> {
    return $api.get(`/users/${id}`);
  }

  static async updateUser(
    id: number,
    user: IUpdateUserDTO
  ): Promise<AxiosResponse> {
    return $api.patch(`/users/${id}`, user);
  }

  static async deleteUser(id: number): Promise<AxiosResponse> {
    return $api.delete(`/users/${id}`);
  }
}
