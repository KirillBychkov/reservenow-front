import { Week } from './weekWorkingHours';

export interface OrganizationFormData {
  name: string;
  description?: string;
  phone: string;
  address: string;
  workingHours: Week;
}
