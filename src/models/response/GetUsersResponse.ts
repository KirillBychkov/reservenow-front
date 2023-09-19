import { IUser } from '../IUser';

export interface IFilters {
  skip?: number;
  limit?: number;
  search?: string;
  total: number;
}
export interface IGetAllUsers {
  filters: IFilters;
  data: IUser[];
}
