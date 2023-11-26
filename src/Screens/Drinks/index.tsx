import { Container, ContentDrinks } from "./styles";

import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { CardItem } from "../../Components/CardItem";
import { CartEmpty } from "../../Components/CartEmpty";
import { Loading } from "../../Components/Loading";
import { ToastNotification } from "../../Components/ToastNotification";

import { Api } from "../../Configs/Api";

import { ProductsProps } from "../../Types/products";
import { TypeNotification } from "../../Components/ToastNotification/types";

export const Drinks = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [drinks, setDrinks] = useState<ProductsProps[]>([]);
  const [visibleNotification, setVisibleNotification] =
    useState<boolean>(false);
  const [titleNotification, setTitleNotification] = useState<string>("");
  const [typeNotification, setTypeNotification] =
    useState<TypeNotification>("success");

  const filterByCategory = async () => {
    setLoading(true);
    try {
      const responseDrinks = await Api.get(`products/findByCategory/3`);
      setDrinks(responseDrinks.data.items);
    } catch (error) {
      console.log(error);
      setVisibleNotification(true);
      setTypeNotification("error");
      setTitleNotification("Erro ao buscar dados");
    }
    setLoading(false);
  };

  useEffect(() => {
    filterByCategory();
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
      <Loading visible={loading} />
      <ContentDrinks>
        <FlatList
          data={drinks}
          renderItem={({ item }) => {
            return (
              <View style={{ margin: RFValue(10) }}>
                <CardItem
                  id={item.id}
                  nameItem={item.name}
                  priceItem={item.price}
                  typeItem={item.categories.name}
                  urlImg={item.img_product}
                />
              </View>
            );
          }}
          keyExtractor={(item) => String(item.id)}
          horizontal={false}
          numColumns={2}
          ListEmptyComponent={
            !loading && <CartEmpty text="Nenhum produto encontrado" />
          }
        />
      </ContentDrinks>
    </Container>
  );
};
