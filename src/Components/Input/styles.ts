import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface InputProps {
  colorBorderBottom?: string;
}

export const Container = styled.View`
  margin: ${RFValue(20)}px 0;
  flex-direction: row;
  gap: ${RFValue(5)}px;
`;

export const ContainerInput = styled.View`
  width: 100%;
`;

export const ContentInput = styled.View`
  position: relative;
`;

export const ContentIcon = styled.View``;

export const LabelInput = styled.Text`
  font-size: ${RFValue(14)}px;
`;

export const Input = styled.TextInput<InputProps>`
  border-bottom-width: ${RFValue(1.2)}px;
  border-bottom-color: ${({ colorBorderBottom }) =>
    colorBorderBottom ? colorBorderBottom : "#000000"};
  font-size: ${RFValue(12)}px;
`;

export const MessageError = styled.Text`
  margin-top: ${RFValue(5)}px;
  font-size: ${RFValue(12)}px;
  color: #dc143c;
`;

export const ButtonPasswordIcon = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  bottom: ${RFValue(10)}px;
`;
