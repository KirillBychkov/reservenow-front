import { IManager } from '@/models/IManager';
import { ITrainer } from '@/models/ITrainer';
import { CreateManagerDTO } from '@/models/requests/ManagerRequests';
import ManagerService from '@/services/managerService';
import { ResponseOrError } from '@/types/store';
import { makeAutoObservable } from 'mobx';

class PersonnelStore {
  managers: IManager[] = [];
  trainers: ITrainer[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // Managers
  setManagers(managers: IManager[]) {
    this.managers = managers;
  }

  createManager = async (
    manager: CreateManagerDTO
  ): Promise<ResponseOrError<IManager>> => {
    try {
      const res = await ManagerService.createManager(manager);
      return { data: res.data, error: '' };
    } catch (error) {
      return { data: {} as IManager, error: 'Error creating manager' };
    }
  };
}

const personnelStore = new PersonnelStore();
export default personnelStore;
