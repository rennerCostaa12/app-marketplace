import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  background-color: #00000046;
  flex: 1;
`;

export const Content = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: ${RFValue(180)}px;
  background-color: #ffffff;
  padding: ${RFValue(20)}px;
`;

export const Title = styled.Text`
  font-size: ${RFValue(16)}px;
  margin-bottom: ${RFValue(20)}px;
`;

export const ButtonOptions = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(10)}px;
  margin: ${RFValue(10)}px 0;
`;

export const TextButtonOptions = styled.Text`
  font-size: ${RFValue(16)}px;
`;
