import $api from '@/http';
import { AuthResponse } from '@/models/response/AuthResponse';
import { AxiosResponse } from 'axios';

export interface SigninUserData {
  email: string;
  password: string;
}

export default class AuthService {
  static async login(
    user: SigninUserData,
  ): Promise<AxiosResponse<AuthResponse>> {
    return $api.post('/auth/login', user);
  }

  static async getUser(): Promise<AxiosResponse> {
    return $api.get('/auth/user');
  }

  static async verify(
    new_password: string,
    verify_token: string,
  ): Promise<AxiosResponse> {
    const headers = {
      Authorization: `Bearer ${verify_token}`,
    };

    return $api.post(
      '/auth/verify',
      {
        new_password,
      },
      { headers },
    );
  }

  static async logout(): Promise<void> {
    return $api.delete('/auth/logout');
  }
}
