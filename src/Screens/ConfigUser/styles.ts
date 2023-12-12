import { styled } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding: ${RFValue(40)}px ${RFValue(20)}px ${RFValue(20)}px ${RFValue(20)}px;
`;

export const Content = styled.ScrollView`
  flex: 1;
`;

export const ContainerInputs = styled.View`
  width: 100%;
`;

export const ContentButtonPhoto = styled.View`
  align-items: center;
`;

export const ContentButton = styled.View`
  width: 100%;
  flex-direction: column;
  gap: ${RFValue(20)}px;
`;
