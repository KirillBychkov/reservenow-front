import { Manager } from '@/models/Manager';
import { Trainer } from '@/models/Trainer';
import { CreateManagerDTO } from '@/models/requests/ManagerRequests';
import ManagerService from '@/services/managerService';
import TrainerService from '@/services/trainerService';
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

  setTrainers(trainers: Trainer[]) {
    this.trainers = trainers;
  }

  createManager = async (
    manager: CreateManagerDTO,
  ): Promise<ResponseOrError<Manager>> => {
    try {
      const res = await ManagerService.createManager(manager);
      return { data: res.data, error: '' };
    } catch (error) {
      return { data: {} as Manager, error: 'Error creating manager' };
    }
  };

  getTrainers = async (): Promise<ResponseOrError<Trainer[]>> => {
    try {
      const { data: trainers } = await TrainerService.getTrainers();

      this.setTrainers(trainers);
      return { data: trainers, error: '' };
    } catch {
      return { data: [], error: 'Error getting trainers' };
    }
  };
}

const personnelStore = new PersonnelStore();
export default personnelStore;
