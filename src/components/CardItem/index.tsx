import { Container, ContentDescriptionsItem, ContentImg, NameItem, PriceItem, ImageItem, ContentIconFavorite, CategoryItem } from "./styles";

import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ItemProps } from "../../contexts/ItemsFavorites";
import { useItemsFavorites } from "../../contexts/ItemsFavorites";

export const CardItem = ({ urlImg, nameItem, priceItem, typeItem, id }: ItemProps) => {

    const { setItemsFavorites, itemsFavorites } = useItemsFavorites();

    const handleAddFavorited = async () => {
        try {
            const objectFavorited = {
                id,
                nameItem,
                priceItem,
                typeItem,
                urlImg
            }
            setItemsFavorites([...itemsFavorites, objectFavorited]);
            await AsyncStorage.setItem('@marketplace:items_favorites', JSON.stringify([...itemsFavorites, objectFavorited]));
        } catch (error) {
            console.log(error);
        }
    }

    const handleRemoveFavorited = async (id: string | number) => {
        try{
            const newItem = itemsFavorites.filter((data) => data.id !== id);
            setItemsFavorites(newItem)
            await AsyncStorage.setItem('@marketplace:items_favorites', JSON.stringify(newItem));
        }catch(error){
            console.log(error);
        }
    }


    const isFavorited = itemsFavorites.some((data) => data.id === id);

    return (
        <Container>
            <ContentImg>
                <ImageItem
                    source={{ uri: urlImg }}
                />
            </ContentImg>
            <ContentDescriptionsItem>
                <CategoryItem>
                    {typeItem.toLocaleUpperCase()}
                </CategoryItem>
                <NameItem>
                    {nameItem}
                </NameItem>
                <PriceItem>
                    {priceItem.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </PriceItem>
            </ContentDescriptionsItem>
            <ContentIconFavorite onPress={() => isFavorited ? handleRemoveFavorited(id) : handleAddFavorited()}>
                <AntDesign name={isFavorited ? 'heart' : 'hearto'} size={23} color='#FF1493' />
            </ContentIconFavorite>
        </Container>
    )
}