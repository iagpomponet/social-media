import { UserData } from "./api";

export interface LoginState {
    isLogged: boolean;
    data: null | UserData;
}
