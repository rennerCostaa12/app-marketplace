import { styled } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  background-color: #ffffff;
`;

export const ContentCategories = styled.SafeAreaView`
  width: 100%;
  margin: ${RFValue(20)}px ${RFValue(10)}px;
  background-color: #ffffff;
  padding-right: ${RFValue(10)}px;
`;

export const Content = styled.View`
  background-color: #f3f3f3;
`;

export const ContentItems = styled.SafeAreaView`
  width: 100%;
  height: ${RFValue(600)}px;
  align-items: center;
`;

export const TitleItems = styled.Text`
  font-size: ${RFValue(30)}px;
  margin: 0 ${RFValue(13)}px;
  margin-bottom: ${RFValue(13)}px;
`;
