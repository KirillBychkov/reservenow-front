import { Week } from './weekWorkingHours';

export interface ObjectFormData {
  phone: string;
  address: string;
  name: string;
  description: string;
  price: number;
  workingHours: Week;
}
