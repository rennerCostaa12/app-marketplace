import Toast from "react-native-root-toast";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList, Platform, ToastAndroid } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import {
  Container,
  ContentCard,
  CategoryProduct,
  ImgProduct,
  PriceProduct,
  TitleProduct,
  ContentDescription,
  ContentImgProduct,
  ContentProducts,
  ContentIcon,
  ButtonRemoveFavorite,
  ContainerCard,
} from "./styles";

import { CartEmpty } from "../../Components/CartEmpty";

import { useAuthContext } from "../../Contexts/Auth";
import { useCacheItemsUser } from "../../Contexts/CacheItemsUser";

import { CachesUserProps, ItemProps } from "../../Types/products";

import { ConvertMoneyBrl } from "../../Utils/Helper/ConvertMoneyBrl";

import { Theme } from "../../Theme";
import { Button } from "../../Components/Button";

import { useState } from "react";

interface CardProductsFavoritesProps {
  dataProduct: ItemProps;
}

const CardProductsFavorites = ({ dataProduct }: CardProductsFavoritesProps) => {
  const { dataUser } = useAuthContext();
  const { cacheItemsUser, setCacheItemsUser } = useCacheItemsUser();

  const cacheUser = cacheItemsUser.find((data) => data.user.id === dataUser.id);

  const handleAddItemSales = async () => {
    const isExistsCacheUser = cacheItemsUser.find(
      (data) => data.user.id === dataUser.id
    );

    if (isExistsCacheUser) {
      const existingItem = isExistsCacheUser.itemsSales?.find(
        (item) => item.id === dataProduct.id
      );

      let updatedItemsSales;

      if (existingItem) {
        updatedItemsSales = isExistsCacheUser.itemsSales.map((item) => {
          if (item.id === dataProduct.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        const newItem = {
          id: dataProduct.id,
          nameItem: dataProduct.nameItem,
          priceItem: dataProduct.priceItem,
          typeItem: dataProduct.typeItem,
          urlImg: dataProduct.urlImg,
          quantity: 1,
        };

        updatedItemsSales = isExistsCacheUser.itemsSales
          ? [...isExistsCacheUser.itemsSales, newItem]
          : [newItem];
      }

      const updatedCacheUser = {
        ...isExistsCacheUser,
        itemsSales: updatedItemsSales,
      };

      const updatedCacheItemsUser = cacheItemsUser.map((data) =>
        data.user.id === dataUser.id ? updatedCacheUser : data
      );

      setCacheItemsUser(updatedCacheItemsUser);

      await AsyncStorage.setItem(
        "@marketplace:cache_items_user",
        JSON.stringify(updatedCacheItemsUser)
      );
    } else {
      const newCacheUser: CachesUserProps = {
        user: dataUser,
        itemsFavorites: [],
        itemsSales: [
          {
            id: dataProduct.id,
            nameItem: dataProduct.nameItem,
            priceItem: dataProduct.priceItem,
            typeItem: dataProduct.typeItem,
            urlImg: dataProduct.urlImg,
            quantity: 1,
          },
        ],
      };

      const updatedCacheItemsUser = [...cacheItemsUser, newCacheUser];

      setCacheItemsUser(updatedCacheItemsUser);

      await AsyncStorage.setItem(
        "@marketplace:cache_items_user",
        JSON.stringify(updatedCacheItemsUser)
      );
    }

    if (Platform.OS === "android") {
      ToastAndroid.show("Produto adicionado no carrinho.", ToastAndroid.SHORT);
    }

    if (Platform.OS === "ios") {
      Toast.show("Produto adicionado no carrinho.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  };

  const handleRemoveFavorite = async () => {
    const updateItemsFavorites = cacheUser.itemsFavorites.filter(
      (data) => data.id !== dataProduct.id
    );

    const cacheUserUpdated = {
      ...cacheUser,
      itemsFavorites: updateItemsFavorites,
    };

    const updatedCacheItemsUser = cacheItemsUser.map((data) =>
      data.user.id === dataUser.id ? cacheUserUpdated : data
    );

    setCacheItemsUser(updatedCacheItemsUser);
    await AsyncStorage.setItem(
      "@marketplace:cache_items_user",
      JSON.stringify(updatedCacheItemsUser)
    );
  };

  return (
    <ContainerCard>
      <ContentCard key={dataProduct.id}>
        <ContentImgProduct>
          <ImgProduct source={{ uri: dataProduct.urlImg }} />
        </ContentImgProduct>

        <ContentDescription>
          <TitleProduct style={{ fontFamily: "Lato_700Bold" }}>
            {dataProduct.nameItem}
          </TitleProduct>
          <PriceProduct>{ConvertMoneyBrl(dataProduct.priceItem)}</PriceProduct>
          <CategoryProduct>
            {dataProduct.typeItem.toLocaleUpperCase()}
          </CategoryProduct>
        </ContentDescription>
        <ContentIcon>
          <ButtonRemoveFavorite onPress={handleRemoveFavorite}>
            <AntDesign
              name="heart"
              size={RFValue(23)}
              color={Theme.colors.primary}
            />
          </ButtonRemoveFavorite>
        </ContentIcon>
      </ContentCard>

      <Button
        textButton="Comprar"
        color={Theme.colors.primary}
        textColor={Theme.colors.text_white}
        fontSize={Theme.fontSize.tiny}
        onPress={handleAddItemSales}
      />
    </ContainerCard>
  );
};

export const ProductsFavorites = () => {
  const { dataUser } = useAuthContext();
  const { cacheItemsUser } = useCacheItemsUser();

  const cacheUser = cacheItemsUser.find((data) => data.user.id === dataUser.id);

  return (
    <>
      <Container>
        <ContentProducts>
          <FlatList
            data={cacheUser ? cacheUser.itemsFavorites : []}
            renderItem={({ item }) => (
              <CardProductsFavorites dataProduct={item} />
            )}
            keyExtractor={(item) => String(item.id)}
            ListEmptyComponent={<CartEmpty text="Nenhum produto encontrado" />}
          />
        </ContentProducts>
      </Container>
    </>
  );
};
