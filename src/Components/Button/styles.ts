import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface ButtonProps {
  color: string;
}

interface TextButtonProps {
  color: string;
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  background-color: ${({ color }) => color};
  padding: ${RFValue(15)}px ${RFValue(20)}px;
  border-radius: 5px;
`;

export const TextButton = styled.Text<TextButtonProps>`
  font-size: ${RFValue(18)}px;
  color: ${({ color }) => color};
  text-align: center;
`;
