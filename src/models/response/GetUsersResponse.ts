import { IAccount, IUser } from '../IUser';

export interface IFilters {
  skip?: number;
  limit?: number;
  search?: string;
  total: number;
}

export interface IClient extends IUser {
  account: Pick<IAccount, 'email' | 'role' | 'status'>;
}

export interface IClients {
  filters: IFilters;
  data: IClient[];
}
