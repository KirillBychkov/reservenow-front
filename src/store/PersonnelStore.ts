import { Manager } from '@/models/Manager';
import { Trainer } from '@/models/Trainer';
import { CreateManagerDTO } from '@/models/requests/ManagerRequests';
import ManagerService from '@/services/managerService';
import { ResponseOrError } from '@/types/store';
import { makeAutoObservable } from 'mobx';

class PersonnelStore {
  managers: Manager[] = [];
  trainers: Trainer[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // Managers
  setManagers(managers: Manager[]) {
    this.managers = managers;
  }

  createManager = async (
    manager: CreateManagerDTO
  ): Promise<ResponseOrError<Manager>> => {
    try {
      const res = await ManagerService.createManager(manager);
      return { data: res.data, error: '' };
    } catch (error) {
      return { data: {} as Manager, error: 'Error creating manager' };
    }
  };
}

const personnelStore = new PersonnelStore();
export default personnelStore;
