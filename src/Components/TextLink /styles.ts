import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface TextProps {
  color: string;
}

export const ButtonLink = styled.TouchableOpacity``;

export const Text = styled.Text<TextProps>`
  font-size: ${RFValue(16)}px;
  color: ${({ color }) => color};
`;
