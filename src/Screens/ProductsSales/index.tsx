import {
    Container,
    Card,
    ContentCards,
    ContentDescriptions,
    ContentImage,
    ImageProduct,
    TitleProduct,
    PriceProduct,
    CategoryProduct,
    ContentPriceAndQuantity,
    Button,
    TextButton,
    ContentButtonCheckout,
    ButtonRemove,
    TextButtonRemove,
    PriceFinal
} from "./styles";

import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useEffect, useState, useCallback } from 'react';
import { FlatList } from 'react-native';

import { useItemsSales } from "../../Contexts/ItemsSales";

import { CartEmpty } from "../../Components/CartEmpty";
import { QuantityProduct } from "../../Components/QuantityProduct";

import { ItemsSalesProps } from "../../Contexts/ItemsSales";

interface CardProductSales {
    dataProduct: ItemsSalesProps;
}

const CardProductSales = ({ dataProduct }: CardProductSales) => {
    const [quantity, setQuantity] = useState<number>(dataProduct.quantity);
    const { itemsSales, setItemsSales } = useItemsSales();

    const handleSaveNewQuantities = async () => {
        try {
            dataProduct.quantity = quantity;
            const newObject = itemsSales.map((value) => {
                if (value.id === dataProduct.id) {
                    value = dataProduct;
                }
                return value;
            })
            setItemsSales(newObject);
            AsyncStorage.setItem('@marketplace:items_sales', JSON.stringify(newObject));
        } catch (error) {
            console.error(error);
        }
    }

    const getPriceProduct = useCallback(() => {
        return dataProduct.priceItem * quantity;
    }, [quantity]);

    const handleRemoveItem = () => {
        try {
            const newItems = itemsSales.filter((value) => value.id !== dataProduct.id);
            setItemsSales(newItems);
            AsyncStorage.setItem('@marketplace:items_sales', JSON.stringify(newItems));
        } catch (error) {
            console.error(error);
        }

    }

    useEffect(() => {
        handleSaveNewQuantities();
    }, [quantity]);

    return (
        <Card>
            <ContentImage>
                <ImageProduct
                    source={{ uri: dataProduct.urlImg }}
                />
            </ContentImage>
            <ContentDescriptions>
                <TitleProduct style={{ fontFamily: 'Lato_700Bold' }}>{dataProduct.nameItem}</TitleProduct>
                <CategoryProduct style={{ fontFamily: 'Lato_400Regular' }}>{dataProduct.typeItem.toLocaleUpperCase()}</CategoryProduct>
                <ContentPriceAndQuantity>
                    <QuantityProduct
                        quantity={quantity}
                        setQuantity={setQuantity}
                        colorButtons="#FF1493"
                    />
                    <PriceProduct style={{ fontFamily: 'Lato_400Regular' }}>
                        {getPriceProduct().toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                    </PriceProduct>
                </ContentPriceAndQuantity>
                <ButtonRemove>
                    <TextButtonRemove
                        style={{ fontFamily: 'Lato_400Regular' }}
                        onPress={handleRemoveItem}
                    >
                        Remover este item
                    </TextButtonRemove>
                </ButtonRemove>
            </ContentDescriptions>
        </Card>
    )
}


export const ProductSales = () => {
    const { itemsSales } = useItemsSales();
    const { navigate } = useNavigation() as any;

    const totalAmount = itemsSales.reduce((total, item) => {
        return total + (item.priceItem * item.quantity);
    }, 0);

    return (
        <Container>
            <ContentCards>
                <FlatList
                    data={itemsSales}
                    renderItem={({ item }) => <CardProductSales dataProduct={item} />}
                    keyExtractor={item => String(item.id)}
                    ListEmptyComponent={CartEmpty}
                />
            </ContentCards>
            {itemsSales.length > 0 ? (
                <PriceFinal
                    style={{ fontFamily: 'Lato_700Bold' }}
                >
                    {totalAmount.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </PriceFinal>
            ) : null}
            {itemsSales.length > 0 ? (
                <ContentButtonCheckout>
                    <Button
                        color="#FF1493"
                    >
                        <TextButton
                            style={{ fontFamily: 'Lato_700Bold' }}
                            color="#FFFFFF"
                        >
                            Finalizar Compra
                        </TextButton>
                    </Button>
                    <Button
                        color="transparent"
                        onPress={() => navigate('home')}
                    >
                        <TextButton
                            style={{ fontFamily: 'Lato_700Bold' }}
                            color="#FF1493"
                        >
                            Comprar mais produtos
                        </TextButton>
                    </Button>
                </ContentButtonCheckout>
            ) : null}
        </Container>
    )
}