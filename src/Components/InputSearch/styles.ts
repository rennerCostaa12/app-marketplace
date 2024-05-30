import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

export const Container = styled.View`
  position: relative;
`;

export const ContentIcon = styled.View`
  position: absolute;
  top: ${RFValue(2)}px;
  left: ${RFValue(10)}px;
  margin: ${RFValue(11)}px ${RFValue(5)}px;
`;

export const Input = styled.TextInput`
  width: ${RFValue(220)}px;
  border: ${RFValue(1)}px solid ${Theme.colors.gray_dark};
  border-radius: ${RFValue(20)}px;
  padding: ${RFValue(8)}px;
  padding-left: ${RFValue(35)}px;
`;
