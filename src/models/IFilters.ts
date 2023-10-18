export interface IFilters {
  skip?: number;
  limit?: number;
  search?: string;
  sorted?: string;
  total: number;
  recieved?: number;
}
