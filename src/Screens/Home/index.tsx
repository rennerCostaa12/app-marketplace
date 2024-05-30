import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import {
  Container,
  ContentCategories,
  ContentItems,
  Content,
  TextWelcome,
  SubtitleProducts,
} from "./styles";

import { HeaderSearch } from "../../Components/HeaderSearch";
import { CardCategory } from "../../Components/CardCategory";
import { CardItem } from "../../Components/CardItem";
import { ActivityIndicator } from "../../Components/ActivityIndicator";
import { ToastNotification } from "../../Components/ToastNotification";

import { Api } from "../../Configs/Api";

import { TypeNotification } from "../../Components/ToastNotification/types";
import { ProductsProps } from "../../Types/products";

import { Theme } from "../../Theme";
import { RFValue } from "react-native-responsive-fontsize";

const categories = [
  {
    icon: require("./../../assets/images/icon-drink.png"),
    nameCategory: "Bebidas",
    value: "drinks",
  },
  {
    icon: require("./../../assets/images/icon-food.png"),
    nameCategory: "Comidas",
    value: "foods",
  },
  {
    icon: require("./../../assets/images/icon-clean.png"),
    nameCategory: "Limpeza",
    value: "cleaning",
  },
  {
    icon: require("./../../assets/images/icon-toys.png"),
    nameCategory: "Brinquedos",
    value: "toys",
  },
];

let lastPage: number | null = null;

export const Home = () => {
  const [visibleNotification, setVisibleNotification] =
    useState<boolean>(false);
  const [titleNotification, setTitleNotification] = useState<string>("");
  const [typeNotification, setTypeNotification] =
    useState<TypeNotification>("success");
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);

  const getAllProducts = async () => {
    if (lastPage !== null && page > lastPage) {
      return;
    }
    try {
      setLoading(true);
      const response = await Api.get(`products?page=${page}`);

      if (response.status) {
        lastPage = response.data.meta.totalPages;
        setProducts([...products, ...response.data.items]);
        setPage(page + 1);
      }
    } catch (error) {
      setVisibleNotification(true);
      setTypeNotification("warning");
      setTitleNotification("Erro ao buscar dados");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Container>
      <ToastNotification
        type={typeNotification}
        title={titleNotification}
        visible={visibleNotification}
        setVisible={setVisibleNotification}
        autoHide
        duration={2000}
      />
      <TextWelcome>O que você gostaria de pedir?</TextWelcome>
      <HeaderSearch />
      <ContentCategories>
        <FlatList
          data={categories}
          renderItem={({ item }) => (
            <CardCategory
              icon={item.icon}
              nameCategory={item.nameCategory}
              value={item.value}
            />
          )}
          keyExtractor={(item) => item.value}
          horizontal={true}
        />
      </ContentCategories>
      <Content>
        <SubtitleProducts>Nossos Produtos</SubtitleProducts>
        <ContentItems>
          <FlatList
            data={products}
            renderItem={({ item }) => {
              return (
                <View style={{ margin: RFValue(3) }}>
                  <CardItem
                    key={item.id}
                    id={item.id}
                    typeItem={item.categories.name}
                    nameItem={item.name}
                    priceItem={item.price}
                    urlImg={item.img_product}
                  />
                </View>
              );
            }}
            horizontal={false}
            numColumns={2}
            keyExtractor={(item) => String(item.id)}
            onEndReached={getAllProducts}
            onEndReachedThreshold={0.1}
            ListFooterComponent={
              <ActivityIndicator
                color={Theme.colors.primary}
                size="large"
                visible={loading}
              />
            }
          />
        </ContentItems>
      </Content>
    </Container>
  );
};
