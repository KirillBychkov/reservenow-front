import $api from '@/http';
import { ITrainer } from '@/models/ITrainer';
import {
  CreateTrainerDTO,
  UpdateTrainerDTO,
} from '@/models/requests/TrainerRequests';
import { AxiosResponse } from 'axios';

export default class TrainerService {
  static async getTrainers(): Promise<AxiosResponse<ITrainer[]>> {
    return $api.get('/trainer');
  }

  static async getTrainer(id: number): Promise<AxiosResponse<ITrainer>> {
    return $api.get(`/trainer/${id}`);
  }

  static async createTrainer(
    trainer: CreateTrainerDTO
  ): Promise<AxiosResponse<ITrainer>> {
    return $api.post('/trainer', trainer);
  }

  static async updateTrainer(
    id: number,
    trainer: UpdateTrainerDTO
  ): Promise<AxiosResponse<ITrainer>> {
    return $api.patch(`/trainer/${id}`, trainer);
  }

  static async deleteTrainer(id: number): Promise<AxiosResponse> {
    return $api.delete(`/trainer/${id}`);
  }

  static async addTrainerImage(file: string): Promise<AxiosResponse> {
    return $api.post('/trainer/upload/image', file);
  }
}
