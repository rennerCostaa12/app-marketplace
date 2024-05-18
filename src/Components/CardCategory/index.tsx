import { useNavigation } from "@react-navigation/native";

import { Container, TextCategory, ContentIcon, Icon } from "./styles";

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

  return (
    <Container onPress={() => navigate(value)}>
      <ContentIcon>
        <Icon
          source={icon as any}
        />
      </ContentIcon>
      <TextCategory>{nameCategory}</TextCategory>
    </Container>
  );
};
