import { IAccount } from '@/models/IUser';
import AuthService from '@/services/authService';
import { makeAutoObservable } from 'mobx';

class AuthStore {
  user = {} as IAccount;
  isAuth = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IAccount) {
    this.user = user;
  }

  async login({ email, password }: { email: string; password: string }) {
    try {
      const response = await AuthService.login({ email, password });
      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refreshToken', response.data.refresh_token);
      this.setAuth(true);
      this.setUser(response.data.account);
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
      this.setUser(response.data.account);
      return response.data.account;
    } catch (e) {
      console.log(e);
    }
  }
}

const authStore = new AuthStore();
export default authStore;
