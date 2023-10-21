import { Input, Container, ContentIcon } from "./styles";

import { TextInputProps } from "react-native";
import { AntDesign } from "@expo/vector-icons";

interface InputSearchProps extends TextInputProps {}

export const InputSearch = ({ ...props }: InputSearchProps) => {
  return (
    <Container>
      <ContentIcon>
        <AntDesign name="search1" size={20} color="#8a8a8a" />
      </ContentIcon>
      <Input {...props} />
    </Container>
  );
};
