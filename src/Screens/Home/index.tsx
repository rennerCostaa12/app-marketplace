import { Container, ContentCategories, ContentItems, TitleItems, Content } from "./styles";

import { useEffect, useState } from "react";
import { AlertNotificationRoot } from 'react-native-alert-notification';

import { HeaderSearch } from "../../Components/HeaderSearch";
import { CardCategory } from "../../Components/CardCategory";
import { CardItem } from "../../Components/CardItem";
import { ActivityIndicator } from "../../Components/ActivityIndicator";

import { Api } from "../../Configs/Api";

import { ProductsProps } from "../../Types/products";

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
                <ContentCategories
                    contentContainerStyle={{
                        justifyContent: 'center',
                        gap: 20,
                        alignItems: 'center'
                    }}
                    horizontal={true}
                >
                    <CardCategory
                        icon="drink"
                        nameCategory="Bebidas"
                        value="drinks"
                    />

                    <CardCategory
                        icon="food"
                        nameCategory="Comidas"
                        value="foods"
                    />

                    <CardCategory
                        icon="cleaning"
                        nameCategory="Limpeza"
                        value="cleaning"
                    />

                    <CardCategory
                        icon="toys"
                        nameCategory="Brinquedos"
                        value="toys"
                    />
                </ContentCategories>
                <Content>
                    <ContentItems
                        contentContainerStyle={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            gap: 20
                        }}
                    >
                        {loading ?
                            <ActivityIndicator
                                color="#FF1493"
                                size="large"
                                visible
                            />
                            :
                            products.map((value) => {
                                return (
                                    <CardItem
                                        key={value.id}
                                        id={value.id}
                                        typeItem={value.category.name}
                                        nameItem={value.title}
                                        priceItem={value.price}
                                        urlImg={value.url_img}
                                    />
                                )
                            })
                        }

                    </ContentItems>
                </Content>
            </Container>
        </AlertNotificationRoot>
    )
}