import {
  Container,
  ContentInput,
  ContentButton,
  ContainerInputs,
} from "./styles";

import { useState } from "react";

import * as ImagePicker from "expo-image-picker";
import { Camera as CameraExpo } from "expo-camera";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  ALERT_TYPE,
  AlertNotificationRoot,
  Toast,
} from "react-native-alert-notification";

import { Button } from "../../Components/Button";
import { ButtonPhoto } from "../../Components/ButtonPhoto";
import { ModalSelectPhoto } from "../../Components/ModalSelectPhoto";
import { Input } from "../../Components/Input";
import { Camera } from "../../Components/Camera";

const SchemaRegister = yup.object({
  username: yup.string().required("Campo nome de usuário é obrigatório"),
  email: yup
    .string()
    .email("Email inválido")
    .required("Campo email é obrigatório"),
  password: yup.string().required("Campo senha é obrigatório"),
  password_confirm: yup
    .string()
    .required("Campo confirmação de senha é obrigatório"),
  address: yup.string().required("Campo endereço é obrigatório"),
});

export const Register = () => {
  const {
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(SchemaRegister),
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [startCamera, setStartCamera] = useState<boolean>(false);

  const [imgUser, setImgUser] = useState<string | null>(null);

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

  const handleRegisterUser = async (data: any) => {
    console.log(data);

    if (!imgUser) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "Escolha uma foto",
      });
    }

    if (data.password === data.password_confirm) {
      Toast.show({
        type: ALERT_TYPE.WARNING,
        title: "As senhas não não são iguais!",
      });
    }
  };

  return (
    <AlertNotificationRoot>
      {startCamera ? (
        <Camera setImg={setImgUser} setVisibleCamera={setStartCamera} />
      ) : (
        <Container>
          <ContainerInputs>
            <ContentInput
              style={{
                alignItems: "center",
                marginBottom: 30,
              }}
            >
              <ButtonPhoto
                urlImg={imgUser}
                background="#FF1493"
                enableIcon={true}
                onPress={() => setShowModal(true)}
              />
            </ContentInput>

            <Input
              type="default"
              labelText="Nome de usuário"
              onChangeText={(value) => setValue("username", value)}
              error={errors.address?.message}
            />

            <Input
              type="default"
              labelText="Email"
              onChangeText={(value) => setValue("email", value)}
              error={errors.email?.message}
            />

            <Input
              type="password"
              labelText="Senha"
              onChangeText={(value) => setValue("password", value)}
              error={errors.password?.message}
            />

            <Input
              type="password"
              labelText="Confirmação de senha"
              onChangeText={(value) => setValue("password_confirm", value)}
              error={errors.password_confirm?.message}
            />

            <Input
              type="default"
              labelText="Endereço"
              onChangeText={(value) => setValue("address", value)}
              error={errors.address?.message}
            />
          </ContainerInputs>

          <ContentButton>
            <Button
              onPress={handleSubmit(handleRegisterUser)}
              color="#FF1493"
              textColor="#ffffff"
              textButton="Cadastrar"
            />
          </ContentButton>

          <ModalSelectPhoto
            handleGetPermissionsCamera={handleGetPermissionsCamera}
            handleOpenGallery={handleOpenGallery}
            title="Seleção de imagem"
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </Container>
      )}
    </AlertNotificationRoot>
  );
};
