import { WeekWorkingHours } from '@/types/weekWorkingHours';

export interface CreateRentalObjectDTO extends WeekWorkingHours {
  price_per_hour: number;
  name: string;
  description?: string;
  phone: string;
  address: string;
  organization_id: number;
}

export interface UpdateRentalObjectDTO extends Partial<CreateRentalObjectDTO> {
  photo?: string;
}
