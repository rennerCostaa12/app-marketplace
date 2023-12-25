import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

interface ButtonProps {
  color?: string;
}

interface TextButtonProps {
  color: string;
}

export const Container = styled.View`
  flex: 1;
`;

export const ContentCards = styled.SafeAreaView`
  height: ${RFValue(410)}px;
`;

export const Card = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(30)}px;
  padding: ${RFValue(20)}px ${RFValue(10)}px;
  background-color: ${Theme.colors.background_color};
  margin-bottom: ${RFValue(15)}px;
  elevation: 5;
`;

export const ContentImage = styled.View``;

export const ImageProduct = styled.Image`
  width: ${RFValue(100)}px;
  height: ${RFValue(100)}px;
`;

export const ContentDescriptions = styled.View``;

export const TitleProduct = styled.Text`
  font-size: ${Theme.fontSize.medium}px;
  font-family: Lato_400Regular;
`;
export const CategoryProduct = styled.Text`
  font-size: ${Theme.fontSize.tiny}px;
  font-family: Lato_400Regular;
  color: ${Theme.colors.gray_normal};
  margin: ${RFValue(10)}px 0;
`;

export const PriceProduct = styled.Text`
  font-size: ${Theme.fontSize.medium}px;
  font-family: Lato_400Regular;
`;

export const ContentPriceAndQuantity = styled.View`
  margin: ${RFValue(10)}px 0;
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(25)}px;
`;

export const ContentButtonCheckout = styled.View`
  width: 100%;
  position: absolute;
  bottom: 0;
  text-align: center;
  padding: ${RFValue(20)}px;
  gap: ${RFValue(10)}px;
`;

export const Button = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  background: ${({ color }) => color};
  padding: ${RFValue(15)}px ${RFValue(10)}px;
  border-radius: ${RFValue(5)}px;
  elevation: ${RFValue(5)};
`;

export const TextButton = styled.Text<TextButtonProps>`
  color: ${({ color }) => color};
  font-size: ${Theme.fontSize.small}px;
  text-align: center;
`;

export const ButtonRemove = styled.TouchableOpacity`
  border: ${RFValue(1)}px solid ${Theme.colors.primary};
  border-radius: ${RFValue(5)}px;
  padding: ${RFValue(5)}px ${RFValue(10)}px;
  align-self: flex-start;
  margin: ${RFValue(10)}px 0;
`;

export const PriceFinal = styled.Text`
  font-size: ${Theme.fontSize.big}px;
  text-align: center;
  margin: ${RFValue(30)}px 0;
  color: ${Theme.colors.primary};
`;

export const TextButtonRemove = styled.Text`
  font-size: ${Theme.fontSize.medium}px;
  color: ${Theme.colors.primary};
`;
