import { styled } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

export const Container = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${RFValue(20)}px ${RFValue(15)}px;
  background-color: ${Theme.colors.background_color};
  margin-top: ${RFValue(10)}px;
  gap: ${RFValue(10)}px;
`;

export const ContentInputSearch = styled.View`
  flex: 1;
`;

export const ContentIcons = styled.View`
  flex: 0.2;
  flex-direction: row;
  gap: ${RFValue(12)}px;
`;

export const InputSearch = styled.TextInput`
  width: 100%;
  border: ${RFValue(1)}px solid ${Theme.colors.gray_dark};
  border-radius: ${RFValue(20)}px;
  padding: ${RFValue(8)}px;
  padding-left: ${RFValue(35)}px;
`;

export const ContentSearch = styled.View`
  position: absolute;
  top: ${RFValue(2)}px;
  left: ${RFValue(10)}px;
  margin: ${RFValue(11)}px ${RFValue(5)}px;
`;

export const ButtonIcon = styled.TouchableOpacity``;
