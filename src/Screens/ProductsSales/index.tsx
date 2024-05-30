import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState, useCallback } from "react";
import { Alert, FlatList } from "react-native";

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
  ContentButtonCheckout,
  PriceFinal,
} from "./styles";

import { useAuthContext } from "../../Contexts/Auth";
import { useCacheItemsUser } from "../../Contexts/CacheItemsUser";

import { CartEmpty } from "../../Components/CartEmpty";
import { QuantityProduct } from "../../Components/QuantityProduct";
import { ModalMethodsPayments } from "../../Components/ModalMethodsPayments";
import { Button } from "../../Components/Button";

import { ConvertMoneyBrl } from "../../Utils/Helper/ConvertMoneyBrl";

import { Theme } from "../../Theme";

import { ItemsSalesProps } from "../../Types/products";

interface CardProductSales {
  dataProduct: ItemsSalesProps;
}

const CardProductSales = ({ dataProduct }: CardProductSales) => {
  const [quantity, setQuantity] = useState<number>(dataProduct.quantity);
  const { dataUser } = useAuthContext();
  const { cacheItemsUser, setCacheItemsUser } = useCacheItemsUser();

  const cacheUser = cacheItemsUser.find((data) => data.user.id === dataUser.id);

  const handleSaveNewQuantities = async () => {
    if (cacheUser) {
      dataProduct.quantity = quantity;

      const newSales = cacheUser.itemsSales.map((value) =>
        value.id === dataProduct.id ? dataProduct : value
      );
      const updatedCacheUser = {
        ...cacheUser,
        itemsSales: newSales,
      };

      const updatedCacheItemsUser = cacheItemsUser.map((data) =>
        data.user.id === dataUser.id ? updatedCacheUser : data
      );

      setCacheItemsUser(updatedCacheItemsUser);

      await AsyncStorage.setItem(
        "@marketplace:cache_items_user",
        JSON.stringify(updatedCacheItemsUser)
      );
    }
  };

  const getPriceProduct = useCallback(() => {
    return dataProduct.priceItem * quantity;
  }, [quantity]);

  const handleRemoveItem = async () => {
    if (cacheUser) {
      const salesUpdated = cacheUser.itemsSales.filter(
        (data) => data.id !== dataProduct.id
      );

      const cacheUserUpdated = { ...cacheUser, itemsSales: salesUpdated };

      const updatedCacheItemsUser = cacheItemsUser.map((data) =>
        data.user.id === dataUser.id ? cacheUserUpdated : data
      );

      setCacheItemsUser(updatedCacheItemsUser);

      await AsyncStorage.setItem(
        "@marketplace:cache_items_user",
        JSON.stringify(updatedCacheItemsUser)
      );
    }
  };

  useEffect(() => {
    handleSaveNewQuantities();

    if (quantity === 0) {
      Alert.alert(
        "Deseja realmente excluir este do produto do seu carrinho?",
        "",
        [
          {
            text: "Não",
            onPress: () =>
              setQuantity((currentQuantity) => currentQuantity + 1),
          },
          {
            text: "Sim",
            onPress: () => handleRemoveItem(),
          },
        ]
      );
    }
  }, [quantity]);

  return (
    <Card>
      <ContentImage>
        <ImageProduct source={{ uri: dataProduct.urlImg }} />
      </ContentImage>
      <ContentDescriptions>
        <TitleProduct style={{ fontFamily: "Lato_700Bold" }}>
          {dataProduct.nameItem}
        </TitleProduct>
        <CategoryProduct>
          {dataProduct.typeItem.toLocaleUpperCase()}
        </CategoryProduct>
        <ContentPriceAndQuantity>
          <QuantityProduct
            quantity={quantity}
            setQuantity={setQuantity}
            colorButtons={Theme.colors.primary}
          />
          <PriceProduct>{ConvertMoneyBrl(getPriceProduct())}</PriceProduct>
        </ContentPriceAndQuantity>
      </ContentDescriptions>
    </Card>
  );
};

export const ProductSales = () => {
  const { navigate } = useNavigation() as any;
  const [showMethodsPayments, setShowMethodsPayments] =
    useState<boolean>(false);

  const { dataUser } = useAuthContext();
  const { cacheItemsUser } = useCacheItemsUser();

  const cacheUser = cacheItemsUser.find((data) => data.user.id === dataUser.id);

  const totalAmount = cacheUser && cacheUser.itemsSales.reduce((total, item) => {
    return total + item.priceItem * item.quantity;
  }, 0);

  return (
    <Container>
      <ModalMethodsPayments
        totalPrices={totalAmount}
        showModal={showMethodsPayments}
        setShowModal={setShowMethodsPayments}
      />
      <ContentCards>
        <FlatList
          data={cacheUser ? cacheUser.itemsSales : []}
          renderItem={({ item }) => <CardProductSales dataProduct={item} />}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={<CartEmpty text="Nenhum produto encontrado" />}
        />
      </ContentCards>
      {cacheUser && cacheUser.itemsSales.length > 0 ? (
        <PriceFinal style={{ fontFamily: "Lato_700Bold" }}>
          {ConvertMoneyBrl(totalAmount)}
        </PriceFinal>
      ) : null}
      {cacheUser && cacheUser.itemsSales.length > 0 ? (
        <ContentButtonCheckout>
          <Button
            color={Theme.colors.primary}
            textColor={Theme.colors.text_white}
            textButton="Finalizar Compra"
            onPress={() => setShowMethodsPayments(true)}
          />

          <Button
            color={Theme.colors.white_ligth}
            textColor={Theme.colors.primary}
            textButton="Comprar mais produtos"
            onPress={() => navigate("home")}
          />
        </ContentButtonCheckout>
      ) : null}
    </Container>
  );
};
