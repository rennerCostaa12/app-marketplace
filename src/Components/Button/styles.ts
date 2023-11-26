import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

interface ButtonProps {
  color: string;
}

interface TextButtonProps {
  color: string;
  size: number;
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  elevation: 3;
  background-color: ${({ color }) => color};
  padding: ${RFValue(10)}px ${RFValue(15)}px;
  border-radius: 5px;
`;

export const TextButton = styled.Text<TextButtonProps>`
  font-size: ${({ size }) =>
    size ? `${RFValue(size)}px` : `${RFValue(18)}px`};
  color: ${({ color }) => color};
  text-align: center;
`;
