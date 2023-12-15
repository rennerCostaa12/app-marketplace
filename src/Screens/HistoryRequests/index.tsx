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
  HeaderCards,
  TitleCardRequest,
} from "./styles";

import { useState, useCallback } from "react";
import { FlatList } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

import { Api } from "../../Configs/Api";

import { ConvertMoneyBrl } from "../../Utils/Helper/ConvertMoneyBrl";

import { ProductsRequestsProps } from "./types";

import { useAuthContext } from "../../Contexts/Auth";

import { Collapse } from "../../Components/Collapse";
import { Loading } from "../../Components/Loading";

interface ProductRenderProps {
  data: ProductsRequestsProps;
}

const ProductRender = ({ data }: ProductRenderProps) => {
  const productsFormated = JSON.parse(data.sales_list_products);

  return (
    <ContentCards>
      <Collapse
        titleHeader={`${new Date(
          data.sales_created_at
        ).toLocaleString()} - ${ConvertMoneyBrl(data.sales_total)}`}
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
      <Loading visible={loading} />
      <ContainerCards>
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductRender data={item} />}
          keyExtractor={(item) => item.sales_id}
        />
      </ContainerCards>
    </Container>
  );
};
