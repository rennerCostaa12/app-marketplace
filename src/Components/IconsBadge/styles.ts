import { styled } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View``;

export const ContentIcon = styled.View``;

export const ContentBadge = styled.View`
  align-items: center;
  justify-content: center;
  background-color: #ff1493;
  position: absolute;
  right: ${RFValue(-10)}px;
  top: ${RFValue(-10)}px;
  width: ${RFValue(25)}px;
  height: ${RFValue(20)}px;
  border-radius: ${RFValue(5)}px;
`;

export const Badge = styled.Text`
  text-align: center;
  color: #ffffff;
  font-size: ${RFValue(13)}px;
`;
