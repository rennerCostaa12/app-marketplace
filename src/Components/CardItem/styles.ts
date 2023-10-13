import { styled } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: ${RFValue(155)}px;
  background-color: white;
  padding: ${RFValue(1)}px;
  elevation: 3;
`;

export const ContentDescriptionsItem = styled.View`
  padding: ${RFValue(10)}px;
`;

export const ContentImg = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #f1eff1;
`;

export const ImageItem = styled.Image`
  width: 50%;
  height: ${RFValue(100)}px;
`;

export const NameItem = styled.Text`
  font-size: ${RFValue(16)}px;
`;

export const ContentPricesAndSale = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: ${RFValue(10)}px 0px;
`;

export const ButtonAddProduct = styled.TouchableOpacity``;

export const PriceItem = styled.Text`
  font-size: ${RFValue(20)}px;
  text-align: right;
  color: #649a8c;
  margin: ${RFValue(5)}px 0;
`;
export const CategoryItem = styled.Text`
  font-size: ${RFValue(13)}px;
  color: gray;
`;

export const ContentIconFavorite = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  margin: ${RFValue(5)}px;
`;
