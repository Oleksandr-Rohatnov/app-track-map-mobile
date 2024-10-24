import { makeAutoObservable } from 'mobx';
import authApi from '../api/authApi';

export class AuthStore {
  authKey?: string = undefined;

  constructor() {
    makeAutoObservable(this);
  }

  setAuthKey(key: string) {
    this.authKey = key;
  }

  async login(key: string) {
    try {
      await authApi.login(key);
      this.setAuthKey(key);
      return true;
    } catch {
      return false;
    }
  }

  logout() {
    this.authKey = undefined;
  }
}

export const authStore = new AuthStore();
