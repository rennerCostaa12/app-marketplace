import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

interface OptionsProps {
  selected: boolean;
}

interface ButtonConfirmProps {
  disabled: boolean;
}

export const ContentModal = styled.View`
  bottom: 0;
  position: absolute;
  height: 50%;
  background-color: ${Theme.colors.background_color};
  width: 100%;
  border-radius: ${RFValue(5)}px ${RFValue(5)}px 0 0;
  padding: 0 ${RFValue(25)}px;
  justify-content: space-between;
`;

export const Indication = styled.View`
  position: absolute;
  top: 0;
  width: ${RFValue(50)}px;
  height: ${RFValue(5)}px;
  border-radius: ${RFValue(5)}px;
  background-color: ${Theme.colors.gray_light};
  align-self: center;
  margin-top: ${RFValue(10)}px;
`;

export const TitleModal = styled.Text`
  font-size: ${Theme.fontSize.medium}px;
  font-weight: bold;
  margin: ${RFValue(20)}px 0;
  text-align: center;
`;

export const ContentOptions = styled.SafeAreaView``;

export const Options = styled.TouchableOpacity<OptionsProps>`
  border-width: ${RFValue(1)}px;
  border-color: ${({ selected }) =>
    selected ? Theme.colors.primary : Theme.colors.text_black};
  border-radius: ${RFValue(30)}px;
  padding: ${RFValue(10)}px;
  margin: ${RFValue(5)}px 0;
`;

export const TextOptions = styled.Text`
  font-size: ${Theme.fontSize.medium}px;
  font-family: Lato_400Regular;
`;

export const ContentButtonConfirm = styled.View`
  width: 100%;
  align-self: center;
  margin: ${RFValue(10)}px 0;
`;
