import $api from '@/http';
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
    return $api.post('/manager', manager);
  }

  static async getManagers(): Promise<AxiosResponse<IManager[]>> {
    return $api.get('/manager');
  }

  static async getManager(id: number): Promise<AxiosResponse<IManager>> {
    return $api.get(`/manager/${id}`);
  }

  static async updateManager(
    id: number,
    manager: UpdateManagerDTO
  ): Promise<AxiosResponse<IManager>> {
    return $api.patch(`/manager/${id}`, manager);
  }

  static async deleteManager(id: number): Promise<AxiosResponse> {
    return $api.delete(`/manager/${id}`);
  }

  static async addManagerImage(file: string): Promise<AxiosResponse> {
    return $api.post(`/manager/upload/image`, file);
  }
}
