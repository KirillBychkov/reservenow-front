import $api from '@/http';
import { Trainer } from '@/models/Trainer';
import {
  CreateTrainerDTO,
  UpdateTrainerDTO,
} from '@/models/requests/TrainerRequests';
import { AxiosResponse } from 'axios';

export default class TrainerService {
  static async getTrainers(): Promise<AxiosResponse<Trainer[]>> {
    return $api.get('/trainer');
  }

  static async getTrainer(id: number): Promise<AxiosResponse<Trainer>> {
    return $api.get(`/trainer/${id}`);
  }

  static async createTrainer(
    trainer: CreateTrainerDTO
  ): Promise<AxiosResponse<Trainer>> {
    return $api.post('/trainer', trainer);
  }

  static async updateTrainer(
    id: number,
    trainer: UpdateTrainerDTO
  ): Promise<AxiosResponse<Trainer>> {
    return $api.patch(`/trainer/${id}`, trainer);
  }

  static async deleteTrainer(id: number): Promise<AxiosResponse> {
    return $api.delete(`/trainer/${id}`);
  }

  static async addTrainerImage(file: string): Promise<AxiosResponse> {
    return $api.post('/trainer/upload/image', file);
  }
}
