import { ISupport } from '@/models/ISupport';
import SupportService from '@/services/supportService';
import { SupportStatus } from '@/types/enums/support';
import { makeAutoObservable } from 'mobx';

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
}
class SupportRecordsStore {
  supportRecords: ISupport[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setSupportRecords(supportRecords: ISupport[]) {
    this.supportRecords = supportRecords;
  }

  async getSupportRecords(): Promise<ISupport[]> {
    try {
      const response = await SupportService.getAllSupportRecords();
      this.setSupportRecords(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }

  async getSupportRecordById(id: number): Promise<ISupport> {
    try {
      const existedRecord = this.supportRecords.find(
        (record) => record.id === id
      );
      if (existedRecord) return existedRecord;
      const { data } = await SupportService.getSupportRecordById(id);
      return data;
    } catch (e) {
      console.log(e);
      return {} as ISupport;
    }
  }

  async getPlainSupportRecordInfo(id: number): Promise<PlainSupportRecordInfo> {
    const supportRecord = await this.getSupportRecordById(id);
    return {
      id: supportRecord.id,
      firstName: supportRecord.user.first_name,
      lastName: supportRecord.user.last_name,
      email: supportRecord?.user?.account?.email || '',
      phone: supportRecord.user.phone,
      companyName: supportRecord.user.domain_url,
      clientDescription: supportRecord.client_description,
      createdAt: supportRecord.created_at,
      status: (supportRecord.status as SupportStatus) || SupportStatus.NEW,
      resultDescription: supportRecord.result_description || '',
    };
  }
}

const supportRecordsStore = new SupportRecordsStore();
export default supportRecordsStore;
