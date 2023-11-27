export interface PlainUserInfo {
  id?: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  companyName: string;
  description: string;
  status: UserStatus;
}

export enum UserStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  BLOCKED = 'blocked',
  DELETED = 'deleted',
}

export const StatusOptions: UserStatus[] = [
  UserStatus.PENDING,
  UserStatus.ACTIVE,
  UserStatus.BLOCKED,
  UserStatus.DELETED,
];

export type UserFormData = Omit<PlainUserInfo, 'status'>;
