import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

export const Container = styled.View`
  background-color: ${Theme.colors.background_transparent};
  flex: 1;
`;

export const Content = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${RFValue(180)}px;
  background-color: ${Theme.colors.background_color};
  padding: ${RFValue(20)}px;
`;

export const Title = styled.Text`
  font-size: ${Theme.fontSize.medium}px;
  margin-bottom: ${RFValue(20)}px;
`;

export const ButtonOptions = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(10)}px;
  margin: ${RFValue(10)}px 0;
`;

export const TextButtonOptions = styled.Text`
  font-size: ${Theme.fontSize.medium}px;
`;
