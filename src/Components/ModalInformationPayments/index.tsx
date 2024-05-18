import { RFValue } from "react-native-responsive-fontsize";
import { Modal } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-root-toast";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useEffect, useState } from "react";
import { Platform, ToastAndroid, Alert } from "react-native";

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
  ContentDatas,
  LabelText,
  Section,
  ValueText,
  TextPrice,
  ContentTotalPrices,
  Symbols,
} from "./styles";

import { ToastNotification } from "../ToastNotification";

import { Select } from "../Select";
import { ActivityIndicator } from "../ActivityIndicator";
import { Button } from "../Button";

import { Masks } from "../../Utils/Mask";

import { Api } from "../../Configs/Api";

import { useAuthContext } from "../../Contexts/Auth";
import { useItemsSales } from "../../Contexts/ItemsSales";

import { TypeNotification } from "../ToastNotification/types";
import { MethodsPaymentsProps } from "../ModalMethodsPayments/types";
import { FormDeliveryProps } from "./types";
import { ItemsProps } from "../Select/types";
import { ConvertMoneyBrl } from "../../Utils/Helper/ConvertMoneyBrl";

import { Theme } from "../../Theme";

export type TypesPayments = "pix" | "money" | "credit-card";

interface ModalInformationPaymentsProps {
  visibleModal: boolean;
  setVisibleModal: (data: boolean) => void;
  typePayments: MethodsPaymentsProps;
  totalPrices: number;
  setShowModal: (data: boolean) => void;
}

export const ModalInformationPayments = ({
  typePayments,
  setVisibleModal,
  visibleModal,
  totalPrices,
  setShowModal,
}: ModalInformationPaymentsProps) => {
  const { goBack } = useNavigation();

  const [value, setValue] = useState<string>(null);
  const [optionsDeliverySelected, setOptionDeliverySelected] =
    useState<number>(1);

  const [optionsDelivery, setOptionsDelivery] = useState<ItemsProps[]>([]);

  const [visibleNotification, setVisibleNotification] =
    useState<boolean>(false);
  const [titleNotification, setTitleNotification] = useState<string>("");
  const [typeNotification, setTypeNotification] =
    useState<TypeNotification>("success");

  const [loading, setLoading] = useState<boolean>(false);

  const { dataUser } = useAuthContext();
  const { itemsSales, setItemsSales } = useItemsSales();

  const switchMessagesFeedback = (typeDelivery: number) => {
    switch (typeDelivery) {
      case 1:
        return "Logo, logo enviaremos uma notificação avisando que o seu pedido está pronto.";
      case 2:
        return "Enviaremos uma notificação para você quando o pedido estiver à caminho.";
      default:
        return undefined;
    }
  };

  const getOptionsDelivery = async () => {
    try {
      const responseOptionsDelivery = await Api.get("form-delivery/find-all");

      if (responseOptionsDelivery.status) {
        const listOptionsDelivery: FormDeliveryProps[] =
          responseOptionsDelivery.data;

        const listOptionsDeliveryFormated = listOptionsDelivery.map((value) => {
          return {
            value: value.id,
            label: value.name,
          };
        });

        setOptionsDelivery(listOptionsDeliveryFormated);
      }
    } catch (error) {
      setVisibleModal(false);
      setTypeNotification("error");
      setTitleNotification("Erro ao pegar tipos de entregas");
    }
  };

  const switchLayoutModal = () => {
    if (typePayments) {
      switch (typePayments.type) {
        case "pix":
          const handleCopyKeyPix = async () => {
            await Clipboard.setStringAsync(process.env.EXPO_PUBLIC_PIX_KEY);
            if (Platform.OS === "android") {
              ToastAndroid.show(
                "Chave pix copiado com sucesso!",
                ToastAndroid.SHORT
              );
            }

            if (Platform.OS === "ios") {
              Toast.show("Chave pix copiado com sucesso!", {
                duration: Toast.durations.LONG,
                position: Toast.positions.BOTTOM,
                shadow: true,
                animation: true,
                hideOnPress: true,
                delay: 0,
              });
            }
          };

          return (
            <>
              <TitleSection>Chave do pix</TitleSection>
              <ContentKeyPix>
                <InputText
                  editable={false}
                  value={process.env.EXPO_PUBLIC_PIX_KEY}
                />
                <ButtonCopyKeyPix onPress={handleCopyKeyPix}>
                  <Feather
                    name="copy"
                    size={RFValue(15)}
                    color={Theme.colors.text_white}
                  />
                </ButtonCopyKeyPix>
              </ContentKeyPix>
            </>
          );

        case "money":
          return (
            <>
              <TitleSection>Troco pra quanto?</TitleSection>
              <ContentMoney>
                <InputText
                  style={{
                    width: "100%",
                  }}
                  defaultValue="0,00"
                  keyboardType="numeric"
                  value={value}
                  onChangeText={(money) => setValue(Masks.MaskMoney(money))}
                />
              </ContentMoney>
            </>
          );

        default:
          return undefined;
      }
    }
  };

  const handleRedirectHome = () => {
    setValue("0,00");
    setOptionDeliverySelected(1);
    setVisibleModal(false);
    goBack();
  };

  const handlePlaceOrder = async () => {
    const totalPricesProducts =
      optionsDeliverySelected === 2 ? totalPrices + 4 : totalPrices;

    if (Masks.RemoveMaskMoney(value) < totalPricesProducts) {
      setVisibleNotification(true);
      setTypeNotification("warning");
      setTitleNotification(
        "O valor do troco não pode ser maior que o valor total dos produto(s)"
      );
      return;
    }

    try {
      setLoading(true);
      const responsePlaceOrder = await Api.post("sales/create-sale", {
        client: dataUser.id,
        status: 4,
        delivery: optionsDeliverySelected,
        payments: typePayments.id,
        list_products: JSON.stringify(itemsSales),
        total: optionsDeliverySelected === 2 ? totalPrices + 4 : totalPrices,
        change_money: Masks.RemoveMaskMoney(value),
        installments: null,
      });
      if (responsePlaceOrder.status) {
        Alert.alert(
          "Pedido realizado com sucesso",
          switchMessagesFeedback(optionsDeliverySelected),
          [{ text: "Ok", onPress: () => handleRedirectHome() }]
        );
        setItemsSales([]);
        await AsyncStorage.removeItem("@marketplace:items_sales");
        setShowModal(false);
      }
    } catch (error) {
      setVisibleModal(false);
      setTypeNotification("error");
      setTitleNotification("Erro ao realizar pedido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOptionsDelivery();
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visibleModal}
      onRequestClose={() => {
        setVisibleModal(false);
      }}
    >
      <Container>
        <ToastNotification
          visible={visibleNotification}
          setVisible={setVisibleNotification}
          title={titleNotification}
          type={typeNotification}
          autoHide
          duration={6000}
        />
        <Content>
          {switchLayoutModal()}
          <Section>
            <TitleSection>Como você quer receber o pedido?</TitleSection>
            <Select
              items={optionsDelivery}
              setValue={setOptionDeliverySelected}
              value={optionsDeliverySelected}
            />
          </Section>
          {optionsDeliverySelected === 2 && (
            <Section>
              <TitleSection>Local de entrega</TitleSection>
              <ContainerAddress>
                <ContentDatas>
                  <LabelText>Endereço: </LabelText>
                  <ValueText>{dataUser?.address}</ValueText>
                </ContentDatas>
                <ContentDatas>
                  <LabelText>Número: </LabelText>
                  <ValueText>{dataUser?.number_address}</ValueText>
                </ContentDatas>
                <ContentDatas>
                  <LabelText>Complemento: </LabelText>
                  <ValueText>{dataUser?.complement_address}</ValueText>
                </ContentDatas>
              </ContainerAddress>
            </Section>
          )}

          <ContentTotalPrices>
            <ContentDatas>
              <TextPrice>{ConvertMoneyBrl(totalPrices)}</TextPrice>
              {optionsDeliverySelected === 2 && (
                <>
                  <Symbols>+</Symbols>
                  <TextPrice>{ConvertMoneyBrl(Number(4))}</TextPrice>
                  <Symbols>=</Symbols>
                  <TextPrice
                    style={{
                      color: Theme.colors.vivid_green,
                    }}
                  >
                    {ConvertMoneyBrl(totalPrices + 4)}
                  </TextPrice>
                </>
              )}
            </ContentDatas>
          </ContentTotalPrices>

          <ActivityIndicator
            size="large"
            visible={loading}
            color={Theme.colors.primary}
          />

          {!loading && (
            <ContentBtnCloseModal>
              <Button
                onPress={handlePlaceOrder}
                textButton="Efetuar pedido"
                color={Theme.colors.primary}
                textColor={Theme.colors.text_white}
                fontSize={RFValue(13)}
              />
              <Button
                onPress={() => setVisibleModal(false)}
                textButton="Cancelar"
                color={Theme.colors.text_white}
                textColor={Theme.colors.primary}
                fontSize={RFValue(13)}
              />
            </ContentBtnCloseModal>
          )}
        </Content>
      </Container>
    </Modal>
  );
};
