import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";

import { Container, ContentButton, ContainerInputs } from "./styles";

import { ToastNotification } from "../../Components/ToastNotification";
import { Input } from "../../Components/Input";
import { Loading } from "../../Components/Loading";
import { Button } from "../../Components/Button";

import { DatasRegisterUser } from "../Register/types";
import { useAuthContext } from "../../Contexts/Auth";

import { Masks } from "../../Utils/Mask";

import { Api } from "../../Configs/Api";
import { TypeNotification } from "../../Components/ToastNotification/types";

import { Theme } from "../../Theme";

const SchemaRegister = yup.object({
  username: yup.string().required("Campo nome de usuário é obrigatório"),
  phone: yup
    .string()
    .min(14, "Número de telefone inválido")
    .required("O campo telefone é obrigatório"),
  address: yup.string().required("Campo endereço é obrigatório"),
  number_address: yup
    .number()
    .required("Campo número de endereço é obrigatório"),
  complement_address: yup.string(),
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Este campo é do tipo email")
    .required("Campo email é obrigatório"),
});

export const ConfigUser = () => {
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(SchemaRegister),
  });

  const { dataUser, setDataUser, signOut } = useAuthContext();

  const [visibleNotification, setVisibleNotification] =
    useState<boolean>(false);
  const [titleNotification, setTitleNotification] = useState<string>("");
  const [typeNotification, setTypeNotification] =
    useState<TypeNotification>("success");

  // const [imgUser, setImgUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // const [startCamera, setStartCamera] = useState<boolean>(false);

  const { navigate } = useNavigation() as any;

  // const [permission] = CameraExpo.useCameraPermissions();

  // const handleGetPermissionsCamera = async () => {
  //   try {
  //     if (!permission.granted) {
  //       let { status } = await CameraExpo.requestCameraPermissionsAsync();

  //       if (status !== "granted") {
  //         alert("Não tem permissão");
  //       }
  //     } else {
  //       setStartCamera(true);
  //       setShowModal(false);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleOpenGallery = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     setImgUser(result.assets[0].uri);
  //     setShowModal(false);
  //   }
  // };

  const handleSaveDatas = async (data: DatasRegisterUser) => {
    try {
      setLoading(true);

      const objectNewDatas = {
        id: dataUser.id,
        username: data.username,
        phone: data.phone,
        address: data.address,
        number_address: data.number_address,
        complement_address: data.complement_address,
        email: data.email,
      };

      const { id, ...rest } = objectNewDatas;

      const responseNewDatasUser = await Api.patch(
        `clients/${dataUser.id}`,
        rest
      );

      if (responseNewDatasUser.status) {
        setVisibleNotification(true);
        setTypeNotification("success");
        setTitleNotification("Dados atualizados");
        setDataUser(objectNewDatas);
        await AsyncStorage.setItem(
          "@marketplace:user",
          JSON.stringify(objectNewDatas)
        );
      }
    } catch (error) {
      console.error(error);
      setVisibleNotification(true);
      setTypeNotification("error");
      setTitleNotification(error.response.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    const deviceToken = await AsyncStorage.getItem(
      "@marketplace:token_push_notification"
    );

    await signOut(JSON.parse(deviceToken), dataUser.phone).then((response) => {
      if (response.status) {
        navigate("login");
      } else {
        setVisibleNotification(true);
        setTypeNotification("error");
        setTitleNotification(response.message);
      }
    });
  };

  useEffect(() => {
    // setImgUser(dataUser.profile_img);
    setValue("email", dataUser.email);
    setValue("address", dataUser.address);
    setValue("phone", dataUser.phone);
    setValue("username", dataUser.username);
    setValue("complement_address", dataUser.complement_address);
    setValue("number_address", dataUser.number_address);
  }, []);
  
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={RFValue(-220)}
      style={{
        flex: 1,
      }}
    >
      <ToastNotification
        type={typeNotification}
        title={titleNotification}
        visible={visibleNotification}
        setVisible={setVisibleNotification}
        autoHide
        duration={2000}
      />
      <Container>
        <Loading visible={loading} />
        {/* <ContentButtonPhoto>
              <ButtonPhoto
                enableIcon={true}
                background={Theme.colors.primary}
                onPress={() => setShowModal(true)}
                urlImg={imgUser}
              />
            </ContentButtonPhoto> */}

        <ContainerInputs>
          <Input
            type="default"
            labelText="Nome de usuário"
            defaultValue={dataUser.username}
            onChangeText={(value) => setValue("username", value)}
            error={errors.address?.message}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field: { value } }) => (
              <Input
                type="default"
                labelText="Telefone"
                keyboardType="numeric"
                maxLength={14}
                value={value}
                defaultValue={dataUser.phone}
                onChangeText={(value) =>
                  setValue("phone", Masks.MaskPhone(value))
                }
                error={errors.phone?.message}
              />
            )}
          />

          <Input
            type="default"
            labelText="Email"
            defaultValue={dataUser.email}
            onChangeText={(value) => setValue("email", value)}
            error={errors.email?.message}
          />

          <Input
            type="default"
            labelText="Endereço"
            defaultValue={dataUser.address}
            onChangeText={(value) => setValue("address", value)}
            error={errors.address?.message}
          />

          <Input
            type="default"
            labelText="Número de endereço"
            keyboardType="numeric"
            defaultValue={String(dataUser.number_address)}
            onChangeText={(value) => setValue("number_address", Number(value))}
            error={errors.number_address?.message}
          />

          <Input
            type="default"
            labelText="Complemento"
            defaultValue={dataUser.complement_address}
            onChangeText={(value) => setValue("complement_address", value)}
            error={errors.address?.message}
          />
        </ContainerInputs>

        <ContentButton>
          <Button
            color={Theme.colors.primary}
            textColor={Theme.colors.text_white}
            textButton="Salvar"
            onPress={handleSubmit(handleSaveDatas)}
          />
          <Button
            color={Theme.colors.background_color}
            textColor={Theme.colors.primary}
            textButton="Sair"
            onPress={handleSignOut}
          />
        </ContentButton>
      </Container>
    </KeyboardAvoidingView>
  );
};
