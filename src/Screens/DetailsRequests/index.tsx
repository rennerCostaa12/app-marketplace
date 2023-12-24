import { useState, useEffect } from "react";
import { FlatList, Platform, ToastAndroid } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-root-toast";

import {
  Container,
  TextCodeRequest,
  ContentStatus,
  SituationStatus,
  TitleStatus,
  ContentCode,
  ContentInformation,
  ContentDetailsInformationsRequest,
  LabelTextInformation,
  TextInformation,
  TitleInformations,
  ContentBtnSendAvaliation,
  TextAvaliation,
} from "./styles";

import { Api } from "../../Configs/Api";

import { ConvertMoneyBrl } from "../../Utils/Helper/ConvertMoneyBrl";

import { Loading } from "../../Components/Loading";
import { Button } from "../../Components/Button";

import { DetailsRequestProps } from "./types";

const status = [
  {
    id: 4,
    name: "AGUARDANDO VISUALIZAÇÃO",
    checked: false,
  },
  {
    id: 3,
    name: "PREPARANDO PEDIDO",
    checked: false,
  },
  {
    id: 2,
    name: "A CAMINHO",
    checked: false,
  },
  {
    id: 1,
    name: "FINALIZADO",
    checked: false,
  },
];

export const DetailsRequests = ({ route }) => {
  const [datasRequest, setDatasRequest] = useState<DetailsRequestProps | null>(
    null
  );

  const [loading, setLoading] = useState<boolean>(false);

  const { itemId } = route.params;

  const getInformationRequest = async () => {
    try {
      setLoading(true);
      const responseInformationsRequest = await Api.get(
        `sales/findone/${itemId}`
      );

      if (responseInformationsRequest.status) {
        setDatasRequest(responseInformationsRequest.data[0]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyCode = async () => {
    await Clipboard.setStringAsync(datasRequest?.sales_id);
    if (Platform.OS === "android") {
      ToastAndroid.show("Código copiado com sucesso!", ToastAndroid.SHORT);
    }

    if (Platform.OS === "ios") {
      Toast.show("Código copiado com sucesso!", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  };

  useEffect(() => {
    getInformationRequest();
  }, []);

  useEffect(() => {
    if (datasRequest) {
      for (let x = 0; x <= status.length - 1; x++) {
        status[x].checked = true;

        if (status[x].name === datasRequest.status_name.toLocaleUpperCase()) {
          status[x].checked = true;
          break;
        }
      }
    }
  }, [datasRequest]);

  return (
    <Container>
      <Loading visible={loading} />
      <ContentCode>
        <TextCodeRequest>CÓDIGO DO PEDIDO:</TextCodeRequest>
        <TextCodeRequest>{datasRequest?.sales_id}</TextCodeRequest>
        <Button
          textButton="COPIAR CÓDIGO"
          color="#FF1493"
          textColor="#FFFFFF"
          fontSize={14}
          onPress={handleCopyCode}
        />
      </ContentCode>

      {/* <TextAcknowledgment>
        Obrigado(a) por realizar esta compra!
      </TextAcknowledgment> */}

      <ContentBtnSendAvaliation>
        <AntDesign name="star" size={RFValue(20)} color="#E6A23C" />
        <TextAvaliation>AVALIAR SEU PEDIDO</TextAvaliation>
      </ContentBtnSendAvaliation>

      <TitleInformations>Informações do pedido</TitleInformations>

      <ContentDetailsInformationsRequest>
        <ContentInformation>
          <LabelTextInformation>Forma de pagamento:</LabelTextInformation>
          <TextInformation>
            {datasRequest?.payments_name?.toLocaleUpperCase()}
          </TextInformation>
        </ContentInformation>

        <ContentInformation>
          <LabelTextInformation>Opção de entrega:</LabelTextInformation>
          <TextInformation>
            {datasRequest?.delivery_name?.toLocaleUpperCase()}
          </TextInformation>
        </ContentInformation>

        <ContentInformation>
          <LabelTextInformation>Valor Total:</LabelTextInformation>
          {datasRequest && (
            <TextInformation>
              {ConvertMoneyBrl(datasRequest?.sales_total)}
            </TextInformation>
          )}
        </ContentInformation>
      </ContentDetailsInformationsRequest>

      <TitleInformations>Status do pedido</TitleInformations>
      <FlatList
        data={status}
        renderItem={({ item }) => {
          return (
            <ContentStatus>
              <SituationStatus>
                {item.checked ? (
                  <AntDesign
                    name="checkcircle"
                    size={RFValue(20)}
                    color="#00E200"
                  />
                ) : (
                  <AntDesign
                    name="minuscircle"
                    size={RFValue(20)}
                    color="#E6A23C"
                  />
                )}
              </SituationStatus>
              <TitleStatus>{item?.name?.toLocaleUpperCase()}</TitleStatus>
            </ContentStatus>
          );
        }}
        keyExtractor={(item) => String(item.id)}
      />
    </Container>
  );
};
