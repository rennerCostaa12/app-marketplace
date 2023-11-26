import { MaterialIcons } from "@expo/vector-icons";

import { View, FlatList } from "react-native";

import {
  Container,
  ContentInput,
  ContainerInput,
  TextInput,
  ContentItems,
  Items,
  TextItem,
  ContainerItems,
} from "./styles";

import { OptionsProps } from "./types";
import { RFValue } from "react-native-responsive-fontsize";
import { useState } from "react";

interface SelectDropdownProps {
  options: OptionsProps[];
  value: OptionsProps;
  setValue: (data: OptionsProps) => void;
  labelDropdown?: string;
}

export const SelectDropdown = ({
  options,
  setValue,
  value,
  labelDropdown,
}: SelectDropdownProps) => {
  const [showList, setShowList] = useState<boolean>(false);

  const handleSelectItem = (itemSelected: OptionsProps) => {
    setValue(itemSelected);
    setShowList(false);
  };

  return (
    <Container>
      <ContainerInput>
        <ContentInput onPress={() => setShowList(!showList)}>
          <TextInput>{value ? value.label : labelDropdown}</TextInput>
          <MaterialIcons
            name={showList ? "arrow-drop-up" : "arrow-drop-down"}
            size={RFValue(20)}
            color="black"
          />
        </ContentInput>
        {showList && (
          <ContainerItems>
            <FlatList
              data={options}
              renderItem={({ item }) => {
                return (
                  <Items onPress={() => handleSelectItem(item)}>
                    <TextItem>{item.label}</TextItem>
                  </Items>
                );
              }}
              keyExtractor={(item) => String(item.value)}
            />
            {/* {options.map((value, index) => {
                return (
                  <Items key={index} onPress={() => handleSelectItem(value)}>
                    <TextItem>{value.label}</TextItem>
                  </Items>
                );
              })} */}
          </ContainerItems>
        )}
      </ContainerInput>
    </Container>
  );
};
