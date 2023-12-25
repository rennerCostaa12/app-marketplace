import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${RFValue(10)}px;
  background-color: ${Theme.colors.background_color};
  padding: ${RFValue(5)}px;
  border-radius: ${RFValue(5)}px;
`;

export const Quantity = styled.Text`
  font-size: ${Theme.fontSize.medium}px;
`;

export const Button = styled.TouchableOpacity``;
