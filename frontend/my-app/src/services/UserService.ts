import { AxiosResponse } from "axios";

import { IUsers } from "../types/services/UserService";

import $api from "../http";

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<IUsers[]>> {
    return $api.get<IUsers[]>("/users");
  }
}
