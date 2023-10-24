import { IObject } from '../IObject';
import { IFilters } from './GetUsersResponse';

export interface IObjects {
  filters: IFilters;
  data: IObject[];
}
