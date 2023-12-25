import { Picker } from "@react-native-picker/picker";

import { Container } from "./styles";

import { ItemsProps } from "./types";

interface SelectProps {
  items: ItemsProps[];
  value: number;
  setValue: (data: number) => void;
}

export const Select = ({ value, setValue, items }: SelectProps) => {
  return (
    <Container>
      <Picker
        selectedValue={value}
        onValueChange={(itemValue: number) => {
          setValue(itemValue);
        }}
      >
        {items.map((value) => {
          return (
            <Picker.Item
              key={value.value}
              label={value.label}
              value={value.value}
            />
          );
        })}
      </Picker>
    </Container>
  );
};
