import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

interface ContentIconProps {
  isActive: boolean;
}

export const Container = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${Theme.colors.background_transparent};
  align-items: center;
  justify-content: center;
`;

export const TextVoice = styled.Text`
  font-size: ${Theme.fontSize.medium}px;
  margin: ${RFValue(10)}px 0;
`;

export const Content = styled.View`
  flex: 0.5;
  border-radius: ${RFValue(5)}px;
  background-color: ${Theme.colors.background_color};
  justify-content: center;
  align-items: center;
  padding: ${RFValue(10)}px;
  margin: 0 ${RFValue(10)}px;
  margin-top: ${RFValue(200)}px;
`;

export const ContentIcon = styled.TouchableOpacity<ContentIconProps>`
  border-width: ${RFValue(1)}px;
  border-radius: 360px;
  padding: ${RFValue(20)}px;
  background-color: ${({ isActive }) =>
    isActive ? Theme.colors.red_crimson : Theme.colors.background_color};
`;
