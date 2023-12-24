import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: ${RFValue(10)}px;
  background-color: #dfdfdf;
  padding: ${RFValue(5)}px;
  border-radius: ${RFValue(5)}px;
`;

export const Quantity = styled.Text`
  font-size: ${RFValue(16)}px;
`;

export const Button = styled.TouchableOpacity``;
