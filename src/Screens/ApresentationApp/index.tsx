import { Container } from "./styles";

import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";

import LottiView from "lottie-react-native";

export const ApresentationApp = () => {
  const { navigate } = useNavigation() as any;

  const getDatasUser = async () => {
    const dataUser = await AsyncStorage.getItem("@marketplace:user");
    dataUser ? navigate("tab_routes") : navigate("login");
  };

  useEffect(() => {
    setTimeout(() => {
      getDatasUser();
    }, 3000);
  }, []);

  return (
    <Container>
      <LottiView
        autoPlay
        style={{
          width: RFValue(250),
          height: RFValue(250),
        }}
        source={require("../../assets/animations/cart-apresentation.json")}
      />
    </Container>
  );
};
