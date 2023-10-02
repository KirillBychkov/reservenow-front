import { SupportStatus } from '@/types/enums/support';

export interface ICreateSupportDTO {
  client_description: string;
}

export interface IUpdateSupportDTO extends ICreateSupportDTO {
  status: SupportStatus;
}
