import { Container, TextCategory, ContentIcon } from "./styles";

import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import { useNavigation } from "@react-navigation/native";

import { Theme } from "../../Theme";

interface CardCategoryProps {
  nameCategory: string;
  value: string;
  icon: string;
}

export const CardCategory = ({
  nameCategory,
  value,
  icon,
}: CardCategoryProps) => {
  const { navigate } = useNavigation() as any;

  const switchIcon = () => {
    switch (icon) {
      case "cleaning":
        return (
          <MaterialIcons
            name="dry-cleaning"
            size={RFValue(20)}
            color={Theme.colors.text_white}
          />
        );
      case "drink":
        return (
          <Entypo
            name="drink"
            size={RFValue(20)}
            color={Theme.colors.text_white}
          />
        );
      case "food":
        return (
          <MaterialCommunityIcons
            name="food-turkey"
            size={RFValue(20)}
            color={Theme.colors.text_white}
          />
        );
      case "toys":
        return (
          <MaterialIcons
            name="toys"
            size={RFValue(20)}
            color={Theme.colors.text_white}
          />
        );
      default:
        return (
          <Entypo
            name="drink"
            size={RFValue(20)}
            color={Theme.colors.text_white}
          />
        );
    }
  };

  return (
    <Container onPress={() => navigate(value)}>
      <ContentIcon>{switchIcon()}</ContentIcon>
      <TextCategory>{nameCategory}</TextCategory>
    </Container>
  );
};
