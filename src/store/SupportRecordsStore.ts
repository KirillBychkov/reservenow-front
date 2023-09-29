import { ISupport } from '@/models/ISupport';
import SupportService from '@/services/supportService';
import { makeAutoObservable } from 'mobx';

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
}

const supportRecordsStore = new SupportRecordsStore();
export default supportRecordsStore;
