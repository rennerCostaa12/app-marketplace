import { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  View,
  TouchableOpacity,
} from "react-native";

import {
  ContentModal,
  Indication,
  TitleModal,
  ContentOptions,
  Options,
  TextOptions,
  ButtonConfirm,
  ContentButtonConfirm,
  TextButtonConfirm,
} from "./styles";

import { ModalInformationPayments } from "../ModalInformationPayments";

import { Api } from "../../Configs/Api";

import { MethodsPaymentsProps } from "./types";
import { TypesPayments } from "../ModalInformationPayments";

interface ModalMethodsPaymentsProps {
  showModal: boolean;
  setShowModal: (data: boolean) => void;
}

const { height } = Dimensions.get("window");

const valueDefaultModal = {
  opacity: new Animated.Value(0),
  container: new Animated.Value(height),
  modal: new Animated.Value(height),
};

export const ModalMethodsPayments = ({
  showModal,
  setShowModal,
}: ModalMethodsPaymentsProps) => {
  const [formsPayments, setFormsPayments] = useState<MethodsPaymentsProps[]>(
    []
  );
  const [formsPaymentsSelected, setFormsPaymentsSelected] =
    useState<MethodsPaymentsProps>();

  const [visibleModalInformationPayments, setVisibleModalInformationsPayments] =
    useState<boolean>(false);

  const getFormsPayments = async () => {
    try {
      const responseFormsPayments = await Api.get("forms-payments/find-all");
      if (responseFormsPayments.status) {
        setFormsPayments(responseFormsPayments.data);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao pegar as formas de pagamentos");
    }
  };

  const handleConfirmPayment = () => {
    setVisibleModalInformationsPayments(true);
  };

  const openModal = () => {
    Animated.sequence([
      Animated.timing(valueDefaultModal.container, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(valueDefaultModal.opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(valueDefaultModal.modal, {
        toValue: 0,
        bounciness: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.sequence([
      Animated.timing(valueDefaultModal.modal, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(valueDefaultModal.opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(valueDefaultModal.container, {
        toValue: height,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    getFormsPayments();
  }, []);

  useEffect(() => {
    showModal ? openModal() : closeModal();
  }, [showModal]);

  return (
    <Animated.View
      style={[
        {
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          position: "absolute",
          zIndex: 100,
        },
        {
          opacity: valueDefaultModal.opacity,
          transform: [{ translateY: valueDefaultModal.container }],
        },
      ]}
    >
      <TouchableOpacity
        style={{
          flex: 1,
        }}
        onPress={() => setShowModal(false)}
      ></TouchableOpacity>
      <ContentModal>
        <Indication />
        <View>
          <TitleModal>Formas de pagamento</TitleModal>
          <ContentOptions>
            <FlatList
              data={formsPayments}
              renderItem={({ item }) => {
                return (
                  <Options
                    selected={formsPaymentsSelected?.id === item.id}
                    onPress={() => setFormsPaymentsSelected(item)}
                  >
                    <TextOptions style={{ fontFamily: "Lato_400Regular" }}>
                      {item.name}
                    </TextOptions>
                  </Options>
                );
              }}
              keyExtractor={(item) => String(item.id)}
            />
          </ContentOptions>
        </View>
        <ContentButtonConfirm>
          <ButtonConfirm
            onPress={handleConfirmPayment}
            disabled={!formsPaymentsSelected}
          >
            <TextButtonConfirm>Escolher</TextButtonConfirm>
          </ButtonConfirm>
        </ContentButtonConfirm>
      </ContentModal>
      <ModalInformationPayments
        visibleModal={visibleModalInformationPayments}
        setVisibleModal={setVisibleModalInformationsPayments}
        typePayments={formsPaymentsSelected?.type as TypesPayments}
      />
    </Animated.View>
  );
};
