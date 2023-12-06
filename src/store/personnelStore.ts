import { Manager } from '@/models/Manager';
import { Trainer } from '@/models/Trainer';
import { CreateManagerDTO } from '@/models/requests/ManagerRequests';
import ManagerService from '@/services/managerService';
import { SuccessOrError } from '@/types/store';
import { makeAutoObservable } from 'mobx';

export interface Personnel {
  managers: Manager[];
  trainers: Trainer[];
}
class PersonnelStore {
  personnel: Personnel = {
    managers: [],
    trainers: [],
  };

  constructor() {
    makeAutoObservable(this);
  }

  // Managers
  setManagers(managers: Manager[]) {
    this.personnel.managers = managers;
  }

  createManager = async (
    manager: CreateManagerDTO,
  ): Promise<SuccessOrError> => {
    try {
      await ManagerService.createManager(manager);
      return { successMsg: 'Created manager succesfully', errorMsg: '' };
    } catch (error) {
      return { successMsg: '', errorMsg: 'Error creating manager' };
    }
  };
}

const personnelStore = new PersonnelStore();
export default personnelStore;
