import styled from "styled-components/native";

import { Theme } from "../../Theme";

interface TextProps {
  color: string;
}

export const ButtonLink = styled.TouchableOpacity``;

export const Text = styled.Text<TextProps>`
  font-size: ${Theme.fontSize.medium}px;
  font-family: Lato_700Bold;
  color: ${({ color }) => color};
`;
