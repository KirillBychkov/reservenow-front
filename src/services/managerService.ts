import $api, { BASE_API_URL } from '@/http';
import { IManager } from '@/models/IManager';
import {
  CreateManagerDTO,
  UpdateManagerDTO,
} from '@/models/requests/ManagerRequests';

import { AxiosResponse } from 'axios';

export default class ManagerService {
  static async createManager(
    manager: CreateManagerDTO
  ): Promise<AxiosResponse<IManager>> {
    return $api.post(`${BASE_API_URL}/manager`, manager);
  }

  static async getManagers(): Promise<AxiosResponse<IManager[]>> {
    return $api.get(`${BASE_API_URL}/manager`);
  }

  static async getManager(id: number): Promise<AxiosResponse<IManager>> {
    return $api.get(`${BASE_API_URL}/manager/${id}`);
  }

  static async updateManager(
    id: number,
    manager: UpdateManagerDTO
  ): Promise<AxiosResponse<IManager>> {
    return $api.patch(`${BASE_API_URL}/manager/${id}`, manager);
  }

  static async deleteManager(id: number): Promise<AxiosResponse> {
    return $api.delete(`${BASE_API_URL}/manager/${id}`);
  }

  static async addManagerImage(file: string): Promise<AxiosResponse> {
    return $api.post(`${BASE_API_URL}/manager/upload/image`, file);
  }
}
