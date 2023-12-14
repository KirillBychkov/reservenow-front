import { Week } from './weekWorkingHours';

export interface TrainerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  description: string;
  price: number;
  workingHours: Week;
}
