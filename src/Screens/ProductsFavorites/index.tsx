import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native";
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
} from "./styles";

import { CartEmpty } from "../../Components/CartEmpty";

import { useItemsFavorites } from "../../Contexts/ItemsFavorites";

import { ItemProps } from "../../Types/products";

import { ConvertMoneyBrl } from "../../Utils/Helper/ConvertMoneyBrl";

import { Theme } from "../../Theme";

interface CardProductsFavoritesProps {
  dataProduct: ItemProps;
}

const CardProductsFavorites = ({ dataProduct }: CardProductsFavoritesProps) => {
  const { setItemsFavorites, itemsFavorites } = useItemsFavorites();

  const handleRemoveFavorite = async () => {
    try {
      const newItemsFavorites = itemsFavorites.filter(
        (data) => data.id !== dataProduct.id
      );
      setItemsFavorites(newItemsFavorites);
      AsyncStorage.setItem(
        "@marketplace:items_favorites",
        JSON.stringify(newItemsFavorites)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
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
  );
};

export const ProductsFavorites = () => {
  const { itemsFavorites } = useItemsFavorites();

  return (
    <Container>
      <ContentProducts>
        <FlatList
          data={itemsFavorites}
          renderItem={({ item }) => (
            <CardProductsFavorites dataProduct={item} />
          )}
          keyExtractor={(item) => String(item.id)}
          ListEmptyComponent={<CartEmpty text="Nenhum produto encontrado" />}
        />
      </ContentProducts>
    </Container>
  );
};
