import axios from 'axios';

export const BASE_API_URL = 'http://51.15.35.161';

const $api = axios.create({
  withCredentials: true,
  baseURL: BASE_API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

export default $api;
