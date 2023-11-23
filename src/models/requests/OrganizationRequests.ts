import { WeekWorkingHours } from '@/types/weekWorkingHours';

export interface ICreateOrganizationDTO extends WeekWorkingHours {
  name: string;
  description?: string;
  phone: string;
  address: string;
}

export interface IUpdateOrganizationDTO
  extends Partial<ICreateOrganizationDTO> {}
