import { Container } from "./styles";

import LottiView from "lottie-react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { Modal } from "react-native";

interface LoadingProps {
  visible: boolean;
}

export const Loading = ({ visible }: LoadingProps) => {
  return (
    <Modal visible={visible} transparent>
      <Container>
        <LottiView
          autoPlay
          style={{
            width: RFValue(300),
            height: RFValue(300),
          }}
          source={require("../../assets/animations/loading-cart.json")}
        />
      </Container>
    </Modal>
  );
};
