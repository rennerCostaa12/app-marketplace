import {
  Container,
  ContentButton,
  ContentButtonPhoto,
  ContainerInputs,
} from "./styles";

import { useEffect, useState } from "react";
import { KeyboardAvoidingView } from "react-native";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { Camera as CameraExpo } from "expo-camera";

import { ToastNotification } from "../../Components/ToastNotification";
import { ButtonPhoto } from "../../Components/ButtonPhoto";
import { ModalSelectPhoto } from "../../Components/ModalSelectPhoto";
import { Input } from "../../Components/Input";
import { Camera } from "../../Components/Camera";
import { Loading } from "../../Components/Loading";
import { Button } from "../../Components/Button";

import { DatasRegisterUser } from "../Register/types";
import { useAuthContext } from "../../Contexts/Auth";

import { Api } from "../../Configs/Api";
import { TypeNotification } from "../../Components/ToastNotification/types";

const SchemaRegister = yup.object({
  username: yup.string().required("Campo nome de usuário é obrigatório"),
  email: yup
    .string()
    .email("Email inválido")
    .required("Campo email é obrigatório"),
  address: yup.string().required("Campo endereço é obrigatório"),
  number_address: yup
    .number()
    .required("Campo número de endereço é obrigatório"),
  complement_address: yup.string(),
});

export const ConfigUser = () => {
  const {
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(SchemaRegister),
  });

  const { dataUser, setDataUser, signOut } = useAuthContext();

  const [visibleNotification, setVisibleNotification] =
    useState<boolean>(false);
  const [titleNotification, setTitleNotification] = useState<string>("");
  const [typeNotification, setTypeNotification] =
    useState<TypeNotification>("success");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [imgUser, setImgUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [startCamera, setStartCamera] = useState<boolean>(false);

  const { navigate } = useNavigation() as any;

  const [permission] = CameraExpo.useCameraPermissions();

  const handleGetPermissionsCamera = async () => {
    try {
      if (!permission.granted) {
        let { status } = await CameraExpo.requestCameraPermissionsAsync();

        if (status !== "granted") {
          alert("Não tem permissão");
        }
      } else {
        setStartCamera(true);
        setShowModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOpenGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImgUser(result.assets[0].uri);
      setShowModal(false);
    }
  };

  const handleSaveDatas = async (data: DatasRegisterUser) => {
    try {
      setLoading(true);

      const objectNewDatas = {
        id: dataUser.id,
        username: data.username,
        email: data.email,
        profile_img: imgUser,
        address: data.address,
        number_address: data.number_address,
        complement_address: data.complement_address,
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

  const handleSignOut = () => {
    signOut();
    navigate("login");
  };

  useEffect(() => {
    setImgUser(dataUser.profile_img);
    setValue("address", dataUser.address);
    setValue("username", dataUser.username);
    setValue("email", dataUser.email);
    setValue("complement_address", dataUser.complement_address);
  }, []);

  return (
    <>
      {startCamera ? (
        <Camera setImg={setImgUser} setVisibleCamera={setStartCamera} />
      ) : (
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
            <ContentButtonPhoto>
              <ButtonPhoto
                enableIcon={true}
                background="#FF1493"
                onPress={() => setShowModal(true)}
                urlImg={imgUser}
              />
            </ContentButtonPhoto>

            <ContainerInputs>
              <Input
                type="default"
                labelText="Nome de usuário"
                defaultValue={dataUser.username}
                onChangeText={(value) => setValue("username", value)}
                error={errors.address?.message}
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
                onChangeText={(value) =>
                  setValue("number_address", Number(value))
                }
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
                color="#FF1493"
                textColor="#ffffff"
                textButton="Salvar"
                onPress={handleSubmit(handleSaveDatas)}
              />
              <Button
                color="#ffffff"
                textColor="#FF1493"
                textButton="Sair"
                onPress={handleSignOut}
              />
            </ContentButton>
            <ModalSelectPhoto
              handleGetPermissionsCamera={handleGetPermissionsCamera}
              handleOpenGallery={handleOpenGallery}
              setShowModal={setShowModal}
              showModal={showModal}
              title="Seleção de imagem"
            />
          </Container>
        </KeyboardAvoidingView>
      )}
    </>
  );
};
