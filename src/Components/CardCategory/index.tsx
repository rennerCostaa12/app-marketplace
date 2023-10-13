import { Container, TextCategory, ContentIcon } from "./styles";

import {
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import { useNavigation } from "@react-navigation/native";

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
            size={RFValue(24)}
            color="#FFFFFFFF"
          />
        );
      case "drink":
        return <Entypo name="drink" size={RFValue(24)} color="#FFFFFFFF" />;
      case "food":
        return (
          <MaterialCommunityIcons
            name="food-turkey"
            size={RFValue(24)}
            color="#FFFFFFFF"
          />
        );
      case "toys":
        return (
          <MaterialIcons name="toys" size={RFValue(24)} color="#FFFFFFFF" />
        );
      default:
        return <Entypo name="drink" size={RFValue(24)} color="#FFFFFFFF" />;
    }
  };

  return (
    <Container onPress={() => navigate(value)}>
      <ContentIcon>{switchIcon()}</ContentIcon>
      <TextCategory style={{ fontFamily: "Lato_400Regular" }}>
        {nameCategory}
      </TextCategory>
    </Container>
  );
};
