import { UserRole } from '@/types/enums/user';
import { IAccount } from '@/models/IUser';
import AuthService from '@/services/authService';
import { computed, makeAutoObservable } from 'mobx';

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

  async login({ email, password }: { email: string; password: string }) {
    try {
      const response = await AuthService.login({ email, password });
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);
      this.setAuth(true);
      this.setUser(response.data as any); // check types after merge
      this.setUserRoleFromResponse(response.data);
      this.setUserNameFromResponse(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  async logout() {
    try {
      await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IAccount);
    } catch (e) {
      console.log(e);
    }
  }

  async getUser() {
    try {
      const response = await AuthService.getUser();
      this.setAuth(true);
      this.setUser(response.data);
      this.setUserRoleFromResponse(response.data);
      this.setUserNameFromResponse(response.data);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }

  /*
    UTILS 
  */
  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IAccount) {
    this.user = user;
  }

  initAuth() {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token && refreshToken) {
      this.getUser();
    }
  }

  setUserRoleFromResponse(responseData: any) {
    this.userRole =
      responseData?.account?.role?.name || responseData?.role?.name || '';
  }
  setUserNameFromResponse(responseData: any) {
    this.userName =
      responseData?.user?.first_name + ' ' + responseData?.user?.last_name ||
      '';
  }

  get getUserRole() {
    return this.userRole as UserRole;
  }

  get getUserName(): string {
    return this.userName;
  }
}

const authStore = new AuthStore();
export default authStore;
