import { IFilters } from '@/models/IFilters';
import { IObject } from '@/models/IObject';
import { IObjects } from '@/models/response/GetObjectsResponse';
import ObjectService from '@/services/objectService';
import { ResponseOrError } from '@/types/store';
import { makeAutoObservable } from 'mobx';

class ObjectsStore {
  isLoading: boolean = false;
  isSuccess: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';
  objects: IObject[] = [];
  filters: IFilters = { total: 0, limit: 4 };

  constructor() {
    makeAutoObservable(this);
  }

  fetchObjects = async (
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
      if (e instanceof Error) {
        return { data: [], error: 'An error occurred while fetching objects.' };
      }
    }
    return { data: [], error: 'Unknown error' };
  };

  //   async addObject(object: ICreateObjectDTO) {
  //     try {
  //       await ObjectService.addObject(object);
  //     } catch (e) {
  //       if (e instanceof Error) {
  //         this.setError(true, e.message as CatchError);
  //       }
  //     }
  //   }

  //   getObjectById = async (
  //     id: number
  //   ): Promise<ResponseOrError<IObject>> => {
  //     const objects = this.objects?.find(
  //       (objects) => objects?.id === id
  //     );

  //     if (objects) return { data: objects, error: '' };

  //     try {
  //       const objectData = await ObjectService.getObjectById(
  //         id
  //       );
  //       this.objects?.push(objectData);
  //       return { data: objectData, error: '' };
  //     } catch (e) {
  //       return { data: {} as IObject, error: 'Object not found' };
  //     }
  //   };

  /*
    UTILS 
  */

  setSuccess(bool: boolean) {
    this.isSuccess = bool;
    this.resetError();
  }

  setError(bool: boolean, message: string) {
    this.isError = bool;
    this.errorMessage = message;
  }
  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  resetError() {
    this.isError = false;
    this.errorMessage = '';
  }

  get getFilters() {
    return this.filters;
  }

  setFilters(filters: IFilters) {
    this.filters = filters;
  }
  setObjects(objects: IObject[]) {
    this.objects = objects;
  }

  get getObjects() {
    return this.objects;
  }
}

const objectsStore = new ObjectsStore();
export default objectsStore;
