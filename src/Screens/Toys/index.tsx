import { Container, ContentToys } from "./styles"

import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';

import { ActivityIndicator } from "../../Components/ActivityIndicator";
import { CardItem } from "../../Components/CardItem";

import { Api } from "../../Configs/Api";

import { ProductsProps } from "../../Types/products";

import { CartEmpty } from "../../Components/CartEmpty";

export const Toys = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [toys, setToys] = useState<ProductsProps[]>([]);

    const filterByCategory = async () => {
        setLoading(true);
        try {
            const responseToys = await Api.get(`products/search_categories/brinquedos`)
            setToys(responseToys.data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    useEffect(() => {
        filterByCategory();
    }, []);

    return (
        <Container>
            {loading ?
                <ActivityIndicator
                    color="#FF1493"
                    size="large"
                    visible
                />
                :
                <ContentToys>
                    <FlatList
                        data={toys}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ margin: 10 }}>
                                    <CardItem id={item.id} nameItem={item.title} priceItem={item.price} typeItem={item.category.name} urlImg={item.url_img} />
                                </View>
                            )
                        }}
                        keyExtractor={item => String(item.id)}
                        horizontal={false}
                        numColumns={2}
                        ListEmptyComponent={<CartEmpty text="Nenhum produto encontrado" />}
                    />
                </ContentToys>
            }
        </Container>
    )
}