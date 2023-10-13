import { Button as ButtonStyles, TextButton } from "./styles";

import { TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  textButton: string;
  color: string;
  textColor: string;
}

export const Button = ({
  textButton,
  color,
  textColor,
  ...props
}: ButtonProps) => {
  return (
    <ButtonStyles color={color} {...props}>
      <TextButton color={textColor} style={{ fontFamily: "Lato_400Regular" }}>
        {textButton}
      </TextButton>
    </ButtonStyles>
  );
};
