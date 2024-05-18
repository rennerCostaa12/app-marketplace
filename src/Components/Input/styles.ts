import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

interface InputProps {
  colorBorderBottom?: string;
}

export const Container = styled.View`
  margin: ${RFValue(10)}px 0;
  flex-direction: row;
  gap: ${RFValue(3)}px;
`;

export const ContainerInput = styled.View`
  width: 100%;
`;

export const ContentInput = styled.View`
  position: relative;
`;

export const ContentIcon = styled.View`
  margin-top: ${RFValue(8)}px;
`;

export const LabelInput = styled.Text`
  font-size: ${Theme.fontSize.small}px;
  font-family: Lato_400Regular;
  margin-bottom: ${RFValue(10)}px;
`;

export const Input = styled.TextInput<InputProps>`
  font-size: ${Theme.fontSize.tiny}px;
  background-color:${Theme.colors.gray_light};
  padding: ${RFValue(10)}px;
  border-radius: ${RFValue(20)}px;
`;

export const MessageError = styled.Text`
  margin-top: ${RFValue(5)}px;
  font-size: ${Theme.fontSize.tiny}px;
  font-family: Lato_400Regular;
  color: ${Theme.colors.red_crimson};
`;

export const ButtonPasswordIcon = styled.TouchableOpacity`
  position: absolute;
  right: ${RFValue(10)}px;
  bottom: ${RFValue(10)}px;
`;
