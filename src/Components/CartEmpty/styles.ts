import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
  align-items: center;
`;

export const Text = styled.Text`
  font-size: ${RFValue(20)}px;
  text-align: center;
  font-family: Lato_400Regular;
`;
