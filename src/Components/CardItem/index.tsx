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
} from "./styles";

import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFValue } from "react-native-responsive-fontsize";

import { ItemProps } from "../../Types/products";
import { useAuthContext } from "../../Contexts/Auth";
import { useCacheItemsUser } from "../../Contexts/CacheItemsUser";
import { ConvertMoneyBrl } from "../../Utils/Helper/ConvertMoneyBrl";
import { CachesUserProps } from "../../Types/products";

import { Button } from "../Button";

import { Theme } from "../../Theme";

export const CardItem = ({
  urlImg,
  nameItem,
  priceItem,
  typeItem,
  id,
}: ItemProps) => {
  const { dataUser } = useAuthContext();
  const { cacheItemsUser, setCacheItemsUser } = useCacheItemsUser();

  const cacheUser = cacheItemsUser.find((data) => data.user.id === dataUser.id);

  const handleAddItemSales = async () => {
    const isExistsCacheUser = cacheItemsUser.find(
      (data) => data.user.id === dataUser.id
    );

    if (isExistsCacheUser) {
      const existingItem = isExistsCacheUser.itemsSales?.find(
        (item) => item.id === id
      );

      let updatedItemsSales;

      if (existingItem) {
        updatedItemsSales = isExistsCacheUser.itemsSales.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
      } else {
        const newItem = {
          id,
          nameItem,
          priceItem,
          typeItem,
          urlImg,
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
            id,
            nameItem,
            priceItem,
            typeItem,
            urlImg,
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
  };

  const handleAddFavorited = async () => {
    const objectFavorited = {
      id,
      nameItem,
      priceItem,
      typeItem,
      urlImg,
    };

    if (cacheUser) {
      let updatedItemsFavorites;

      const itemExists = cacheUser.itemsFavorites?.some(
        (item) => item.id === id
      );

      if (itemExists) {
        updatedItemsFavorites = cacheUser.itemsFavorites.filter(
          (item) => item.id !== id
        );
      } else {
        updatedItemsFavorites = cacheUser.itemsFavorites
          ? [...cacheUser.itemsFavorites, objectFavorited]
          : [objectFavorited];
      }

      const updatedCacheUser = {
        ...cacheUser,
        itemsFavorites: updatedItemsFavorites,
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
        itemsFavorites: [objectFavorited],
        itemsSales: [],
      };

      const updatedCacheItemsUser = [...cacheItemsUser, newCacheUser];

      setCacheItemsUser(updatedCacheItemsUser);

      await AsyncStorage.setItem(
        "@marketplace:cache_items_user",
        JSON.stringify(updatedCacheItemsUser)
      );
    }
  };

  const handleRemoveFavorited = async (id: string | number) => {
    const updateItemsFavorites = cacheUser.itemsFavorites.filter(
      (data) => data.id !== id
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

  const isFavorited = cacheUser ? cacheUser.itemsFavorites.some((data) => data.id === id) : false;

  return (
    <Container>
      <ContentImg>
        <ImageItem source={{ uri: urlImg }} />
      </ContentImg>
      <ContentDescriptionsItem>
        <CategoryItem>{typeItem.toLocaleUpperCase()}</CategoryItem>
        <NameItem>{nameItem}</NameItem>
        <ContentPricesAndSale>
          <Button
            textButton="Comprar"
            textColor={Theme.colors.text_white}
            color={Theme.colors.primary}
            onPress={handleAddItemSales}
            fontSize={Theme.fontSize.tiny - 5}
          />

          <PriceItem>{ConvertMoneyBrl(priceItem)}</PriceItem>
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
          color={Theme.colors.primary}
        />
      </ContentIconFavorite>
    </Container>
  );
};
