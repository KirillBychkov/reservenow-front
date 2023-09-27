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

export const UserStatusOptions: UserStatus[] = Object.values(UserStatus);
