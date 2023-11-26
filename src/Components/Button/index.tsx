import { Button as ButtonStyles, TextButton } from "./styles";

import { TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  textButton: string;
  color: string;
  textColor: string;
  fontSize?: number;
}

export const Button = ({
  textButton,
  color,
  textColor,
  fontSize,
  ...props
}: ButtonProps) => {
  return (
    <ButtonStyles color={color} {...props}>
      <TextButton
        size={fontSize}
        color={textColor}
        style={{ fontFamily: "Lato_400Regular" }}
      >
        {textButton}
      </TextButton>
    </ButtonStyles>
  );
};
