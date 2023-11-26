import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

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
  background-color: #ffffff;
  elevation: ${RFValue(10)};
`;

export const BrandColor = styled.View<BrandColorProps>`
  width: ${RFValue(5)}px;
  background-color: ${({ color }) => (color ? color : "#007C00")};
`;

export const ContentDescriptionNotification = styled.View`
  width: 90%;
  margin: ${RFValue(10)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
`;

export const Text = styled.Text``;
