import { IUser } from '../IUser';

export interface IFilters {
  skip?: number;
  limit?: number;
  search?: string;
  total: number;
}

export interface IUsers {
  filters: IFilters;
  data: IUser[];
}
