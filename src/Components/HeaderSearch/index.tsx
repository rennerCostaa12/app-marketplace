import {
  Container,
  ContentIcons,
  ContentInputSearch,
  InputSearch,
  ButtonIcon,
  ContentSearch,
} from "./styles";
import { AntDesign } from "@expo/vector-icons";

import { useState } from "react";
import { Toast, ALERT_TYPE } from "react-native-alert-notification";
import { useNavigation } from "@react-navigation/native";

import { IconsBadge } from "../IconsBadge";

import { useItemsFavorites } from "../../Contexts/ItemsFavorites";
import { useItemsSales } from "../../Contexts/ItemsSales";

import { ProductsProps } from "../../Types/products";

import { Api } from "../../Configs/Api";

interface HeaderSearchProps {
  setProducts: (data: ProductsProps[]) => void;
  setLoading: (data: boolean) => void;
}

export const HeaderSearch = ({
  setProducts,
  setLoading,
}: HeaderSearchProps) => {
  const { itemsFavorites } = useItemsFavorites();
  const { itemsSales } = useItemsSales();

  const [search, setSearch] = useState<string>("");

  const { navigate } = useNavigation() as any;

  const handleFilteredItems = async (valueSearch: string) => {
    setLoading(true);
    try {
      const responseFindItems = await Api.get(
        `products/search_name/${valueSearch}`
      );
      setProducts(responseFindItems.data);
    } catch (error) {
      if (error.response.data.statusCode === 404) {
        Toast.show({
          type: ALERT_TYPE.WARNING,
          title: "Nenhum produto encontrado!",
          onPress: () => {
            Toast.hide();
          },
        });
      }
    } finally {
      setSearch("");
    }
    setLoading(false);
  };

  return (
    <Container>
      <ContentInputSearch>
        <InputSearch
          placeholder="Pesquisa"
          value={search}
          style={{
            fontFamily: "Lato_400Regular",
          }}
          onChangeText={(text: string) => setSearch(text)}
          onSubmitEditing={() => handleFilteredItems(search)}
        />
        <ContentSearch>
          <AntDesign name="search1" size={20} color="#8a8a8a" />
        </ContentSearch>
      </ContentInputSearch>

      <ContentIcons>
        <ButtonIcon onPress={() => navigate("sales")}>
          <IconsBadge
            icon={<AntDesign name="shoppingcart" size={30} color="black" />}
            quantity={itemsSales.length}
          />
        </ButtonIcon>

        <ButtonIcon onPress={() => navigate("productsFavorites")}>
          <IconsBadge
            icon={<AntDesign name="hearto" size={30} color="black" />}
            quantity={itemsFavorites.length}
          />
        </ButtonIcon>
      </ContentIcons>
    </Container>
  );
};
