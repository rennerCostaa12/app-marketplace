import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { Theme } from "../../Theme";

export const Container = styled.View`
  border-width: ${RFValue(0.5)}px;
  border-radius: ${RFValue(30)}px;
  border-color: ${Theme.colors.gray_normal};
`;
