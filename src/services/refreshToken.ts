import axios from 'axios';
import { BASE_API_URL } from '@/http';

const refreshToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  // Check if refreshToken is available
  if (!refreshToken) {
    throw new Error('Refresh token is missing.');
  }

  const headers = {
    Authorization: `Bearer ${refreshToken}`,
  };

  try {
    const response = await axios.post(
      `${BASE_API_URL}/auth/refresh`,
      {},
      { headers }
    );

    localStorage.setItem('token', response.data.access_token);
    localStorage.setItem('refreshToken', response.data.refresh_token);
  } catch (error) {
    console.error('Refresh token error:', error);
  }
};

export default refreshToken;
