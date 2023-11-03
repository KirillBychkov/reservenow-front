import { WeekWorkingHours } from '@/types/weekWorkingHours';

export interface CreateTrainerDTO extends WeekWorkingHours {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  description?: string;
  image?: string;
  hired_at: Date | string;
  resigned_at?: Date | string;
  price_per_hour: number;
}

export interface UpdateTrainerDTO extends Partial<CreateTrainerDTO> {}
