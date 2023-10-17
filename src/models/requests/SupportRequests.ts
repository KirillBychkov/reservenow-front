import { SupportStatus } from '@/types/enums/support';

export interface ICreateSupportDTO {
  client_description: string;
}

export interface IUpdateSupportDTO {
  status: SupportStatus;
  result_description: string;
}
