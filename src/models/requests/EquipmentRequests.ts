export interface ICreateEquipmentDTO {
  name: string;
  description: string;
  price_per_hour: number;
}

export interface IUpdateEquipmentDTO extends Partial<ICreateEquipmentDTO> {}