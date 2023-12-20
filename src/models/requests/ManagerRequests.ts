export interface CreateManagerDTO {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  description?: string;
  hired_at?: Date | string;
  resigned_at?: Date | string;
}

export interface UpdateManagerDTO extends Partial<CreateManagerDTO> {}
