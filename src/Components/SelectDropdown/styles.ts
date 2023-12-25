import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import { Theme } from "../../Theme";

export const Container = styled.View`
  width: 100%;
  position: relative;
  z-index: 99999;
`;

export const ContainerInput = styled.View``;

export const ContentInput = styled.TouchableOpacity`
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: ${RFValue(5)}px;
  border-width: ${RFValue(1)}px;
  border-radius: 5px;
  font-size: ${Theme.fontSize.medium}px;
`;

export const TextInput = styled.Text``;

export const ContentItems = styled.ScrollView`
  elevation: ${RFValue(10)};
  padding: ${RFValue(5)}px;
  height: ${RFValue(100)}px;
`;

export const ContainerItems = styled.View`
  max-height: 100px;
  background-color: ${Theme.colors.background_color};
`;

export const Items = styled.TouchableOpacity`
  margin: ${RFValue(2)}px 0;
  padding: ${RFValue(5)}px 0;
  border-bottom-width: ${RFValue(1)}px;
  border-color: ${Theme.colors.gray_normal};
`;

export const TextItem = styled.Text`
  font-size: ${Theme.fontSize.tiny}px;
`;
