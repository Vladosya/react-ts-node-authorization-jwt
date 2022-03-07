import { makeAutoObservable } from "mobx";
import axios from "axios";

import AuthService from "../services/AuthService";
import { IUsers } from "../types/services/UserService";

export default class Store {
  user = {} as IUsers;
  isAuth: boolean = false;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(payload: boolean): void {
    this.isAuth = payload;
  }

  setUser(payload: IUsers): void {
    this.user = payload;
  }

  setIsLoading(payload: boolean): void {
    this.isLoading = payload;
  }

  async registration(email: string, password: string): Promise<any> {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response.status;
    } catch (error) {
      console.log("error registration action -->", error);
    }
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      return response.status;
    } catch (error) {
      console.log("error login action -->", error);
    }
  }

  async logout(): Promise<any> {
    try {
      await AuthService.logout();
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({} as IUsers);
    } catch (error) {
      console.log("error logout action -->", error);
    }
  }

  async checkAuth(): Promise<void> {
    console.log("isAuth -->", this.isAuth);
    try {
      this.setIsLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/refresh`, {
        withCredentials: true,
      });
      console.log("response ---->", response);

      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      console.log("isAuth2 -->", this.isAuth);
    } catch (error) {
      console.log("error checkAuth action -->", error);
    } finally {
      this.setIsLoading(false);
    }
  }
}
