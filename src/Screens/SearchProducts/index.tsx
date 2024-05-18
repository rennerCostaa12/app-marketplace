import { useNavigation } from "@react-navigation/native";
import { AntDesign, Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RFValue } from "react-native-responsive-fontsize";
import { useEffect, useState } from "react";
import { FlatList, View, Keyboard } from "react-native";

import {
  Container,
  ContentHeader,
  ContentIcon,
  ContentItems,
  ContentResearches,
  TextResearche,
  ContainerResearches,
  Body,
  ContentTextResearche,
  ContentIconClearText,
  ContentInputSearch,
} from "./styles";

import { InputSearch } from "../../Components/InputSearch";
import { CardItem } from "../../Components/CardItem";
import { ActivityIndicator } from "../../Components/ActivityIndicator";
import { IconsBadge } from "../../Components/IconsBadge";
import { ToastNotification } from "../../Components/ToastNotification";

import { useItemsSales } from "../../Contexts/ItemsSales";
import { ProductsProps } from "../../Types/products";

import { Api } from "../../Configs/Api";
import { TypeNotification } from "../../Components/ToastNotification/types";

import { Theme } from "../../Theme";

let configPagination;

interface ItemsRecentsResearchesProps {
  nameResearche: string;
}

export const SearchProducts = () => {
  const [nameProduct, setNameProduct] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [products, setProducts] = useState<ProductsProps[]>([]);
  const [showListRecentResearches, setShowListRecentResearches] =
    useState<boolean>(false);

  // const [showModalRecordingVoice, setShowModalRecordingVoice] =
  //   useState<boolean>(false);

  const [listRecentsResearches, setListRecentsResearches] = useState<string[]>(
    []
  );

  const [visibleNotification, setVisibleNotification] =
    useState<boolean>(false);
  const [titleNotification, setTitleNotification] = useState<string>("");
  const [typeNotification, setTypeNotification] =
    useState<TypeNotification>("success");

  const { itemsSales } = useItemsSales();

  const { goBack, navigate } = useNavigation() as any;

  const handleSearch = async (
    valueSearch: string | null = null,
    usingInput: boolean = false
  ) => {
    try {
      if (
        (nameProduct.length <= 0 && usingInput) ||
        (!valueSearch && !usingInput)
      ) {
        return;
      }

      setLoading(true);
      const responseSearchProducts = await Api.get(
        `products/searchProducts/${valueSearch ? valueSearch : nameProduct}`
      );

      if (responseSearchProducts.status) {
        configPagination = responseSearchProducts.data.meta;
        setProducts(responseSearchProducts.data.items);

        const isExistsNameList = listRecentsResearches.includes(nameProduct);

        if (!isExistsNameList && nameProduct.length > 0) {
          setListRecentsResearches([...listRecentsResearches, nameProduct]);
          await AsyncStorage.setItem(
            "@marketplace:recents_researches",
            JSON.stringify([...listRecentsResearches, nameProduct])
          );
        }
      }
    } catch (error) {
      console.error(error);
      setVisibleNotification(true);
      setTypeNotification("error");
      setTitleNotification("Erro ao buscar dados");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchLazyLoading = async () => {
    if (
      configPagination !== undefined &&
      products.length >= configPagination.totalItems
    ) {
      return null;
    }
    try {
      setLoading(true);
      const responseSearchProducts = await Api.get(
        `products/searchProducts/${nameProduct}?page=${page}`
      );

      if (responseSearchProducts.status) {
        configPagination = responseSearchProducts.data.meta;
        setProducts([...products, ...responseSearchProducts.data.items]);
        setPage(page + 1);
      }
    } catch (error) {
      console.error(error);
      setVisibleNotification(true);
      setTypeNotification("error");
      setTitleNotification("Erro ao buscar dados");
    } finally {
      setLoading(false);
    }
  };

  // const handleOpenSpokenSearch = async () => {
  //   try {
  //     await Audio.requestPermissionsAsync();
  //     await Audio.setAudioModeAsync({
  //       allowsRecordingIOS: true,
  //       playsInSilentModeIOS: true,
  //     });
  //     const { granted } = await Audio.getPermissionsAsync();

  //     if (granted) {
  //       setShowModalRecordingVoice(true);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const ItemsRecentsResearches = ({
    nameResearche,
  }: ItemsRecentsResearchesProps) => {
    return (
      <ContentResearches
        onPress={() => {
          handleSearch(nameResearche);
          setShowListRecentResearches(false);
          Keyboard.dismiss();
        }}
      >
        <ContentTextResearche>
          <Entypo
            name="back-in-time"
            size={RFValue(24)}
            color={Theme.colors.text_black}
          />
          <TextResearche>{nameResearche}</TextResearche>
        </ContentTextResearche>
        <AntDesign
          name="arrowright"
          size={RFValue(24)}
          color={Theme.colors.text_black}
        />
      </ContentResearches>
    );
  };

  useEffect(() => {
    const getRecentsResearchs = async () => {
      const responseRecentsResearchs = await AsyncStorage.getItem(
        "@marketplace:recents_researches"
      );

      if (responseRecentsResearchs) {
        setListRecentsResearches(JSON.parse(responseRecentsResearchs));
      }
    };

    getRecentsResearchs();
  }, []);

  Keyboard.addListener("keyboardDidHide", () =>
    setShowListRecentResearches(false)
  );

  Keyboard.addListener("keyboardDidShow", () =>
    setShowListRecentResearches(true)
  );

  return (
    <Container>
      <ToastNotification
        type={typeNotification}
        title={titleNotification}
        visible={visibleNotification}
        setVisible={setVisibleNotification}
        autoHide
        duration={2000}
      />
      <ContentHeader>
        <AntDesign
          name="arrowleft"
          size={RFValue(24)}
          color={Theme.colors.text_black}
          onPress={() => goBack()}
        />

        <ContentInputSearch>
          <InputSearch
            autoFocus={true}
            placeholder="Pesquisa"
            value={nameProduct}
            onChangeText={(text) => setNameProduct(text)}
            onSubmitEditing={() => handleSearch(null, true)}
          />
          {nameProduct.length > 0 && (
            <ContentIconClearText onPress={() => setNameProduct("")}>
              <AntDesign
                name="close"
                size={RFValue(15)}
                color={Theme.colors.text_black}
              />
            </ContentIconClearText>
          )}
        </ContentInputSearch>

        {/* 
        <ContentIcon onPress={handleOpenSpokenSearch}>
          <FontAwesome5 name="microphone" size={RFValue(24)} color={Theme.colors.text_black} />
        </ContentIcon> */}

        <ContentIcon onPress={() => navigate("sales")}>
          <IconsBadge
            icon={
              <AntDesign
                name="shoppingcart"
                size={RFValue(20)}
                color={Theme.colors.text_black}
              />
            }
            quantity={itemsSales.length}
          />
        </ContentIcon>
      </ContentHeader>
      <Body>
        {showListRecentResearches ? (
          <ContainerResearches>
            {listRecentsResearches.map((value, index) => {
              return (
                <ItemsRecentsResearches key={index} nameResearche={value} />
              );
            })}
          </ContainerResearches>
        ) : (
          <ContentItems>
            <FlatList
              data={products}
              renderItem={({ item }) => {
                return (
                  <View style={{ margin: RFValue(3) }}>
                    <CardItem
                      key={item.id}
                      id={item.id}
                      typeItem={item.categories.name}
                      nameItem={item.name}
                      priceItem={item.price}
                      urlImg={item.img_product}
                    />
                  </View>
                );
              }}
              horizontal={false}
              numColumns={2}
              keyExtractor={(item) => String(item.id)}
              onEndReached={handleSearchLazyLoading}
              onEndReachedThreshold={0.1}
              ListFooterComponent={
                <ActivityIndicator
                  color={Theme.colors.primary}
                  size="large"
                  visible={loading}
                />
              }
              ItemSeparatorComponent={() => {
                return (
                  <View
                    style={{
                      width: "100%",
                      borderWidth: 2,
                      borderColor: Theme.colors.text_black,
                    }}
                  ></View>
                );
              }}
            />
          </ContentItems>
        )}
      </Body>
      {/* <ModalRecordingVoice
        transparent
        visible={showModalRecordingVoice}
        setVisible={setShowModalRecordingVoice}
      /> */}
    </Container>
  );
};
