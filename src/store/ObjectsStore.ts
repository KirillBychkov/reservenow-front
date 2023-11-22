import { IFilters } from '@/models/IFilters';
import { IObject } from '@/models/IObject';
import { CreateRentalObjectDTO } from '@/models/requests/ObjectsRequests';
import { IObjects } from '@/models/response/GetObjectsResponse';
import ObjectService from '@/services/objectService';
import { ResponseOrError, SuccessOrError } from '@/types/store';
import { makeAutoObservable } from 'mobx';

class ObjectsStore {
  objects: IObject[] = [];
  filters: IFilters = { total: 0, limit: 4 };

  constructor() {
    makeAutoObservable(this);
  }

  getRentalObjects = async (
    filters: Omit<IFilters, 'total'>
  ): Promise<ResponseOrError<IObjects[]>> => {
    try {
      const response = await ObjectService.getObjects(filters);
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

  addRentalObject = async (
    object: CreateRentalObjectDTO
  ): Promise<SuccessOrError> => {
    try {
      const response = await ObjectService.addObject(object);
      this.objects.push(response.data);
      return { successMsg: 'Object added', errorMsg: '' };
    } catch (e) {
      return { successMsg: '', errorMsg: 'Error while adding object' };
    }
  };

  /*
    UTILS 
  */

  get getFilters() {
    return this.filters;
  }

  setFilters(filters: IFilters) {
    this.filters = filters;
  }

  get getObjects() {
    return this.objects;
  }

  setObjects(objects: IObject[]) {
    this.objects = objects;
  }
}

const objectsStore = new ObjectsStore();
export default objectsStore;
