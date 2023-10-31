export interface CreateManagerDTO {
  user_id: number;
  first_name: string;
  last_name: string;
  description: string;
  hired_at: Date | string;
  resigned_at?: Date | string;
}

export interface UpdateManagerDTO extends Partial<CreateManagerDTO> {}
