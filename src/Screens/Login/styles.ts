import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

interface BtnLoginProps {
  backgroundButton: string;
}

interface TextBtnLoginProps {
  color: string;
}

export const Container = styled.View`
  flex: 1;
  padding: 0 ${RFValue(20)}px;
  justify-content: center;
  background-color: ${Theme.colors.background_color};
`;

export const ContentImg = styled.View`
  align-items: center;
  margin: ${RFValue(20)}px 0;
`;

export const Image = styled.Image`
  width: ${RFValue(230)}px;
  height: ${RFValue(230)}px;
`;

export const TitlePage = styled.Text`
  text-align: center;
  font-size: ${Theme.fontSize.big}px;
  font-family: Lato_700Bold;
`;

export const ContentInput = styled.View`
  align-items: center;
  margin: ${RFValue(10)}px 0;
`;

export const ContentButton = styled.View`
  margin: ${RFValue(10)}px 0;
  align-items: center;
`;

export const BtnLogin = styled.TouchableOpacity<BtnLoginProps>`
  background-color: ${({ backgroundButton }) => backgroundButton};
  padding: ${RFValue(15)}px ${RFValue(20)}px;
  border-radius: ${RFValue(30)}px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: ${RFValue(20)}px;
`;

export const TextBtnLogin = styled.Text<TextBtnLoginProps>`
  font-size: ${Theme.fontSize.medium}px;
  font-family: Lato_400Regular;
  color: ${({ color }) => color};
  text-align: center;
`;

export const ContentTextNotAccount = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const TextNotAccount = styled.Text`
  font-size: ${Theme.fontSize.small}px;
  text-align: center;
  margin: ${RFValue(20)}px 0;
`;

export const IconImgButton = styled.Image`
  width: ${RFValue(30)}px;
  height: ${RFValue(30)}px;
`;
