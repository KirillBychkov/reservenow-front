import { IFilters } from '../IFilters';
import { IUser } from '../IUser';

export interface IUsers {
  filters: IFilters;
  data: IUser[];
}
