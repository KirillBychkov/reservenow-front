import { IAccount } from './IUser';

export interface AuthDTO {
  access_token: string;
  refresh_token: string;
  account: IAccount;
}
