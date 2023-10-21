import {
  Container,
  ContentIcons,
  ContentInputSearch,
  InputSearch,
  ButtonIcon,
  ContentSearch,
} from "./styles";

import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { IconsBadge } from "../IconsBadge";

import { useItemsFavorites } from "../../Contexts/ItemsFavorites";
import { useItemsSales } from "../../Contexts/ItemsSales";

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
