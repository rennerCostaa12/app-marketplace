import { styled } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

export const Container = styled.TouchableOpacity`
  width: ${RFValue(72)}px;
  height: ${RFValue(110)}px;
  background-color: ${Theme.colors.primary};
  padding: ${RFValue(5)}px;
  border-radius: ${RFValue(100)}px;
  align-items: center;
  margin: 0 ${RFValue(10)}px;
  gap: ${RFValue(5)}px;
  elevation: 5;
`;

export const ContentIcon = styled.View`
  background-color: ${Theme.colors.white_ligth};
  border-radius: ${RFValue(50)}px;
  margin-top: ${RFValue(5)}px;
`;

export const Icon = styled.Image``;

export const TextCategory = styled.Text`
  font-size: ${Theme.fontSize.tiny}px;
  color: ${Theme.colors.text_white};
  font-family: Lato_400Regular;
  text-align: center;
`;
