import axios, { AxiosResponse } from 'axios';
import { BASE_API_URL } from '@/http';
import { AuthDTO } from '@/models/IAuth';

const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  if (!refreshToken) {
    return {} as AuthDTO;
  }

  const headers = {
    Authorization: `Bearer ${refreshToken}`,
  };

  try {
    const response: AxiosResponse<AuthDTO> = await axios.post(
      `${BASE_API_URL}/auth/refresh`,
      {},
      { headers }
    );

    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('refreshToken', response.data.refresh_token);
    return response.data;
  } catch (error) {
    console.error('Refresh token error:', error);
    return {} as AuthDTO;
  }
};

export default refreshToken;
