import { WeekWorkingHours } from '@/types/weekWorkingHours';

export interface CreateOrganizationDTO extends WeekWorkingHours {
  name: string;
  description?: string;
  phone: string;
  address: string;
}

export interface UpdateOrganizationDTO extends Partial<CreateOrganizationDTO> {}
