import { Equipment } from '../Equipment';
import { Filters } from '../Filters';

export interface Equipments {
  filters: Filters;
  data: Equipment[];
}
