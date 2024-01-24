import { WeekWorkingHours } from '@/types/weekWorkingHours';
import { User } from './User';
import { RentalObject, TopObject } from './RentalObject';
import { TopClient } from './Client';

export interface Organization extends WeekWorkingHours {
  id: number;
  name: string;
  user: User;
  rental_objects: RentalObject[];
  // TODO: add reservations like reservations: IReservation[];
  description?: string;
  photo?: string;
  phone: string;
  address: string;
  created_at: string;
  update_at: string;
}

export interface OrganizationStatistics {
  id: number;
  organization: Organization;
  total_revenue: number;
  total_reservations: number;
  total_hours: number;
  organization_load: number;
  statistics_per_period: StatisticsPerPeriod[];
  top_objects: TopObject[];
  top_clients: TopClient[];
  created_at: string;
  updated_at: string;
}

export interface StatisticsPerPeriod {
  week: number;
  total_revenue: number;
  total_reservations: number;
  total_hours: number;
}
