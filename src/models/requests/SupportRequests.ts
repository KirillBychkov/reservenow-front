import { SupportStatus } from '@/types/enums/support';

export interface CreateSupportDTO {
  client_description: string;
}

export interface UpdateSupportDTO {
  status: SupportStatus;
  result_description: string;
}
