import { IChangePasswordDTO } from '@/models/requests/PasswordRequests';
import PasswordService from '@/services/passwordService';
import { CatchError } from '@/types/errors';
import { SuccessOrError } from '@/types/store';
import { AxiosError } from 'axios';
import { makeAutoObservable } from 'mobx';

class PasswordStore {
  isSuccess: boolean = false;
  isError: boolean = false;
  // Create alerts for errors?
  errorMessage: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  async confirmPassword(new_password: string) {
    try {
      await PasswordService.passwordConfirm(new_password);
      sessionStorage.removeItem('reset_token');
      this.setSuccess(true);
    } catch (e: any) {
      this.setError(true, e.message as CatchError);
    }
  }

  async changePassword({
    old_password,
    new_password,
  }: IChangePasswordDTO): Promise<SuccessOrError> {
    try {
      await PasswordService.passwordChange({ old_password, new_password });
      return { successMsg: 'Password was successfully changed', errorMsg: '' };
    } catch (e) {
      const axiosErrorMessage = (e as AxiosError<{ message: string }>).response
        ?.data.message;
      return {
        successMsg: '',
        errorMsg: axiosErrorMessage || 'Error while changing password',
      };
    }
  }

  /*
    UTILS 
  */
  setSuccess(bool: boolean) {
    this.isSuccess = bool;
    this.resetError();
  }

  setError(bool: boolean, message: string) {
    this.isError = bool;
    this.errorMessage = message;
  }

  resetError() {
    this.isError = false;
    this.errorMessage = '';
  }
}

const passwordStore = new PasswordStore();
export default passwordStore;
