export interface CreateEquipmentDTO {
  name: string;
  description?: string;
  price: number;
}

export interface UpdateEquipmentDTO extends Partial<CreateEquipmentDTO> {}
