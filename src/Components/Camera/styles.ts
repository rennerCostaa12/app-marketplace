import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

interface TextPreviewImgProps {
  color: string;
}

export const ContentOptionsCamera = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${Theme.colors.background_dark};
  height: ${RFValue(100)}px;
  padding: 0 ${RFValue(20)}px;
`;

export const ContentIconClose = styled.TouchableOpacity``;

export const ContentIconCapture = styled.TouchableOpacity`
  border-width: 3px;
  border-color: ${Theme.colors.text_white};
  border-radius: ${RFValue(360)}px;
  padding: ${RFValue(15)}px;
`;

export const ContentIconChangePositionCamera = styled.TouchableOpacity``;

export const ContainerImagePreview = styled.View`
  flex: 1;
`;

export const ContentButtons = styled.View`
  width: 100%;
  height: ${RFValue(100)}px;
  background-color: #000000;
  flex-direction: row;
  gap: ${RFValue(70)}px;
  justify-content: center;
  align-items: center;
`;

export const ImagePreview = styled.Image`
  width: 100%;
  flex: 1;
`;

export const ButtonPreviewImg = styled.TouchableOpacity`
  align-items: center;
`;

export const TextPreviewImg = styled.Text<TextPreviewImgProps>`
  font-size: ${RFValue(20)}px;
  color: ${({ color }) => color};
`;
