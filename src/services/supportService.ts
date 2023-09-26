import $api, { BASE_API_URL } from '@/http';

export default class SupportService {
  static async createSupportRecord(client_description: string) {
    return $api.post(`${BASE_API_URL}/support`, { client_description });
  }
}
