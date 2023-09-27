export enum SupportStatus {
  NEW = 'New',
  IN_PROGRESS = 'In progress',
  FIXED = 'Fixed',
  REJECTED = 'Rejected',
}

export const SupportStatusOptions: SupportStatus[] =
  Object.values(SupportStatus);
