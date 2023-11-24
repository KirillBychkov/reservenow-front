export interface CreateEquipmentDTO {
  name: string;
  description?: string;
  price_per_hour: number;
}

export interface UpdateEquipmentDTO extends Partial<CreateEquipmentDTO> {}
