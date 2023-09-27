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
      console.log(response.data);

      this.setSupportRecords(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
      return [];
    }
  }
}

const supportRecordsStore = new SupportRecordsStore();
export default supportRecordsStore;
