import {
    Container,
    ContentCard,
    CategoryProduct,
    ImgProduct,
    PriceProduct,
    TitleProduct,
    ContentDescription,
    ContentImgProduct,
    ContentProducts,
    ContentIcon,
    ButtonRemoveFavorite
} from "./styles";

import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from 'react-native';

import { useItemsFavorites } from "../../contexts/ItemsFavorites";

import { ItemProps } from "../../contexts/ItemsFavorites";

interface CardProductsFavoritesProps {
    dataProduct: ItemProps;
}

const CardProductsFavorites = ({ dataProduct }: CardProductsFavoritesProps) => {
    const { setItemsFavorites, itemsFavorites } = useItemsFavorites();

    const handleRemoveFavorite = async () => {
        try {
            const newItemsFavorites = itemsFavorites.filter((data) => data.id !== dataProduct.id);
            setItemsFavorites(newItemsFavorites);
            AsyncStorage.setItem('@marketplace:items_favorites', JSON.stringify(newItemsFavorites));
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <ContentCard key={dataProduct.id}>
            <ContentImgProduct>
                <ImgProduct
                    source={{ uri: dataProduct.urlImg }}
                />
            </ContentImgProduct>

            <ContentDescription>
                <TitleProduct style={{ fontFamily: 'Lato_700Bold'}}>{dataProduct.nameItem}</TitleProduct>
                <PriceProduct style={{ fontFamily: 'Lato_400Regular'}}>{dataProduct.priceItem.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</PriceProduct>
                <CategoryProduct style={{ fontFamily: 'Lato_400Regular'}}>{dataProduct.typeItem.toLocaleUpperCase()}</CategoryProduct>
            </ContentDescription>
            <ContentIcon>
                <ButtonRemoveFavorite onPress={handleRemoveFavorite}>
                    <AntDesign name='heart' size={23} color='#FF1493' />
                </ButtonRemoveFavorite>
            </ContentIcon>
        </ContentCard>
    )
}

export const ProductsFavorites = () => {

    const { itemsFavorites } = useItemsFavorites();

    return (
        <Container>
            <ContentProducts>
                <FlatList
                    data={itemsFavorites}
                    renderItem={({ item }) => <CardProductsFavorites dataProduct={item} />}
                    keyExtractor={item => String(item.id)}
                />
            </ContentProducts>
        </Container>
    )
}