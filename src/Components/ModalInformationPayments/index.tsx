import { RFValue } from "react-native-responsive-fontsize";
import { Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

import { useState } from "react";

import {
  Container,
  TitleSection,
  Content,
  ContentKeyPix,
  InputText,
  ButtonCopyKeyPix,
  ContentBtnCloseModal,
  ContentMoney,
  ContainerAddress,
  ContentAddress,
  LabelText,
  Section,
  ValueText,
} from "./styles";

import { Select } from "../Select";
import { Button } from "../Button";
import { Masks } from "../../Utils/Mask";

import { useAuthContext } from "../../Contexts/Auth";

export type TypesPayments = "pix" | "money" | "credit-card";

interface ModalInformationPaymentsProps {
  visibleModal: boolean;
  setVisibleModal: (data: boolean) => void;
  typePayments: TypesPayments;
}

const options = [
  {
    value: 1,
    label: "Retirada",
  },
  {
    value: 2,
    label: "Entrega",
  },
];

export const ModalInformationPayments = ({
  typePayments,
  setVisibleModal,
  visibleModal,
}: ModalInformationPaymentsProps) => {
  const [value, setValue] = useState<string>(null);
  const [optionsDeliverySelected, setOptionDeliverySelected] =
    useState<number>(1);

  const { dataUser } = useAuthContext();

  const switchLayoutModal = () => {
    switch (typePayments) {
      case "pix":
        const handleCopyKeyPix = async () => {
          await Clipboard.setStringAsync(process.env.EXPO_PUBLIC_PIX_KEY);
        };

        return (
          <>
            <TitleSection
              style={{
                fontFamily: "Lato_700Bold",
              }}
            >
              Chave do pix
            </TitleSection>
            <ContentKeyPix>
              <InputText
                editable={false}
                value={process.env.EXPO_PUBLIC_PIX_KEY}
              />
              <ButtonCopyKeyPix onPress={handleCopyKeyPix}>
                <Feather name="copy" size={RFValue(20)} color="#ffffff" />
              </ButtonCopyKeyPix>
            </ContentKeyPix>
          </>
        );

      case "money":
        return (
          <>
            <TitleSection
              style={{
                fontFamily: "Lato_700Bold",
              }}
            >
              Troco pra quanto?
            </TitleSection>
            <ContentMoney>
              <InputText
                style={{
                  width: "100%",
                }}
                defaultValue="0,00"
                value={value}
                onChangeText={(money) => setValue(Masks.MaskMoney(money))}
              />
            </ContentMoney>
          </>
        );

      default:
        return undefined;
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visibleModal}
      onRequestClose={() => {
        setVisibleModal(false);
      }}
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "red",
      }}
    >
      <Container>
        <Content>
          {switchLayoutModal()}
          <Section>
            <TitleSection>Como você quer receber o pedido?</TitleSection>
            <Select
              items={options}
              setValue={setOptionDeliverySelected}
              value={optionsDeliverySelected}
            />
          </Section>
          {optionsDeliverySelected === 2 && (
            <Section>
              <TitleSection>Local de entrega</TitleSection>
              <ContainerAddress>
                <ContentAddress>
                  <LabelText
                    style={{
                      fontFamily: "Lato_700Bold",
                    }}
                  >
                    Endereço:{" "}
                  </LabelText>
                  <ValueText
                    style={{
                      fontFamily: "Lato_400Regular",
                    }}
                  >
                    {dataUser?.address}
                  </ValueText>
                </ContentAddress>
                <ContentAddress>
                  <LabelText
                    style={{
                      fontFamily: "Lato_700Bold",
                    }}
                  >
                    Complemento:{" "}
                  </LabelText>
                  <ValueText
                    style={{
                      fontFamily: "Lato_400Regular",
                    }}
                  >
                    {dataUser?.complement_address}
                  </ValueText>
                </ContentAddress>
              </ContainerAddress>
            </Section>
          )}
          <ContentBtnCloseModal>
            <Button
              onPress={() => setVisibleModal(false)}
              textButton="Efetuar pedido"
              color="#ff1493"
              textColor="#ffffff"
              fontSize={13}
            />
            <Button
              onPress={() => setVisibleModal(false)}
              textButton="Cancelar"
              color="#ffffff"
              textColor="#ff1493"
              fontSize={13}
            />
          </ContentBtnCloseModal>
        </Content>
      </Container>
    </Modal>
  );
};
