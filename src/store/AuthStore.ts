import { UserRole } from '@/types/enums/user';
import { IAccount, IUser } from '@/models/IUser';
import AuthService from '@/services/authService';
import { computed, makeAutoObservable } from 'mobx';
import { ISignInDTO } from '@/models/requests/AuthRequests';
import { ResponseOrError, SuccessOrError } from '@/types/store';

class AuthStore {
  user = {} as IAccount;
  isAuth: boolean = false;
  userRole: string = '';
  userName: string = '';

  constructor() {
    makeAutoObservable(this, {
      getUserRole: computed,
    });
    this.initAuth();
  }

  async login(user: ISignInDTO): Promise<SuccessOrError> {
    try {
      const response = await AuthService.login(user);
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);
      this.setAuth(true);
      this.setUserNameFromResponse(response.data);
      this.setUser(response.data.account);
      this.setUserRoleFromResponse(response.data.account);
      return { successMsg: 'Logged in succesfully', errorMsg: '' };
    } catch (e) {
      return { successMsg: '', errorMsg: 'Error logging in' };
    }
  }

  async logout(): Promise<SuccessOrError> {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      this.setAuth(false);
      this.setUser({} as IAccount);
      return { successMsg: 'Logged out succesfully', errorMsg: '' };
    } catch (e) {
      return { successMsg: '', errorMsg: 'Error logging out' };
    }
  }

  async getUser(): Promise<ResponseOrError<IAccount>> {
    try {
      const response = await AuthService.getUser();
      this.setAuth(true);
      this.setUser(response.data);
      this.setUserRoleFromResponse(response.data);
      this.setUserNameFromResponse(response.data);
      return { data: response.data, error: '' };
    } catch (e) {
      return { data: {} as IAccount, error: 'Error getting user' };
    }
  }

  /*
    UTILS 
  */
  setAuth(bool: boolean): void {
    this.isAuth = bool;
  }

  setUser(user: IAccount): void {
    this.user = user;
  }

  initAuth(): void {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token && refreshToken) {
      this.getUser();
    }
  }

  setUserRoleFromResponse(responseData: IUser | IAccount): void {
    if ('account' in responseData) {
      this.userRole = responseData.account.role.name;
    } else {
      this.userRole = responseData.role.name;
    }
  }
  setUserNameFromResponse(responseData: any) {
    this.userName =
      responseData?.user?.first_name + ' ' + responseData?.user?.last_name ||
      '';
  }

  get getUserRole(): UserRole {
    return this.userRole as UserRole;
  }

  get getUserName(): string {
    return this.userName;
  }
}

const authStore = new AuthStore();
export default authStore;
