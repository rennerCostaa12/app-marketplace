import { Container, Quantity, Button } from "./styles";

import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

interface QuantityProductProps {
  quantity: number;
  setQuantity: (data: number) => void;
  colorButtons: string;
}

export const QuantityProduct = ({
  quantity,
  setQuantity,
  colorButtons,
}: QuantityProductProps) => {
  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleRemoveQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <Container>
      <Button onPress={handleRemoveQuantity}>
        <Ionicons name="remove" size={RFValue(24)} color={colorButtons} />
      </Button>
      <Quantity>{quantity}</Quantity>
      <Button onPress={handleAddQuantity}>
        <Ionicons name="add" size={RFValue(24)} color={colorButtons} />
      </Button>
    </Container>
  );
};
