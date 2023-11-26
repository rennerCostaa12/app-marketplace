import { Container, ContentCategories, ContentItems, Content } from "./styles";

import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

import { HeaderSearch } from "../../Components/HeaderSearch";
import { CardCategory } from "../../Components/CardCategory";
import { CardItem } from "../../Components/CardItem";
import { ActivityIndicator } from "../../Components/ActivityIndicator";
import { ToastNotification } from "../../Components/ToastNotification";

import { Api } from "../../Configs/Api";

import { TypeNotification } from "../../Components/ToastNotification/types";
import { ProductsProps } from "../../Types/products";

const categories = [
  {
    icon: "drink",
    nameCategory: "Bebidas",
    value: "drinks",
  },
  {
    icon: "food",
    nameCategory: "Comidas",
    value: "foods",
  },
  {
    icon: "cleaning",
    nameCategory: "Limpeza",
    value: "cleaning",
  },
  {
    icon: "toys",
    nameCategory: "Brinquedos",
    value: "toys",
  },
];

let configPagination;

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
    if (
      configPagination !== undefined &&
      products.length >= configPagination.totalItems
    ) {
      return null;
    }
    setLoading(true);
    try {
      const response = await Api.get(`products?page=${page}&limit=6`);
      configPagination = response.data.meta;
      setProducts([...products, ...response.data.items]);
      setPage(page + 1);
    } catch (error) {
      console.log(error);
      setVisibleNotification(true);
      setTypeNotification("warning");
      setTitleNotification("Erro ao buscar dados");
    }
    setLoading(false);
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
        <ContentItems>
          <FlatList
            data={products}
            renderItem={({ item }) => {
              return (
                <View style={{ margin: 10 }}>
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
                color="#FF1493"
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
