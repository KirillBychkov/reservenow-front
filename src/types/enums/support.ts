export enum SupportStatus {
  NEW = 'new',
  IN_PROGRESS = 'in_progress',
  FIXED = 'fixed',
  REJECTED = 'rejected',
}

export const SupportStatusOptions: SupportStatus[] =
  Object.values(SupportStatus);
