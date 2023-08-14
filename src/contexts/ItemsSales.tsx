import { ReactNode, createContext, useContext, useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ItemProps {
    id: string | number;
    urlImg: string;
    nameItem: string;
    priceItem: number;
    typeItem: string;
}

interface ItemsSalesContextProviderProps{
    children: ReactNode;
}

interface ItemsSalesContextProps{
    itemsSales: ItemProps[];
    setItemsSales: (data: ItemProps[]) => void;
}

const ItemsSalesContext = createContext<ItemsSalesContextProps | undefined>(undefined);

export const ItemsSalesContextProvider = ({ children }: ItemsSalesContextProviderProps) => {

    const [itemsSales, setItemsSales] = useState<ItemProps[]>([]);

    const getItemsSales = async () => {
        try{
            const responseItemsSales = await AsyncStorage.getItem('@marketplace:items_sales');
            if(responseItemsSales){
                setItemsSales(JSON.parse(responseItemsSales));
            }
        }catch(error){
            console.log(error);
        }
    }

    useEffect(() => {
        getItemsSales();
    }, []);

    return(
        <ItemsSalesContext.Provider value={{ itemsSales, setItemsSales }}>
            {children}
        </ItemsSalesContext.Provider>
    )
}

export const useItemsSales = () => {
    const response = useContext(ItemsSalesContext);

    if(response === undefined){
        throw new Error('useItemsSales needs to be used inside ItemsSalesContextProviderr');
    }

    return response;
}