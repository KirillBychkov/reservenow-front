import { UserRole } from '@/types/enums/user';
import { Account, User } from '@/models/User';
import AuthService from '@/services/authService';
import { computed, makeAutoObservable } from 'mobx';
import { SignInDTO } from '@/models/requests/AuthRequests';
import { ResponseOrError, SuccessOrError } from '@/types/store';
import { AxiosError } from 'axios';

class AuthStore {
  user = {} as Account;
  isAuth: boolean = false;
  userRole: string = '';
  userName: string = '';

  constructor() {
    makeAutoObservable(this, {
      getUserRole: computed,
    });
    this.initAuth();
  }

  async login(user: SignInDTO): Promise<SuccessOrError> {
    try {
      const response = await AuthService.login(user);
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);
      this.setAuth(true);
      this.setUserNameFromResponse(response.data.account);
      this.setUser(response.data.account);
      this.setUserRoleFromResponse(response.data.account);
      return { successMsg: 'Logged in succesfully', errorMsg: '' };
    } catch (e) {
      if ((e as AxiosError)?.response?.status === 401) {
        return {
          successMsg: '',
          errorMsg: 'invalidCredentials',
        };
      }

      return { successMsg: '', errorMsg: 'Error logging in' };
    }
  }

  async logout(): Promise<SuccessOrError> {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      this.setAuth(false);
      this.setUser({} as Account);
      return { successMsg: 'Logged out succesfully', errorMsg: '' };
    } catch (e) {
      return { successMsg: '', errorMsg: 'Error logging out' };
    }
  }

  async getUser(): Promise<ResponseOrError<Account>> {
    try {
      const response = await AuthService.getUser();
      this.setAuth(true);
      this.setUser(response.data);
      this.setUserRoleFromResponse(response.data);
      this.setUserNameFromResponse(response.data);
      return { data: response.data, error: '' };
    } catch (e) {
      return { data: {} as Account, error: 'Error getting user' };
    }
  }

  /*
    UTILS 
  */
  setAuth(bool: boolean): void {
    this.isAuth = bool;
  }

  setUser(user: Account): void {
    this.user = user;
  }

  initAuth(): void {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token && refreshToken) {
      this.getUser();
    }
  }

  setUserRoleFromResponse(responseData: User | Account): void {
    if ('account' in responseData) {
      this.userRole = responseData.account.role.name;
    } else {
      this.userRole = responseData.role.name;
    }
  }

  setUserNameFromResponse(responseData: Account) {
    const firstName = responseData.user?.first_name;
    const lastName = responseData.user?.last_name;
    this.userName = `${firstName || ''} ${lastName || ''}`.trim();
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
