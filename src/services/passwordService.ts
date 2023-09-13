import $api, { BASE_API_URL } from '@/http';
import { AxiosResponse } from 'axios';

export default class PasswordService {
  static async passwordConfirm(newPassword: string): Promise<AxiosResponse> {
    return $api.patch(`${BASE_API_URL}/password/confirm`, {
      newPassword,
    });
  }

  static async passwordChange(
    oldPassword: string,
    newPassword: string
  ): Promise<AxiosResponse> {
    return $api.put(`${BASE_API_URL}/password/change`, {
      oldPassword,
      newPassword,
    });
  }

  static async resetPassword(email: string): Promise<AxiosResponse> {
    return $api.post(`${BASE_API_URL}/password/reset`, {
      email,
    });
  }
}
