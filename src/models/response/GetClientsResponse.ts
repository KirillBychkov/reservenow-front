import { Client } from "../Client";
import { Filters } from "../Filters";
import { Order } from "../Order";

export interface Clients {
  filters: Filters;
  data: Client[];
}

export interface ClientOrders {
  filters: Filters;
  data: Order[]
}