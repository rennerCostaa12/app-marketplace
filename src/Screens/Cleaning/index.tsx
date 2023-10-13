import { Container, ContentClean } from "./styles";

import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { CardItem } from "../../Components/CardItem";
import { CartEmpty } from "../../Components/CartEmpty";
import { Loading } from "../../Components/Loading";

import { Api } from "../../Configs/Api";

import { ProductsProps } from "../../Types/products";

export const Cleaning = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cleaning, setCleaning] = useState<ProductsProps[]>([]);

  const filterByCategory = async () => {
    setLoading(true);
    try {
      const responseCleaning = await Api.get(
        `products/search_categories/limpeza`
      );
      setCleaning(responseCleaning.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    filterByCategory();
  }, []);

  return (
    <Container>
      <Loading visible={loading} />
      <ContentClean>
        <FlatList
          data={cleaning}
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
      </ContentClean>
    </Container>
  );
};
