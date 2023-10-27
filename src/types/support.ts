import { SupportStatus } from './enums/support';

export interface PlainSupportRecordInfo {
  id: number;
  createdAt: Date | string;
  clientDescription: string;
  email: string;
  status: SupportStatus;
  resultDescription: string;
  firstName: string;
  lastName: string;
  phone: string;
  companyName: string;
  file?: string;
}
