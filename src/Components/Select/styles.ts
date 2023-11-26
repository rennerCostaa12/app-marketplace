import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  border-width: ${RFValue(0.5)}px;
  border-radius: ${RFValue(5)}px;
  border-color: gray;
`;
