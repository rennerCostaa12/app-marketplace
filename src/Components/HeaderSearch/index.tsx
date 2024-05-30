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

import { useCacheItemsUser } from "../../Contexts/CacheItemsUser";
import { useAuthContext } from "../../Contexts/Auth";

import { Theme } from "../../Theme";

export const HeaderSearch = () => {
  const { cacheItemsUser } = useCacheItemsUser();
  const { dataUser } = useAuthContext();

  const { navigate } = useNavigation() as any;

  const cacheUser = cacheItemsUser.find((data) => data.user.id === dataUser.id);
  
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
            size={RFValue(15)}
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
                size={RFValue(20)}
                color={Theme.colors.text_black}
              />
            }
            quantity={cacheUser ? cacheUser.itemsSales.length : 0}
          />
        </ButtonIcon>

        <ButtonIcon onPress={() => navigate("productsFavorites")}>
          <IconsBadge
            icon={
              <AntDesign
                name="hearto"
                size={RFValue(20)}
                color={Theme.colors.text_black}
              />
            }
            quantity={cacheUser ? cacheUser.itemsFavorites.length : 0}
          />
        </ButtonIcon>
      </ContentIcons>
    </Container>
  );
};
