import { UserDTO } from '../User';

export interface CreateUserDTO {
  email: string;
  user: UserDTO;
}

export interface UpdateUserDTO extends Partial<UserDTO> {}
