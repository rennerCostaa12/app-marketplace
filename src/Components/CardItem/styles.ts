import { styled } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

export const Container = styled.View`
  width: ${RFValue(155)}px;
  background-color: ${Theme.colors.background_color};
  padding: ${RFValue(1)}px;
  elevation: 5;
`;

export const ContentDescriptionsItem = styled.View`
  padding: ${RFValue(10)}px;
`;

export const ContentImg = styled.View`
  justify-content: center;
  align-items: center;
  background-color: ${Theme.colors.white_ligth};
`;

export const ImageItem = styled.Image`
  width: 50%;
  height: ${RFValue(100)}px;
`;

export const NameItem = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: Lato_700Bold;
`;

export const ContentPricesAndSale = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: ${RFValue(10)}px 0px;
`;

export const ButtonAddProduct = styled.TouchableOpacity``;

export const PriceItem = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: Lato_700Bold;
  text-align: right;
  color: ${Theme.colors.bluish_green};
  margin: ${RFValue(5)}px 0;
`;
export const CategoryItem = styled.Text`
  font-size: ${RFValue(10)}px;
  font-family: Lato_400Regular;
  color: ${Theme.colors.gray_normal};
`;

export const ContentIconFavorite = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  margin: ${RFValue(5)}px;
`;
