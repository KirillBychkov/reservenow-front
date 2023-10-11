import { ISupport } from '@/models/ISupport';
import { IUpdateSupportDTO } from '@/models/requests/SupportRequests';
import SupportService from '@/services/supportService';
import { SupportStatus } from '@/types/enums/support';
import { ResponseOrError, SuccessOrError } from '@/types/store';
import { PlainSupportRecordInfo } from '@/types/support';
import { makeAutoObservable } from 'mobx';

class SupportRecordsStore {
  supportRecords: ISupport[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setSupportRecords(supportRecords: ISupport[]) {
    this.supportRecords = supportRecords;
  }

  getSupportRecords = async (): Promise<ResponseOrError<ISupport[]>> => {
    try {
      const response = await SupportService.getAllSupportRecords();
      this.setSupportRecords(response.data);
      return { data: response.data, error: '' };
    } catch (e) {
      console.log(e);
      return { data: [], error: 'Error getting support records' };
    }
  };

  updateSupportRecord = async (
    id: number,
    data: IUpdateSupportDTO
  ): Promise<SuccessOrError> => {
    try {
      const res = await SupportService.updateSupportRecordById(id, data);
      const updatedRecord = res.data;
      this.supportRecords[updatedRecord.id] = updatedRecord;
      return { successMsg: 'Support record updated', errorMsg: '' };
    } catch (e) {
      console.log(e);
      return { successMsg: '', errorMsg: 'Error updating support record' };
    }
  };

  getSupportRecordById = async (
    id: number
  ): Promise<ResponseOrError<ISupport>> => {
    try {
      const existedRecord = this.supportRecords.find(
        (record) => record.id === id
      );
      if (existedRecord) return { data: existedRecord, error: '' };
      const { data } = await SupportService.getSupportRecordById(id);
      return { data, error: '' };
    } catch (e) {
      console.log(e);
      return { data: {} as ISupport, error: 'Support record not found' };
    }
  };

  getPlainSupportRecordInfo = async (
    id: number
  ): Promise<ResponseOrError<PlainSupportRecordInfo>> => {
    const { data: supportRecord, error } = await this.getSupportRecordById(id);
    if (error) {
      return { data: {} as PlainSupportRecordInfo, error: error };
    }
    const plainSupportRecordInfo: PlainSupportRecordInfo = {
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
    return { data: plainSupportRecordInfo, error: '' };
  };
}

const supportRecordsStore = new SupportRecordsStore();
export default supportRecordsStore;
