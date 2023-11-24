import { Filters } from '../Filters';
import { User } from '../User';

export interface Users {
  filters: Filters;
  data: User[];
}
