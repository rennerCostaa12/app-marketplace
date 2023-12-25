import { useState, useCallback } from "react";
import { FlatList } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import {
  Container,
  CardRequests,
  ContainerCards,
  ContentCards,
  PriceRequests,
  TitleRequests,
  ImgRequests,
  ContentDescriptionRequests,
  QuantityRequests,
  ContentImgAndDescriptionRequests,
} from "./styles";

import { Collapse } from "../../Components/Collapse";
import { ActivityIndicator } from "../../Components/ActivityIndicator";
import { Button } from "../../Components/Button";

import { Api } from "../../Configs/Api";

import { ConvertMoneyBrl } from "../../Utils/Helper/ConvertMoneyBrl";
import { SwitchColorStatus } from "../../Utils/Helper/SwitchColorStatus";

import { ProductsRequestsProps } from "./types";

import { useAuthContext } from "../../Contexts/Auth";

import { Theme } from "../../Theme";

interface ProductRenderProps {
  data: ProductsRequestsProps;
}

const ProductRender = ({ data }: ProductRenderProps) => {
  const productsFormated = JSON.parse(data.sales_list_products);

  const { navigate } = useNavigation() as any;

  return (
    <ContentCards>
      <Collapse
        titleHeader={`${new Date(
          data.sales_created_at
        ).toLocaleString()} - ${ConvertMoneyBrl(data.sales_total)}`}
        status={data.status_name}
        colorStatus={SwitchColorStatus(data.status_name)}
      >
        {productsFormated.map((value) => {
          return (
            <CardRequests key={value.id}>
              <ContentImgAndDescriptionRequests>
                <ImgRequests source={{ uri: value.urlImg }} />
                <ContentDescriptionRequests>
                  <TitleRequests>{value.nameItem}</TitleRequests>
                  <PriceRequests>
                    {ConvertMoneyBrl(Number(value.priceItem))}
                  </PriceRequests>
                </ContentDescriptionRequests>
              </ContentImgAndDescriptionRequests>
              <QuantityRequests>{value.quantity}X</QuantityRequests>
            </CardRequests>
          );
        })}
        <Button
          textButton="VER DETALHES"
          color={Theme.colors.primary}
          textColor={Theme.colors.text_white}
          onPress={() =>
            navigate("details_requests", {
              itemId: data.sales_id,
            })
          }
        />
      </Collapse>
    </ContentCards>
  );
};

export const HistoryRequests = () => {
  const [products, setProducts] = useState<ProductsRequestsProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { dataUser } = useAuthContext();

  const responseHistoryRequests = async () => {
    try {
      setLoading(true);
      const responseProducts = await Api.get(
        `sales/findbyclient/${dataUser.id}`
      );

      if (responseProducts.status) {
        setProducts(responseProducts.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      responseHistoryRequests();
    }, [])
  );

  return (
    <Container>
      <ActivityIndicator
        size="large"
        visible={loading}
        color={Theme.colors.primary}
      />
      {!loading && (
        <ContainerCards>
          <FlatList
            data={products}
            renderItem={({ item }) => <ProductRender data={item} />}
            keyExtractor={(item) => item.sales_id}
          />
        </ContainerCards>
      )}
    </Container>
  );
};
