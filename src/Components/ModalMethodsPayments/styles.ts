import styled from "styled-components/native";
import { TouchableWithoutFeedback } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface OptionsProps {
  selected: boolean;
}

interface ButtonConfirmProps {
  disabled: boolean;
}

export const Test = styled(TouchableWithoutFeedback)``;

export const ContentModal = styled.View`
  bottom: 0;
  position: absolute;
  height: 50%;
  background-color: #ffffff;
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
  background-color: #ccc;
  align-self: center;
  margin-top: ${RFValue(10)}px;
`;

export const TitleModal = styled.Text`
  font-size: ${RFValue(16)}px;
  font-weight: bold;
  margin: ${RFValue(20)}px 0;
  text-align: center;
`;

export const ContentOptions = styled.SafeAreaView``;

export const Options = styled.TouchableOpacity<OptionsProps>`
  border-width: ${RFValue(1)}px;
  border-color: ${({ selected }) => (selected ? "#FF1493" : "#000000")};
  border-radius: ${RFValue(5)}px;
  padding: ${RFValue(10)}px;
  margin: ${RFValue(5)}px 0;
`;

export const TextOptions = styled.Text`
  font-size: ${RFValue(16)}px;
`;

export const ContentButtonConfirm = styled.View`
  width: 100%;
  align-self: center;
  margin: ${RFValue(10)}px 0;
`;

export const ButtonConfirm = styled.TouchableOpacity<ButtonConfirmProps>`
  width: 100%;
  background: ${({ disabled }) => (disabled ? "#ccc" : "#FF1493")};
  padding: ${RFValue(10)}px;
  border-radius: ${RFValue(5)}px;
`;

export const TextButtonConfirm = styled.Text`
  text-align: center;
  font-size: ${RFValue(16)}px;
  color: #ffffff;
`;
