import $api, { BASE_API_URL } from '@/http';
import { IAuthResponse } from '@/models/response/AuthResponse';
import { AxiosResponse } from 'axios';

export interface SigninUserData {
  email: string;
  password: string;
}

export default class AuthService {
  static async login(
    user: SigninUserData
  ): Promise<AxiosResponse<IAuthResponse>> {
    return $api.post(`${BASE_API_URL}/auth/login`, user);
  }

  static async getUser(): Promise<AxiosResponse> {
    return $api.get(`${BASE_API_URL}/auth/user`);
  }

  static async verify(): Promise<AxiosResponse> {
    return $api.get(`${BASE_API_URL}/auth/verify`);
  }

  static async logout(): Promise<void> {
    return $api.delete(`${BASE_API_URL}/auth/logout`);
  }
}
