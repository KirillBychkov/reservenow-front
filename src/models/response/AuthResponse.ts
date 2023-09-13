import { IAccount } from '../IUser';

export interface IAuthResponse {
  access_token: string;
  refresh_token: string;
  account: IAccount;
}
