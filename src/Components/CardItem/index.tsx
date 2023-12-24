import {
  Container,
  ContentDescriptionsItem,
  ContentImg,
  NameItem,
  PriceItem,
  ImageItem,
  ContentIconFavorite,
  CategoryItem,
  ContentPricesAndSale,
  ButtonAddProduct,
} from "./styles";

import { AntDesign, FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFValue } from "react-native-responsive-fontsize";

import { ItemProps } from "../../Types/products";
import { useItemsFavorites } from "../../Contexts/ItemsFavorites";
import { useItemsSales } from "../../Contexts/ItemsSales";
import { ConvertMoneyBrl } from "../../Utils/Helper/ConvertMoneyBrl";

export const CardItem = ({
  urlImg,
  nameItem,
  priceItem,
  typeItem,
  id,
}: ItemProps) => {
  const { setItemsFavorites, itemsFavorites } = useItemsFavorites();
  const { setItemsSales, itemsSales } = useItemsSales();

  const handleAddItemSales = async () => {
    try {
      const findItem = itemsSales.filter((data) => data.id === id);
      if (findItem.length >= 1) {
        const newObject = itemsSales.map((value) => {
          if (value.id === id) {
            value.quantity++;
          }
          return value;
        });
        setItemsSales(newObject);
        await AsyncStorage.setItem(
          "@marketplace:items_sales",
          JSON.stringify(newObject)
        );
      } else {
        const objectSales = {
          id,
          nameItem,
          priceItem,
          typeItem,
          urlImg,
          quantity: 1,
        };

        setItemsSales([...itemsSales, objectSales]);
        await AsyncStorage.setItem(
          "@marketplace:items_sales",
          JSON.stringify([...itemsSales, objectSales])
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddFavorited = async () => {
    try {
      const objectFavorited = {
        id,
        nameItem,
        priceItem,
        typeItem,
        urlImg,
      };
      setItemsFavorites([...itemsFavorites, objectFavorited]);
      await AsyncStorage.setItem(
        "@marketplace:items_favorites",
        JSON.stringify([...itemsFavorites, objectFavorited])
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFavorited = async (id: string | number) => {
    try {
      const newItem = itemsFavorites.filter((data) => data.id !== id);
      setItemsFavorites(newItem);
      await AsyncStorage.setItem(
        "@marketplace:items_favorites",
        JSON.stringify(newItem)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const isFavorited = itemsFavorites.some((data) => data.id === id);

  return (
    <Container>
      <ContentImg>
        <ImageItem source={{ uri: urlImg }} />
      </ContentImg>
      <ContentDescriptionsItem>
        <CategoryItem style={{ fontFamily: "Lato_400Regular" }}>
          {typeItem.toLocaleUpperCase()}
        </CategoryItem>
        <NameItem style={{ fontFamily: "Lato_700Bold" }}>{nameItem}</NameItem>
        <ContentPricesAndSale>
          <ButtonAddProduct onPress={handleAddItemSales}>
            <FontAwesome name="cart-plus" size={RFValue(25)} color="#008000" />
          </ButtonAddProduct>
          <PriceItem style={{ fontFamily: "Lato_700Bold" }}>
            {ConvertMoneyBrl(priceItem)}
          </PriceItem>
        </ContentPricesAndSale>
      </ContentDescriptionsItem>
      <ContentIconFavorite
        onPress={() =>
          isFavorited ? handleRemoveFavorited(id) : handleAddFavorited()
        }
      >
        <AntDesign
          name={isFavorited ? "heart" : "hearto"}
          size={RFValue(23)}
          color="#FF1493"
        />
      </ContentIconFavorite>
    </Container>
  );
};
