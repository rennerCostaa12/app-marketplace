import { styled } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.ScrollView`
  flex: 1;
  padding: ${RFValue(20)}px ${RFValue(20)}px;
  background-color: #ffffff;
`;

export const ContainerInputs = styled.View`
  width: 100%;
`;

export const ContentButtonPhoto = styled.View`
  align-items: center;
`;

export const ContentButton = styled.View`
  width: 100%;
  margin: ${RFValue(40)}px 0;
  flex-direction: column;
  gap: ${RFValue(20)}px;
`;
