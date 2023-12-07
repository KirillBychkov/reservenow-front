import { ClientStatus } from "@/types/enums/client"
export interface CreateClientDTO {
  first_name: string;
  last_name: string;
  phone: string;
  description?: string;
}

export type UpdateClientDTO = Partial<CreateClientDTO> & {
  status: ClientStatus
}
