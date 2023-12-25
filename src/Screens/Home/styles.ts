import { styled } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

export const Container = styled.View`
  background-color: ${Theme.colors.background_color};
`;

export const ContentCategories = styled.SafeAreaView`
  width: 100%;
  margin: ${RFValue(20)}px ${RFValue(10)}px;
  background-color: ${Theme.colors.background_color};
  padding-right: ${RFValue(10)}px;
`;

export const Content = styled.View`
  background-color: ${Theme.colors.background_color};
`;

export const ContentItems = styled.SafeAreaView`
  width: 100%;
  height: ${RFValue(600)}px;
  align-items: center;
`;
