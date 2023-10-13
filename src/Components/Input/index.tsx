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
import { TextInputProps } from "react-native";

import { Ionicons } from "@expo/vector-icons";

import { ReactNode, useState } from "react";

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
        {labelText && (
          <LabelInput style={{ fontFamily: "Lato_400Regular" }}>
            {labelText}
          </LabelInput>
        )}
        <ContentInput>
          <InputStyles
            secureTextEntry={type === "default" ? false : showPassword}
            colorBorderBottom={colorBorder}
            {...props}
            onFocus={() => setColorBorder("#FF1493")}
            onBlur={() => setColorBorder(null)}
          />
          {type === "password" && (
            <ButtonPasswordIcon onPress={handleChangeShowPassword}>
              <Ionicons
                name={!showPassword ? "eye" : "eye-off"}
                size={24}
                color={colorBorder ? colorBorder : "#000000"}
              />
            </ButtonPasswordIcon>
          )}
        </ContentInput>
        {error && (
          <MessageError style={{ fontFamily: "Lato_400Regular" }}>
            {error}
          </MessageError>
        )}
      </ContainerInput>
    </Container>
  );
};
