export interface IFilters {
  skip?: number;
  limit?: number;
  search?: string;
  sort?: string;
  sorted?: string;
  total: number;
  recieved?: number;
}
