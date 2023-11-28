export interface CreateClientDTO {
  first_name: string,
  last_name: string,
  phone: string,
  description: string
}

export interface UpdateClientDTO extends Partial<CreateClientDTO> {}