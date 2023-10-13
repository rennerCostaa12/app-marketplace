import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { Toast, ALERT_TYPE } from "react-native-alert-notification";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Api } from "../Configs/Api";

export interface DatasUserProps {
  id: string;
  username: string;
  email: string;
}

interface AuthContextProps {
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  dataUser: DatasUserProps;
  setDataUser: (data: DatasUserProps | null) => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [dataUser, setDataUser] = useState<DatasUserProps | null>(null);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const responseSignIn = await Api.post("auth/login-client", {
        email,
        password,
      });

      if (responseSignIn.status) {
        await AsyncStorage.setItem(
          "@marketplace:tokenUser",
          JSON.stringify(responseSignIn.data.access_token)
        );
        await AsyncStorage.setItem(
          "@marketplace:user",
          JSON.stringify(responseSignIn.data.user)
        );
        setDataUser(responseSignIn.data.user);
        return true;
      }
    } catch (error) {
      console.error(error);
      Toast.show({
        title: error.response.data.message,
        type: ALERT_TYPE.DANGER,
        autoClose: 2000,
      });
      return false;
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("@marketplace:tokenUser");
  };

  useEffect(() => {
    const getDatasUser = async () => {
      const responseUser = await AsyncStorage.getItem("@marketplace:user");

      if (JSON.parse(responseUser)) {
        setDataUser(JSON.parse(responseUser));
      }
    };

    getDatasUser();
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, signOut, dataUser, setDataUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const response = useContext(AuthContext);

  if (response === undefined) {
    throw new Error(
      "useAuthContext needs to be used inside AuthContextProvider"
    );
  }

  return response;
};
