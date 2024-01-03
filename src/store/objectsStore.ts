import { Filters } from '@/models/Filters';
import { RentalObject } from '@/models/RentalObject';
import {
  CreateRentalObjectDTO,
  UpdateRentalObjectDTO,
} from '@/models/requests/ObjectsRequests';
import ObjectService from '@/services/objectService';
import { ResponseOrError, SuccessOrError } from '@/types/store';
import { makeAutoObservable } from 'mobx';

class ObjectsStore {
  objects: RentalObject[] = [];
  filters: Filters = { total: 0, limit: 4 };

  constructor() {
    makeAutoObservable(this);
  }

  getRentalObjects = async (
    filters?: Omit<Filters, 'total'>,
    organizationId?: number,
  ): Promise<ResponseOrError<RentalObject[]>> => {
    try {
      const response = await ObjectService.getObjects(filters, organizationId);
      if (response.data.length === 0) {
        return { data: [], error: 'No objects found' };
      }
      this.setFilters(response.data.filters);
      this.setObjects(response.data.data);
      return { data: response.data.data, error: '' };
    } catch (e) {
      return { data: [], error: 'An error occurred while fetching objects.' };
    }
  };

  getRentalObject = async (
    id: number,
  ): Promise<ResponseOrError<RentalObject>> => {
    try {
      const response = await ObjectService.getObjectById(id);

      return { data: response.data, error: '' };
    } catch (e) {
      return {
        data: {} as RentalObject,
        error: 'An error occurred while fetching object.',
      };
    }
  };

  addRentalObject = async (
    object: CreateRentalObjectDTO,
    file?: File,
  ): Promise<SuccessOrError> => {
    try {
      const response = await ObjectService.addObject(object);
      this.objects.push(response.data);
      if (!file) {
        return { successMsg: 'Object added', errorMsg: '' };
      }
      const uploadRes = await this.uploadImage(response.data.id, file);
      return uploadRes;
    } catch (e) {
      return { successMsg: '', errorMsg: 'Error while adding object' };
    }
  };

  editRentalObject = async (
    object: UpdateRentalObjectDTO,
    id: number,
    file?: File,
  ): Promise<SuccessOrError> => {
    try {
      const response = await ObjectService.editObject(id, object);
      const index = this.objects.findIndex((obj) => obj.id === id);
      this.objects[index] = response.data;
      if (!file) {
        return { successMsg: 'Object edited', errorMsg: '' };
      }
      const uploadRes = await this.uploadImage(id, file);
      return uploadRes;
    } catch (e) {
      return { successMsg: '', errorMsg: 'Error while editing object' };
    }
  };

  uploadImage = async (id: number, file: File): Promise<SuccessOrError> => {
    try {
      await ObjectService.uploadImage(id, file);
      return { successMsg: 'Image uploaded', errorMsg: '' };
    } catch (e) {
      return { successMsg: '', errorMsg: 'Error while uploading image' };
    }
  };

  /*
    UTILS 
  */

  get getFilters() {
    return this.filters;
  }

  setFilters(filters: Filters) {
    this.filters = filters;
  }

  // get getObjects() {
  //   return this.objects;
  // }

  setObjects(objects: RentalObject[]) {
    this.objects = objects;
  }
}

const objectsStore = new ObjectsStore();
export default objectsStore;
