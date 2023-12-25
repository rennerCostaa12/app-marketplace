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
  Button,
  TextButton,
  ContentButtonCheckout,
  PriceFinal,
} from "./styles";

import { useItemsSales } from "../../Contexts/ItemsSales";
import { ItemsSalesProps } from "../../Contexts/ItemsSales";

import { CartEmpty } from "../../Components/CartEmpty";
import { QuantityProduct } from "../../Components/QuantityProduct";
import { ModalMethodsPayments } from "../../Components/ModalMethodsPayments";

import { ConvertMoneyBrl } from "../../Utils/Helper/ConvertMoneyBrl";

import { Theme } from "../../Theme";

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
      });
      setItemsSales(newObject);
      AsyncStorage.setItem(
        "@marketplace:items_sales",
        JSON.stringify(newObject)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getPriceProduct = useCallback(() => {
    return dataProduct.priceItem * quantity;
  }, [quantity]);

  const handleRemoveItem = () => {
    try {
      const newItems = itemsSales.filter(
        (value) => value.id !== dataProduct.id
      );
      setItemsSales(newItems);
      AsyncStorage.setItem(
        "@marketplace:items_sales",
        JSON.stringify(newItems)
      );
    } catch (error) {
      console.error(error);
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
  const { itemsSales } = useItemsSales();
  const { navigate } = useNavigation() as any;
  const [showMethodsPayments, setShowMethodsPayments] =
    useState<boolean>(false);

  const totalAmount = itemsSales.reduce((total, item) => {
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
          data={itemsSales}
          renderItem={({ item }) => <CardProductSales dataProduct={item} />}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={CartEmpty}
        />
      </ContentCards>
      {itemsSales.length > 0 ? (
        <PriceFinal style={{ fontFamily: "Lato_700Bold" }}>
          {ConvertMoneyBrl(totalAmount)}
        </PriceFinal>
      ) : null}
      {itemsSales.length > 0 ? (
        <ContentButtonCheckout>
          <Button
            color={Theme.colors.primary}
            onPress={() => setShowMethodsPayments(true)}
          >
            <TextButton
              style={{ fontFamily: "Lato_700Bold" }}
              color={Theme.colors.text_white}
            >
              Finalizar Compra
            </TextButton>
          </Button>
          <Button
            color={Theme.colors.background_color}
            onPress={() => navigate("home")}
          >
            <TextButton
              style={{ fontFamily: "Lato_700Bold" }}
              color={Theme.colors.primary}
            >
              Comprar mais produtos
            </TextButton>
          </Button>
        </ContentButtonCheckout>
      ) : null}
    </Container>
  );
};
