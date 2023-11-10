import $api from '@/http';
import { AxiosResponse } from 'axios';

export default class PasswordService {
  static async passwordConfirm(new_password: string): Promise<AxiosResponse> {
    // Get resetToken
    const resetToken = sessionStorage.getItem('reset_token');

    if (!resetToken) {
      throw new Error('resetToken not found in sessionStorage');
    }

    // Headers with resetToken
    const headers = {
      Authorization: `Bearer ${resetToken}`,
    };

    return $api.patch(
      '/password/confirm',
      {
        new_password,
      },
      { headers }
    );
  }

  static async passwordChange(
    oldPassword: string,
    newPassword: string
  ): Promise<AxiosResponse> {
    return $api.put('/password/change', {
      oldPassword,
      newPassword,
    });
  }

  static async resetPassword(email: string): Promise<AxiosResponse> {
    return $api.post('/password/reset', {
      email,
    });
  }
}
