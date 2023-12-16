import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface StatusTitleProps {
  backgroundStatus: string;
}

export const Container = styled.View`
  border-bottom-width: 0.5px;
  border-color: gray;
`;

export const HeaderCollapse = styled.TouchableOpacity`
  padding: ${RFValue(20)}px ${RFValue(10)}px;
  background-color: #ffffff;
  elevation: 5;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
`;

export const TextHeader = styled.Text`
  font-size: ${RFValue(11)}px;
  font-family: Lato_700Bold;
`;

export const StatusTitle = styled.Text<StatusTitleProps>`
  font-size: ${RFValue(11)}px;
  font-family: Lato_400Regular;
  background-color: ${({ backgroundStatus }) =>
    backgroundStatus ? backgroundStatus : "gray"};
  padding: ${RFValue(4)}px;
  border-radius: ${RFValue(5)}px;
  color: #ffffff;
`;

export const Content = styled.ScrollView``;

export const ContentIcon = styled.View``;
