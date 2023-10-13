import { Container, Text } from "./styles";

import LottiView from "lottie-react-native";
import { RFValue } from "react-native-responsive-fontsize";

interface CartEmptyProps {
  text?: string;
}

export const CartEmpty = ({ text }: CartEmptyProps) => {
  return (
    <Container>
      <LottiView
        source={require("../../assets/animations/product-notfound.json")}
        style={{
          width: RFValue(250),
          height: RFValue(250),
        }}
        autoPlay
        loop
      />
      {text ? (
        <Text style={{ fontFamily: "Lato_400Regular" }}>{text}</Text>
      ) : null}
    </Container>
  );
};
