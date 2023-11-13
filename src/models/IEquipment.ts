import { IUser } from "./IUser";

export interface IEquipment {
  id: number;
  user: IUser;
  name: string;
  description?: string;
  price_per_hour:	number;
  created_at: Date | string;
  updated_at: Date | string;
}