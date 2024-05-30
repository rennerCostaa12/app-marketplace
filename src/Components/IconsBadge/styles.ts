import { styled } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

export const Container = styled.View``;

export const ContentIcon = styled.View``;

export const ContentBadge = styled.View`
  align-items: center;
  justify-content: center;
  background-color: ${Theme.colors.primary};
  position: absolute;
  right: ${RFValue(-10)}px;
  top: ${RFValue(-10)}px;
  width: ${RFValue(23)}px;
  height: ${RFValue(18)}px;
  border-radius: ${RFValue(5)}px;
`;

export const Badge = styled.Text`
  text-align: center;
  color: ${Theme.colors.text_white};
  font-size: ${Theme.fontSize.tiny}px;
`;
