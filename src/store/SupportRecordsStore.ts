import { Filters } from '@/models/Filters';
import { Support } from '@/models/Support';
import { UpdateSupportDTO } from '@/models/requests/SupportRequests';
import SupportService from '@/services/supportService';
import { SupportStatus } from '@/types/enums/support';
import { ResponseOrError, SuccessOrError } from '@/types/store';
import { PlainSupportRecordInfo } from '@/types/support';
import { makeAutoObservable } from 'mobx';

class SupportRecordsStore {
  supportRecords: Support[] = [];
  filters: Filters = { total: 0, limit: 1 };

  constructor() {
    makeAutoObservable(this);
  }

  setSupportRecords(supportRecords: Support[]) {
    this.supportRecords = supportRecords;
  }

  getFilters() {
    return this.filters;
  }

  setFilters(filters: Filters) {
    this.filters = filters;
  }

  getSupportRecords = async (
    filters: Omit<Filters, 'total'>
  ): Promise<ResponseOrError<Support[]>> => {
    try {
      const response = await SupportService.getAllSupportRecords(filters);
      if (response.data.data.length === 0) {
        return { data: [], error: 'No records found' };
      }
      this.setSupportRecords(response.data.data);
      this.setFilters(response.data.filters);
      return { data: response.data.data, error: '' };
    } catch (e) {
      return { data: [], error: 'Error getting support records' };
    }
  };

  updateSupportRecord = async (
    id: number,
    data: UpdateSupportDTO
  ): Promise<SuccessOrError> => {
    try {
      const res = await SupportService.updateSupportRecordById(id, data);
      const updatedRecord = res.data;
      this.supportRecords[updatedRecord.id] = updatedRecord;
      return { successMsg: 'Support record updated', errorMsg: '' };
    } catch (e) {
      return { successMsg: '', errorMsg: 'Error updating support record' };
    }
  };

  getSupportRecordById = async (
    id: number
  ): Promise<ResponseOrError<Support>> => {
    try {
      const existedRecord = this.supportRecords.find(
        (record) => record.id === id
      );
      if (existedRecord) return { data: existedRecord, error: '' };
      const { data } = await SupportService.getSupportRecordById(id);
      return { data, error: '' };
    } catch (e) {
      return { data: {} as Support, error: 'Support record not found' };
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
      file: supportRecord.file || '',
    };
    return { data: plainSupportRecordInfo, error: '' };
  };

  createSupportRecord = async (
    client_description: string,
    file?: File
  ): Promise<SuccessOrError> => {
    try {
      const { data: createdRecord } = await SupportService.createSupportRecord(
        client_description
      );

      if (!file) {
        return { successMsg: 'Record created successfully', errorMsg: '' };
      }

      await SupportService.uploadImageForRecord(createdRecord.id, file);

      return { successMsg: 'Record created successfully', errorMsg: '' };
    } catch {
      return { successMsg: '', errorMsg: 'Error creating support record' };
    }
  };
}

const supportRecordsStore = new SupportRecordsStore();
export default supportRecordsStore;
