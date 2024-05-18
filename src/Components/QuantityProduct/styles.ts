import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${RFValue(10)}px;
  background-color: ${Theme.colors.gray_light};
  padding: ${RFValue(5)}px;
  border-radius: ${RFValue(20)}px;
`;

export const Quantity = styled.Text`
  font-size: ${Theme.fontSize.small}px;
`;

export const Button = styled.TouchableOpacity``;
