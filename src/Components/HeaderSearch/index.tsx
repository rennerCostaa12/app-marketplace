import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";

import {
  Container,
  ContentIcons,
  ContentInputSearch,
  InputSearch,
  ButtonIcon,
  ContentSearch,
} from "./styles";

import { IconsBadge } from "../IconsBadge";

import { useItemsFavorites } from "../../Contexts/ItemsFavorites";
import { useItemsSales } from "../../Contexts/ItemsSales";

import { Theme } from "../../Theme";

export const HeaderSearch = () => {
  const { itemsFavorites } = useItemsFavorites();
  const { itemsSales } = useItemsSales();

  const { navigate } = useNavigation() as any;

  return (
    <Container>
      <ContentInputSearch>
        <TouchableOpacity onPress={() => navigate("search_products")}>
          <InputSearch
            placeholder="Pesquisa"
            style={{
              fontFamily: "Lato_400Regular",
            }}
            editable={false}
          />
        </TouchableOpacity>
        <ContentSearch>
          <AntDesign
            name="search1"
            size={RFValue(20)}
            color={Theme.colors.gray_dark}
          />
        </ContentSearch>
      </ContentInputSearch>

      <ContentIcons>
        <ButtonIcon onPress={() => navigate("sales")}>
          <IconsBadge
            icon={
              <AntDesign
                name="shoppingcart"
                size={RFValue(30)}
                color={Theme.colors.text_black}
              />
            }
            quantity={itemsSales.length}
          />
        </ButtonIcon>

        <ButtonIcon onPress={() => navigate("productsFavorites")}>
          <IconsBadge
            icon={
              <AntDesign
                name="hearto"
                size={RFValue(30)}
                color={Theme.colors.text_black}
              />
            }
            quantity={itemsFavorites.length}
          />
        </ButtonIcon>
      </ContentIcons>
    </Container>
  );
};
