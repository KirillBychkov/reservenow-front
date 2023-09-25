import { UserStatus } from './enums/user';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  companyName: string;
  image?: string;
  description?: string;
  status: UserStatus;
}
