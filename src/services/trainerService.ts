import $api, { BASE_API_URL } from '@/http';
import { ITrainer } from '@/models/ITrainer';
import {
  CreateTrainerDTO,
  UpdateTrainerDTO,
} from '@/models/requests/TrainerRequests';
import { AxiosResponse } from 'axios';

export default class TrainerService {
  static async getTrainers(): Promise<AxiosResponse<ITrainer[]>> {
    return $api.get(`${BASE_API_URL}/trainer`);
  }

  static async getTrainer(id: number): Promise<AxiosResponse<ITrainer>> {
    return $api.get(`${BASE_API_URL}/trainer/${id}`);
  }

  static async createTrainer(
    trainer: CreateTrainerDTO
  ): Promise<AxiosResponse<ITrainer>> {
    return $api.post(`${BASE_API_URL}/trainer`, trainer);
  }

  static async updateTrainer(
    id: number,
    trainer: UpdateTrainerDTO
  ): Promise<AxiosResponse<ITrainer>> {
    return $api.patch(`${BASE_API_URL}/trainer/${id}`, trainer);
  }

  static async deleteTrainer(id: number): Promise<AxiosResponse> {
    return $api.delete(`${BASE_API_URL}/trainer/${id}`);
  }

  static async addTrainerImage(file: string): Promise<AxiosResponse> {
    return $api.post(`${BASE_API_URL}/trainer/upload/image`, file);
  }
}
