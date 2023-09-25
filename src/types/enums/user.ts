// Roles
export enum UserRole {
  Superuser = 'superuser',
  UserFull = 'user_full',
  Default = 'null',
}

// Status
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
