import { ReactNode, createContext, useContext, useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ItemProps {
    id: string | number;
    urlImg: string;
    nameItem: string;
    priceItem: number;
    typeItem: string;
}

interface ItemsFavoritesContextProviderProps{
    children: ReactNode;
}

interface ItemsFavoritesContextProps{
    itemsFavorites: ItemProps[];
    setItemsFavorites: (data: ItemProps[]) => void;
}

const ItemsFavoritesContext = createContext<ItemsFavoritesContextProps | undefined>(undefined);

export const ItemsFavoritesContextProvider = ({ children }: ItemsFavoritesContextProviderProps) => {

    const [itemsFavorites, setItemsFavorites] = useState<ItemProps[]>([]);

    const getItemsFavorites = async () => {
        try{
            const responseItemsFavorites = await AsyncStorage.getItem('@marketplace:items_favorites');
            if(responseItemsFavorites){
                setItemsFavorites(JSON.parse(responseItemsFavorites));
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getItemsFavorites();
    }, []);

    return(
        <ItemsFavoritesContext.Provider value={{ itemsFavorites, setItemsFavorites }}>
            {children}
        </ItemsFavoritesContext.Provider>
    )
}

export const useItemsFavorites = () => {
    const response = useContext(ItemsFavoritesContext);

    if(response === undefined){
        throw new Error('useItemsFavorites needs to be used inside ItemsFavoritesContextProvider');
    }

    return response;
}