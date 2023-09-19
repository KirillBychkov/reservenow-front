// TODO: use IUser or another data from models/ instead of User
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

export enum UserStatus {
  PENDING = 'Pending',
  ACTIVE = 'Active',
  BLOCKED = 'Blocked',
  DELETED = 'Deleted',
}

export const StatusOptions: UserStatus[] = [
  UserStatus.PENDING,
  UserStatus.ACTIVE,
  UserStatus.BLOCKED,
  UserStatus.DELETED,
];
