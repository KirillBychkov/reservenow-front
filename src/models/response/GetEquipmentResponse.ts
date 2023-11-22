import { IEquipment } from "../IEquipment";
import { IFilters } from "../IFilters";

export interface IEquipments {
  filters: IFilters;
  data: IEquipment[];
}