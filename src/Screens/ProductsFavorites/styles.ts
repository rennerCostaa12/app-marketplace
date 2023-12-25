import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

export const Container = styled.View`
  margin-top: ${RFValue(20)}px;
`;

export const ContentProducts = styled.SafeAreaView``;

export const ContentCard = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${RFValue(10)}px;
  padding: ${RFValue(20)}px ${RFValue(10)}px;
  background-color: ${Theme.colors.background_color};
  margin-bottom: ${RFValue(15)}px;
  elevation: 5;
`;

export const ContentImgProduct = styled.View``;

export const ImgProduct = styled.Image`
  width: ${RFValue(100)}px;
  height: ${RFValue(100)}px;
`;

export const ContentDescription = styled.View`
  flex: 1;
`;

export const TitleProduct = styled.Text`
  font-size: ${Theme.fontSize.medium}px;
  font-family: Lato_400Regular;
`;

export const PriceProduct = styled.Text`
  font-size: ${Theme.fontSize.medium}px;
  font-family: Lato_400Regular;
  margin: ${RFValue(7)}px 0;
`;

export const CategoryProduct = styled.Text`
  font-size: ${Theme.fontSize.small}px;
  font-family: Lato_400Regular;
  color: ${Theme.colors.gray_normal};
`;

export const ContentIcon = styled.View`
  margin: 0 ${RFValue(10)}px;
`;

export const ButtonRemoveFavorite = styled.TouchableOpacity``;
