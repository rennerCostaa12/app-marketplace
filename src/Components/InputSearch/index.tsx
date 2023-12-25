import { TextInputProps } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { AntDesign } from "@expo/vector-icons";

import { Input, Container, ContentIcon } from "./styles";

import { Theme } from "../../Theme";

interface InputSearchProps extends TextInputProps {}

export const InputSearch = ({ ...props }: InputSearchProps) => {
  return (
    <Container>
      <ContentIcon>
        <AntDesign
          name="search1"
          size={RFValue(20)}
          color={Theme.colors.gray_dark}
        />
      </ContentIcon>
      <Input {...props} />
    </Container>
  );
};
