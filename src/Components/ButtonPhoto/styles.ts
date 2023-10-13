import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface ContentButtonProps {
  background: string;
}

export const Container = styled.View``;

export const ContentButton = styled.TouchableOpacity<ContentButtonProps>`
  width: ${RFValue(100)}px;
  height: ${RFValue(100)}px;
  border: none;
  border-radius: ${RFValue(360)}px;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: ${({ background }) => background};
`;

export const Image = styled.Image`
  width: ${RFValue(100)}px;
  height: ${RFValue(100)}px;
  border-radius: ${RFValue(360)}px;
`;

export const ContentIconAdd = styled.View`
  align-items: center;
  justify-content: center;
  position: absolute;
  right: ${RFValue(3)}px;
  bottom: ${RFValue(3)}px;
`;
