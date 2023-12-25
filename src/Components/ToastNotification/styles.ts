import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

interface BrandColorProps {
  color?: string;
}

export const Container = styled.View`
  position: absolute;
  z-index: 1000;
`;

export const Content = styled.View`
  flex-direction: row;
  border-width: 0.5px;
  width: ${RFValue(250)}px;
  background-color: ${Theme.colors.background_color};
  elevation: ${RFValue(10)};
`;

export const BrandColor = styled.View<BrandColorProps>`
  width: ${RFValue(5)}px;
  background-color: ${({ color }) => (color ? color : Theme.colors.green_dark)};
`;

export const ContentDescriptionNotification = styled.View`
  width: 90%;
  margin: ${RFValue(10)}px;
`;

export const Title = styled.Text`
  font-size: ${Theme.fontSize.small}px;
  font-family: Lato_700Bold;
`;

export const Text = styled.Text``;
