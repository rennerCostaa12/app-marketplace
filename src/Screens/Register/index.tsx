import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { RFValue } from "react-native-responsive-fontsize";
import { useState } from "react";
import { KeyboardAvoidingView } from "react-native";

import { Container, ContentButton, ContainerInputs } from "./styles";

import { ToastNotification } from "../../Components/ToastNotification";
import { Button } from "../../Components/Button";
import { Input } from "../../Components/Input";
import { Loading } from "../../Components/Loading";

import { Masks } from "../../Utils/Mask";

import { Api } from "../../Configs/Api";

import { DatasRegisterUser } from "./types";
import { TypeNotification } from "../../Components/ToastNotification/types";

import { Theme } from "../../Theme";

const SchemaRegister = yup.object({
  username: yup.string().required("Campo nome de usuário é obrigatório"),
  phone: yup
    .string()
    .min(14, "Número de telefone inválido")
    .required("O campo telefone é obrigatório"),
  password: yup.string().required("Campo senha é obrigatório"),
  password_confirm: yup
    .string()
    .required("Campo confirmação de senha é obrigatório"),
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

export const Register = () => {
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(SchemaRegister),
  });

  const [visibleNotification, setVisibleNotification] =
    useState<boolean>(false);
  const [titleNotification, setTitleNotification] = useState<string>("");
  const [typeNotification, setTypeNotification] =
    useState<TypeNotification>("success");
  const [loading, setLoading] = useState<boolean>(false);
  // const [startCamera, setStartCamera] = useState<boolean>(false);

  // const [imgUser, setImgUser] = useState<string | null>(null);

  // const [permission] = CameraExpo.useCameraPermissions();

  const { goBack } = useNavigation();

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

  const handleRegisterUser = async (data: DatasRegisterUser) => {
    const {
      address,
      password,
      username,
      password_confirm,
      complement_address,
      number_address,
      phone,
      email,
    } = data;

    // if (!imgUser) {
    //   setVisibleNotification(true);
    //   setTitleNotification("Escolha uma foto");
    //   setTypeNotification("warning");
    //   return;
    // }

    if (password !== password_confirm) {
      setVisibleNotification(true);
      setTitleNotification("As senhas não são iguais!");
      setTypeNotification("warning");
      return;
    }

    try {
      setLoading(true);
      const responseRegisterUser = await Api.post("clients", {
        username,
        password,
        phone: phone,
        address,
        number_address: number_address,
        complement_address: complement_address,
        email: email,
      });

      if (responseRegisterUser.status) {
        setVisibleNotification(true);
        setTitleNotification("Cadastro realizado com sucesso");
        setTypeNotification("success");
        setTimeout(() => {
          goBack();
        }, 2000);
      }
    } catch (error) {
      console.log(error.response.data.message);
      setVisibleNotification(true);
      setTitleNotification(error.response.data.message);
      setTypeNotification("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={RFValue(-200)}
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
        <ContainerInputs>
          {/* <ContentInput
            style={{
              alignItems: "center",
              marginBottom: 30,
            }}
          >
            <ButtonPhoto
              urlImg={imgUser}
              background={Theme.colors.primary}
              enableIcon={true}
              onPress={() => setShowModal(true)}
            />
          </ContentInput> */}

          <Input
            type="default"
            labelText="Nome de usuário"
            onChangeText={(value) => setValue("username", value)}
            error={errors.username?.message}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field: { value } }) => (
              <Input
                type="default"
                labelText="Telefone"
                keyboardType="numeric"
                value={value}
                maxLength={14}
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

          <Input
            type="default"
            labelText="Número de endereço"
            keyboardType="numeric"
            onChangeText={(value) => setValue("number_address", Number(value))}
            error={errors.number_address?.message}
          />

          <Input
            type="default"
            labelText="Complemento"
            onChangeText={(value) => setValue("complement_address", value)}
            error={errors.complement_address?.message}
          />
        </ContainerInputs>

        <ContentButton>
          <Button
            onPress={handleSubmit(handleRegisterUser)}
            color={Theme.colors.primary}
            textColor={Theme.colors.text_white}
            textButton="Cadastrar"
          />
        </ContentButton>
      </Container>
    </KeyboardAvoidingView>
  );
};
