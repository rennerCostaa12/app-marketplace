import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { Api } from "../Configs/Api";

export interface DatasUserProps {
  id: string;
  username: string;
  phone: string;
  address: string;
  number_address: number;
  complement_address: string;
}

interface SignInReturnProps {
  status: boolean;
  message: any;
}

interface AuthContextProps {
  signIn: (phone: string, password: string) => Promise<SignInReturnProps>;
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

  const signIn = async (
    phone: string,
    password: string
  ): Promise<SignInReturnProps> => {
    try {
      const responseSignIn = await Api.post("auth/login-client", {
        phone,
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
        return {
          status: true,
          message: "TUDO OK",
        };
      }
    } catch (error) {
      console.error(error.response.data.message);
      return {
        status: false,
        message: error.response.data.message,
      };
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("@marketplace:tokenUser");
    await AsyncStorage.removeItem("@marketplace:user");
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
