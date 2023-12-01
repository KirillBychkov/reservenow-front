import { Filters } from '../Filters';
import { Order } from '../Order';

export interface Orders {
  filters: Filters;
  data: Order[];
}
