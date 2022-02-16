import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { LoginState } from "../types/auth";

interface AuthContextI {
  userData: LoginState | null;
  setUserData: React.Dispatch<React.SetStateAction<LoginState>>;
}

const authContext = createContext<AuthContextI>({} as AuthContextI);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const loggedToken = Cookies.get("socialMediaIsLogged");

  const userDataFromStorage = localStorage.getItem("userData");

  const [userData, setUserData] = useState<LoginState>({
    isLogged: loggedToken === "true" && userDataFromStorage ? true : false,
    data: userDataFromStorage ? JSON.parse(userDataFromStorage) : null,
  });

  //if user data is something then save it on local storage
  useEffect(() => {
    if (userData !== null && localStorage.getItem("userData") !== JSON.stringify(userData)) {
      localStorage.setItem("userData", JSON.stringify(userData?.data));
    }
  }, [userData]);

  return <authContext.Provider value={{ userData, setUserData }}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};
