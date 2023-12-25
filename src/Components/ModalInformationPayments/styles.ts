import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  width: ${RFValue(320)}px;
  margin: 0 ${RFValue(10)}px;
  background-color: ${Theme.colors.background_color};
  padding: ${RFValue(20)}px;
  border-radius: ${RFValue(5)}px;
  elevation: ${RFValue(40)};
`;

export const Section = styled.View`
  margin: ${RFValue(5)}px 0;
`;

export const TitleSection = styled.Text`
  font-size: ${Theme.fontSize.small}px;
  font-family: Lato_700Bold;
  margin: ${RFValue(10)}px 0;
`;

export const ContentKeyPix = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(5)}px;
`;

export const InputText = styled.TextInput`
  width: 83%;
  border-width: ${RFValue(1)}px;
  border-radius: ${RFValue(4)}px;
  border-color: ${Theme.colors.gray_normal};
  font-size: ${Theme.fontSize.tiny}px;
  padding: ${RFValue(10)}px ${RFValue(10)}px;
`;

export const ButtonCopyKeyPix = styled.TouchableOpacity`
  background-color: ${Theme.colors.primary};
  padding: ${RFValue(12)}px;
  border-radius: ${RFValue(5)}px;
`;

export const ContentBtnCloseModal = styled.View`
  gap: ${RFValue(5)}px;
  margin: ${RFValue(10)}px 0;
`;

export const ContentMoney = styled.View``;

export const ContainerAddress = styled.View`
  gap: ${RFValue(10)}px;
`;

export const ContentDatas = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LabelText = styled.Text`
  font-size: ${Theme.fontSize.tiny}px;
  font-family: Lato_700Bold;
  margin-right: ${RFValue(5)}px;
`;

export const ValueText = styled.Text`
  font-size: ${Theme.fontSize.tiny}px;
  font-family: Lato_400Regular;
`;

export const ContentTotalPrices = styled.View`
  margin: ${RFValue(10)}px 0;
  align-items: center;
`;

export const LabelTotalPrices = styled.Text`
  font-size: ${Theme.fontSize.medium}px;
`;

export const TextPrice = styled.Text`
  font-size: ${Theme.fontSize.medium}px;
`;

export const Symbols = styled.Text`
  font-size: ${Theme.fontSize.medium}px;
  margin: 0 ${RFValue(5)}px;
`;
