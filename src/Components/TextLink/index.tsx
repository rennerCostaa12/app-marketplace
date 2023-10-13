import { ButtonLink, Text } from "./styles";
import { TouchableOpacityProps } from "react-native";

interface TextLinkProps extends TouchableOpacityProps {
  text: string;
  color: string;
}

export const TextLink = ({ text, color, ...props }: TextLinkProps) => {
  return (
    <ButtonLink {...props}>
      <Text color={color} style={{ fontFamily: "Lato_700Bold" }}>
        {text}
      </Text>
    </ButtonLink>
  );
};
