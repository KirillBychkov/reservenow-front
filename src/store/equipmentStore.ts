import { Equipment } from '@/models/Equipment';
import { Filters } from '@/models/Filters';
import {
  CreateEquipmentDTO,
  UpdateEquipmentDTO,
} from '@/models/requests/EquipmentRequests';
import EquipmentService from '@/services/equipmentService';
import { ResponseOrError, SuccessOrError } from '@/types/store';
import { makeAutoObservable } from 'mobx';

class EquipmentStore {
  equipment: Equipment[] = [];
  filters: Filters = { total: 0, limit: 4 };

  constructor() {
    makeAutoObservable(this);
  }

  getFilters() {
    return this.filters;
  }

  setFilters(filters: Filters) {
    this.filters = filters;
  }

  setEquipment(equipment: Equipment[]) {
    this.equipment = equipment;
  }

  addEquipment = async (
    equipment: CreateEquipmentDTO,
  ): Promise<SuccessOrError> => {
    try {
      const { data: createdEquipment } =
        await EquipmentService.createEquipment(equipment);
      this.equipment.push(createdEquipment);
      return { successMsg: 'Equipment was created', errorMsg: '' };
    } catch {
      return { successMsg: '', errorMsg: 'Error creating equipment' };
    }
  };

  getEquipment = async (
    filters?: Omit<Filters, 'total'>,
  ): Promise<ResponseOrError<Equipment[]>> => {
    try {
      const { data } = await EquipmentService.getEquipment(filters);

      if (!data.data.length) {
        return { data: [], error: 'No equipment found' };
      }

      this.setEquipment(data.data);
      this.setFilters(data.filters);
      return { data: data.data, error: '' };
    } catch {
      return { data: [], error: 'An error occurred while fetching equipment' };
    }
  };

  getEquipmentById = async (
    id: number,
  ): Promise<ResponseOrError<Equipment>> => {
    const equipment = this.equipment.find((eq) => eq.id === id);

    if (equipment) {
      return { data: equipment, error: '' };
    }

    try {
      const { data: fetchedEquipment } =
        await EquipmentService.getEquipmentById(id);

      this.equipment.push(fetchedEquipment);
      return { data: fetchedEquipment, error: '' };
    } catch {
      return { data: {} as Equipment, error: 'Equipment not found' };
    }
  };

  updateEquipment = async (
    id: number,
    equipment: UpdateEquipmentDTO,
  ): Promise<SuccessOrError> => {
    try {
      const { data: updatedEquipment } = await EquipmentService.updateEquipment(
        id,
        equipment,
      );

      this.equipment = this.equipment.map((eq) => {
        if (eq.id === id) {
          return updatedEquipment;
        }

        return eq;
      });

      return { successMsg: 'Updated equipment', errorMsg: '' };
    } catch {
      return { successMsg: '', errorMsg: 'Error updating equipment' };
    }
  };

  deleteEquipment = async (id: number): Promise<SuccessOrError> => {
    try {
      await EquipmentService.deleteEquipment(id);
      this.equipment = this.equipment.filter((eq) => eq.id !== id);

      return { successMsg: 'Deleted equipment successfully', errorMsg: '' };
    } catch {
      return { successMsg: '', errorMsg: 'Error deleting equipment' };
    }
  };
}

const equipmentStore = new EquipmentStore();
export default equipmentStore;
