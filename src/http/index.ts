import refreshToken from '@/services/refreshToken';
import axios from 'axios';

export const BASE_API_URL = 'http://51.15.35.161';

const $api = axios.create({
  withCredentials: false,
  baseURL: BASE_API_URL,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

$api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const { access_token } = await refreshToken();

      $api.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      return $api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default $api;
