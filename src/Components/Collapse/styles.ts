import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

interface StatusTitleProps {
  backgroundStatus: string;
}

export const Container = styled.View`
  border-bottom-width: 0.5px;
  border-color: ${Theme.colors.gray_normal};
`;

export const HeaderCollapse = styled.TouchableOpacity`
  padding: ${RFValue(20)}px ${RFValue(10)}px;
  background-color: ${Theme.colors.background_color};
  elevation: 5;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  gap: ${RFValue(5)}px;
`;

export const TextHeader = styled.Text`
  font-size: ${Theme.fontSize.small}px;
  font-family: Lato_700Bold;
`;

export const StatusTitle = styled.Text<StatusTitleProps>`
  font-size: ${Theme.fontSize.small}px;
  font-family: Lato_400Regular;
  background-color: ${({ backgroundStatus }) =>
    backgroundStatus ? backgroundStatus : Theme.colors.gray_normal};
  padding: ${RFValue(4)}px;
  border-radius: ${RFValue(5)}px;
  color: ${Theme.colors.text_white};
`;

export const Content = styled.ScrollView``;

export const ContentIcon = styled.View``;
