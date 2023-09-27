import { UserStatus } from '@/types/user';
import { IUserDTO } from '../IUser';

export interface ICreateUserDTO {
  email: string;
  status: UserStatus;
  user: IUserDTO;
}

export interface IUpdateUserDTO extends Partial<IUserDTO> {}
