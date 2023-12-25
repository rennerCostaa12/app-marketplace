import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import { TextInputProps } from "react-native";
import { ReactNode, useState } from "react";

import {
  Input as InputStyles,
  ContentInput,
  LabelInput,
  MessageError,
  ButtonPasswordIcon,
  ContentIcon,
  Container,
  ContainerInput,
} from "./styles";

import { Theme } from "../../Theme";

interface InputProps extends TextInputProps {
  labelText?: string;
  error?: string | null;
  type: "password" | "default";
  icon?: ReactNode;
}

export const Input = ({
  labelText,
  error,
  type,
  icon,
  ...props
}: InputProps) => {
  const [colorBorder, setColorBorder] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(true);

  const handleChangeShowPassword = () =>
    showPassword ? setShowPassword(false) : setShowPassword(true);

  return (
    <Container>
      {icon && <ContentIcon>{icon}</ContentIcon>}
      <ContainerInput>
        {labelText && <LabelInput>{labelText}</LabelInput>}
        <ContentInput>
          <InputStyles
            secureTextEntry={type === "default" ? false : showPassword}
            colorBorderBottom={colorBorder}
            {...props}
            onFocus={() => setColorBorder(Theme.colors.primary)}
            onBlur={() => setColorBorder(null)}
          />
          {type === "password" && (
            <ButtonPasswordIcon onPress={handleChangeShowPassword}>
              <Ionicons
                name={!showPassword ? "eye" : "eye-off"}
                size={RFValue(24)}
                color={colorBorder ? colorBorder : Theme.colors.text_black}
              />
            </ButtonPasswordIcon>
          )}
        </ContentInput>
        {error && <MessageError>{error}</MessageError>}
      </ContainerInput>
    </Container>
  );
};
