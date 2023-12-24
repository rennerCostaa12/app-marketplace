import { styled } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity`
  width: ${RFValue(110)}px;
  background-color: #ff1493;
  padding: ${RFValue(5)}px;
  border-radius: ${RFValue(5)}px;
  align-items: center;
  justify-content: center;
  margin: 0 ${RFValue(10)}px;
`;

export const ContentIcon = styled.View``;

export const TextCategory = styled.Text`
  font-size: ${RFValue(14)}px;
  color: #ffffff;
`;
