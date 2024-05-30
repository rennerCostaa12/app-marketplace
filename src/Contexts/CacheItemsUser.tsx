import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { CachesUserProps } from "../Types/products";

interface CacheItemsUserContextProviderProps {
  children: ReactNode;
}

interface CacheItemsUserContextProps {
  cacheItemsUser: CachesUserProps[];
  setCacheItemsUser: (data: CachesUserProps[]) => void;
}

const CacheItemUserContext = createContext<
  CacheItemsUserContextProps | undefined
>(undefined);

export const CacheItemsUserContextProvider = ({
  children,
}: CacheItemsUserContextProviderProps) => {
  const [cacheItemsUser, setCacheItemsUser] = useState<CachesUserProps[]>([]);

  const getItemsFavorites = async () => {
    try {
      const responseItemsFavorites = await AsyncStorage.getItem(
        "@marketplace:cache_items_user"
      );
      if (responseItemsFavorites) {
        setCacheItemsUser(JSON.parse(responseItemsFavorites));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItemsFavorites();
  }, []);

  return (
    <CacheItemUserContext.Provider
      value={{ cacheItemsUser, setCacheItemsUser }}
    >
      {children}
    </CacheItemUserContext.Provider>
  );
};

export const useCacheItemsUser = () => {
  const response = useContext(CacheItemUserContext);

  if (response === undefined) {
    throw new Error(
      "useCacheItemsUser needs to be used inside ItemsFavoritesContextProvider"
    );
  }

  return response;
};
