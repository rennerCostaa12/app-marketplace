import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

export const Container = styled.View`
  flex: 1;
  padding: 0 ${RFValue(10)}px;
`;

export const ContentCode = styled.View`
  gap: ${RFValue(10)}px;
  margin: ${RFValue(20)}px 0;
  align-items: center;
  justify-content: center;
`;

export const TextCodeRequest = styled.Text`
  font-size: ${Theme.fontSize.medium}px;
  font-family: Lato_700Bold;
  text-align: center;
`;

export const TextAcknowledgment = styled.Text`
  font-size: ${Theme.fontSize.small}px;
  font-family: Lato_400Regular;
  text-align: center;
`;

export const TitleInformations = styled.Text`
  font-size: ${Theme.fontSize.small}px;
  font-family: Lato_700Bold;
  text-align: center;
  margin: ${RFValue(10)}px 0;
`;

export const ContentDetailsInformationsRequest = styled.View`
  border-width: ${RFValue(1)}px;
  border-color: #656993;
  margin: ${RFValue(10)}px 0;
  gap: ${RFValue(10)}px;
  padding: ${RFValue(10)}px;
  border-radius: ${RFValue(5)}px;
`;

export const ContentInformation = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(10)}px;
`;

export const LabelTextInformation = styled.Text`
  font-size: ${Theme.fontSize.tiny}px;
  font-family: Lato_700Bold;
`;

export const TextInformation = styled.Text`
  font-size: ${Theme.fontSize.tiny}px;
  font-family: Lato_400Regular;
`;

export const ContentStatus = styled.View`
  background-color: ${Theme.colors.background_color};
  margin: ${RFValue(5)}px 0;
  padding: ${RFValue(10)}px;
  border-radius: ${RFValue(50)}px;
  elevation: 3;
  flex-direction: row;
  align-items: center;
  gap: ${RFValue(15)}px;
`;

export const TitleStatus = styled.Text`
  font-size: ${Theme.fontSize.tiny}px;
  font-family: Lato_400Regular;
`;

export const SituationStatus = styled.View``;

export const ContentBtnSendAvaliation = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${Theme.colors.background_color};
  align-self: center;
  padding: ${RFValue(10)}px;
  gap: ${RFValue(10)}px;
  margin: ${RFValue(5)}px 0;
  border-radius: ${RFValue(5)}px;
  elevation: 10;
`;

export const TextAvaliation = styled.Text`
  font-size: ${Theme.fontSize.tiny}px;
  font-family: Lato_700Bold;
`;
