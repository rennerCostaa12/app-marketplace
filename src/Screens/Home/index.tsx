import { Container, ContentCategories, ContentItems, Content } from "./styles";

import { useEffect, useState } from "react";
import { FlatList, View } from 'react-native';
import { AlertNotificationRoot } from 'react-native-alert-notification';

import { HeaderSearch } from "../../Components/HeaderSearch";
import { CardCategory } from "../../Components/CardCategory";
import { CardItem } from "../../Components/CardItem";
import { ActivityIndicator } from "../../Components/ActivityIndicator";

import { Api } from "../../Configs/Api";

import { ProductsProps } from "../../Types/products";

const categories = [
    {
        icon: 'drink',
        nameCategory: 'Bebidas',
        value: 'drinks'
    },
    {
        icon: 'food',
        nameCategory: 'Comidas',
        value: 'foods'
    },
    {
        icon: 'cleaning',
        nameCategory: 'Limpeza',
        value: 'cleaning'
    },
    {
        icon: 'toys',
        nameCategory: 'Brinquedos',
        value: 'toys'
    },
];

export const Home = () => {
    const [products, setProducts] = useState<ProductsProps[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getAllProducts = async () => {
            setLoading(true);
            try {
                const response = await Api.get('products/find_all?page=1&limit=10');
                setProducts(response.data.items);
            } catch (error) {
                console.log(error);
            }
            setLoading(false);
        }
        getAllProducts();
    }, []);

    return (
        <AlertNotificationRoot>
            <Container>
                <HeaderSearch
                    setProducts={setProducts}
                    setLoading={setLoading}
                />
                <ContentCategories>
                    <FlatList
                        data={categories}
                        renderItem={({ item }) => <CardCategory icon={item.icon} nameCategory={item.nameCategory} value={item.value} />}
                        keyExtractor={item => item.value}
                        horizontal={true}
                    />
                </ContentCategories>
                <Content>
                    <ContentItems>
                        {loading ?
                            <ActivityIndicator
                                color="#FF1493"
                                size="large"
                                visible
                            />
                            :
                            <FlatList
                                data={products}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{ margin: 10 }}>
                                            <CardItem
                                                key={item.id}
                                                id={item.id}
                                                typeItem={item.category.name}
                                                nameItem={item.title}
                                                priceItem={item.price}
                                                urlImg={item.url_img}
                                            />
                                        </View>
                                    )
                                }}
                                horizontal={false}
                                numColumns={2}
                                keyExtractor={item => String(item.id)}
                            />
                        }
                    </ContentItems>
                </Content>
            </Container>
        </AlertNotificationRoot>
    )
}