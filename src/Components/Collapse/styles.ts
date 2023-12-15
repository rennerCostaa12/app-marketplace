import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  border-bottom-width: 0.5px;
  border-color: gray;
`;

export const HeaderCollapse = styled.TouchableOpacity`
  padding: ${RFValue(20)}px ${RFValue(10)}px;
  background-color: white;
  elevation: 5;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
`;

export const TextHeader = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: Lato_700Bold;
`;

export const Content = styled.ScrollView``;

export const ContentIcon = styled.View``;
