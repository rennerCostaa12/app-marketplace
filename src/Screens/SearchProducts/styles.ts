import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import { Theme } from "../../Theme";

export const Container = styled.View``;

export const ContentHeader = styled.View`
  padding: ${RFValue(35)}px ${RFValue(20)}px ${RFValue(12)}px ${RFValue(20)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${Theme.colors.background_color};
`;

export const Body = styled.View`
  position: relative;
`;

export const ContentInputSearch = styled.View`
  position: relative;
`;

export const ContentIconClearText = styled.TouchableOpacity`
  position: absolute;
  top: ${RFValue(12)}px;
  right: ${RFValue(10)}px;
`;

export const ContentIcon = styled.TouchableOpacity``;

export const ContentItems = styled.View`
  align-items: center;
  height: 90%;
`;

export const ContainerResearches = styled.View`
  width: 100%;
`;

export const ContentResearches = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  gap: ${RFValue(10)}px;
  background-color: ${Theme.colors.background_color};
  padding: ${RFValue(15)}px;
`;

export const ContentTextResearche = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(20)}px;
`;

export const TextResearche = styled.Text`
  font-size: ${Theme.fontSize.medium}px;
`;
