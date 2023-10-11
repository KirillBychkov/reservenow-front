import { IUserDTO } from '../IUser';

export interface ICreateUserDTO {
  email: string;
  user: IUserDTO;
}

export interface IUpdateUserDTO extends Partial<IUserDTO> {}
