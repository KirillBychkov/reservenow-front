import { Manager } from '@/models/Manager';
import { Trainer } from '@/models/Trainer';
import {
  CreateManagerDTO,
  UpdateManagerDTO,
} from '@/models/requests/ManagerRequests';
import { CreateTrainerDTO } from '@/models/requests/TrainerRequests';
import ManagerService from '@/services/managerService';
import TrainerService from '@/services/trainerService';
import { ResponseOrError, SuccessOrError } from '@/types/store';
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
      const res = await ManagerService.createManager(manager);
      this.personnel.managers.push(res.data);
      return { successMsg: 'Created manager succesfully', errorMsg: '' };
    } catch (error) {
      return { successMsg: '', errorMsg: 'Error creating manager' };
    }
  };

  updateManager = async (
    id: number,
    manager: UpdateManagerDTO,
  ): Promise<SuccessOrError> => {
    try {
      await ManagerService.updateManager(id, manager);
      return { successMsg: 'Updated manager succesfully', errorMsg: '' };
    } catch (error) {
      return { successMsg: '', errorMsg: 'Error updating manager' };
    }
  };

  getManagers = async (): Promise<ResponseOrError<Manager[]>> => {
    try {
      const response = await ManagerService.getManagers();
      this.setManagers(response.data);
      return { data: response.data, error: '' };
    } catch (e) {
      return { data: [], error: 'Error getting managers' };
    }
  };

  getManager = async (id: number): Promise<ResponseOrError<Manager>> => {
    try {
      const res = await ManagerService.getManager(id);
      return { data: res.data, error: '' };
    } catch (e) {
      return { data: {} as Manager, error: 'Error getting manager' };
    }
  };

  // Trainers
  setTrainers(trainers: Trainer[]) {
    this.personnel.trainers = trainers;
  }

  createTrainer = async (
    trainer: CreateTrainerDTO,
  ): Promise<SuccessOrError> => {
    try {
      const res = await TrainerService.createTrainer(trainer);
      this.personnel.trainers.push(res.data);
      return { successMsg: 'Created trainer successfully', errorMsg: '' };
    } catch (error) {
      return { successMsg: '', errorMsg: 'Error creating trainer' };
    }
  };

  getTrainers = async (): Promise<ResponseOrError<Trainer[]>> => {
    try {
      const response = await TrainerService.getTrainers();
      this.setTrainers(response.data);
      return { data: response.data, error: '' };
    } catch (e) {
      return { data: [], error: 'Error getting trainers' };
    }
  };

  getTrainer = async (id: number): Promise<ResponseOrError<Trainer>> => {
    try {
      const res = await TrainerService.getTrainer(id);
      return { data: res.data, error: '' };
    } catch (e) {
      return { data: {} as Trainer, error: 'Error getting trainer' };
    }
  };

  // General
  getPersonnel = async (): Promise<ResponseOrError<Personnel>> => {
    try {
      const managers = await this.getManagers();
      const trainers = await this.getTrainers();
      if (managers.error || trainers.error) {
        return { data: {} as Personnel, error: 'Error getting personnel' };
      }
      return { data: this.personnel, error: '' };
    } catch (e) {
      return { data: {} as Personnel, error: 'Error getting personnel' };
    }
  };
}

const personnelStore = new PersonnelStore();
export default personnelStore;
