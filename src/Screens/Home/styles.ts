import { styled } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

export const Container = styled.View`
  background-color: ${Theme.colors.background_color};
`;

export const TextWelcome = styled.Text`
  font-family: Lato_700Bold;
  font-size: ${Theme.fontSize.big}px;
  margin: ${RFValue(50)}px ${RFValue(20)}px ${RFValue(0)}px ${RFValue(15)}px;
`;

export const SubtitleProducts = styled.Text`
  font-family: Lato_700Bold;
  font-size: ${Theme.fontSize.medium}px;
  margin: ${RFValue(10)}px ${RFValue(15)}px;
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
  align-items: center;
  height: 54%;
  padding-bottom: ${RFValue(20)}px;
  margin: ${RFValue(20)}px 0;
`;
