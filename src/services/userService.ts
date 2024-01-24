import $api from '@/http';
import { Filters } from '@/models/Filters';
import { User } from '@/models/User';
import { CreateUserDTO, UpdateUserDTO } from '@/models/requests/UserRequests';
import { Users } from '@/models/response/GetUsersResponse';
import { AxiosResponse } from 'axios';

export default class UserService {
  static async getUsers({
    limit,
    skip,
    search,
    sort,
  }: Omit<Filters, 'total'>): Promise<AxiosResponse<Users>> {
    return $api.get(
      `/users?limit=${limit}&skip=${skip}${search ? `&search=${search}` : ''}${
        sort ? `&sort=${sort}` : ''
      }`,
    );
  }

  static async createUser(user: CreateUserDTO): Promise<AxiosResponse> {
    return $api.post('/users', user);
  }

  static async exportUsers({
    limit,
    skip,
    search,
    sort,
  }: Omit<Filters, 'total'>): Promise<AxiosResponse> {
    return $api.get(
      `/users/export?limit=${limit}&skip=${skip}${
        search ? `&search=${search}` : ''
      }${sort ? `&sort=${sort}` : ''}`,
      {
        responseType: 'blob',
      },
    );
  }

  static async getUserById(id: number): Promise<AxiosResponse<User>> {
    return $api.get(`/users/${id}`);
  }

  static async updateUser(
    id: number,
    user: UpdateUserDTO,
  ): Promise<AxiosResponse<User>> {
    return $api.patch(`/users/${id}`, user);
  }

  static async uploadImageForUser(id: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    const response = $api.put(`/users/${id}/upload/image/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  }

  static async deleteUser(id: number): Promise<AxiosResponse> {
    return $api.delete(`/users/${id}`);
  }
}
