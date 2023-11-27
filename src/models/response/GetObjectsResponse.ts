import { Filters } from '../Filters';
import { RentalObject } from '../RentalObject';

export interface RentalObjects {
  filters: Filters;
  data: RentalObject[];
}
