import { Account } from './User';

export interface AuthDTO {
  access_token: string;
  refresh_token: string;
  account: Account;
}
