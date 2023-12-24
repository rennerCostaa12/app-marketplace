import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View``;

export const ContainerCards = styled.SafeAreaView``;

export const ContentCards = styled.View``;

export const HeaderCards = styled.TouchableOpacity`
  padding: ${RFValue(20)}px ${RFValue(10)}px;
  background-color: #ffffff;
  border-bottom-width: ${RFValue(1)}px;
`;

export const TitleCardRequest = styled.Text`
  font-size: ${RFValue(14)}px;
`;

export const CardRequests = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: ${RFValue(5)}px;
  padding: ${RFValue(10)}px;
  elevation: 5;
  background-color: #ffffff;
  border-bottom-width: ${RFValue(1)}px;
  border-color: #e2e2e2;
`;

export const ContentImgAndDescriptionRequests = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(5)}px;
`;

export const ContentDescriptionRequests = styled.View``;

export const TitleRequests = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: Lato_700Bold;
`;

export const PriceRequests = styled.Text`
  font-size: ${RFValue(14)}px;
  margin: ${RFValue(5)}px 0;
  font-family: Lato_400Regular;
`;

export const ImgRequests = styled.Image`
  width: ${RFValue(80)}px;
  height: ${RFValue(80)}px;
  border-width: ${RFValue(1)}px;
  border-color: #e2e2e2;
`;

export const QuantityRequests = styled.Text`
  font-size: ${RFValue(16)}px;
  margin-right: ${RFValue(5)}px;
  font-family: Lato_400Regular;
`;

export const Line = styled.View`
  margin: ${RFValue(1)}px 0;
`;
