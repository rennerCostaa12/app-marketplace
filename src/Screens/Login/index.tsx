import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigation, CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";

import {
  Container,
  BtnLogin,
  ContentButton,
  ContentImg,
  Image,
  TextBtnLogin,
  TitlePage,
  TextNotAccount,
  ContentTextNotAccount,
  ContentForm,
} from "./styles";

import { Input } from "../../Components/Input";
import { TextLink } from "../../Components/TextLink";
import { Loading } from "../../Components/Loading";
import { ToastNotification } from "../../Components/ToastNotification";

import { useAuthContext } from "../../Contexts/Auth";
import { Masks } from "../../Utils/Mask";

import { UserLoginProps } from "./types";
import { TypeNotification } from "../../Components/ToastNotification/types";

import { Theme } from "../../Theme";

const SchemaLogin = yup.object({
  phone: yup
    .string()
    .min(14, "Telefone inválido")
    .required("Campo telefone é obrigatório"),
  password: yup.string().required("Campo senha é obrigatório"),
});

export const Login = ({ navigation }) => {
  const {
    formState: { errors },
    handleSubmit,
    setValue,
    control,
  } = useForm({
    resolver: yupResolver(SchemaLogin),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [visibleNotification, setVisibleNotification] =
    useState<boolean>(false);
  const [titleNotification, setTitleNotification] = useState<string>("");
  const [typeNotification, setTypeNotification] =
    useState<TypeNotification>("success");

  const { signIn } = useAuthContext();

  const clearInputs = () => {
    setValue("phone", "");
    setValue("password", "");
  };

  const handleLogin = async (data: UserLoginProps) => {
    try {
      const deviceToken = await AsyncStorage.getItem(
        "@marketplace:token_push_notification"
      );

      setLoading(true);
      await signIn(data.phone, data.password, JSON.parse(deviceToken)).then(
        (response) => {
          if (response.status) {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "tab_routes" }],
              })
            );
            clearInputs();
          } else {
            setVisibleNotification(true);
            setTypeNotification("error");
            setTitleNotification(response.message);
          }
        }
      );
    } finally {
      setLoading(false);
    }
  };

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
      <Loading visible={loading} />

      <ContentImg>
        <Image source={require("../../assets/images/logo-samia-1.png")} />
      </ContentImg>

      <ContentForm>
        <TitlePage>LOGIN</TitlePage>

        <Controller
          name="phone"
          control={control}
          render={({ field: { value } }) => (
            <Input
              type="default"
              placeholder="(00)00000-0000"
              keyboardType="numeric"
              value={value}
              maxLength={14}
              onChangeText={(value) =>
                setValue("phone", Masks.MaskPhone(value))
              }
              error={errors.phone?.message}
              labelText="Telefone"
            />
          )}
        />

        <Input
          type="password"
          labelText="Senha"
          onChangeText={(value) => setValue("password", value)}
          error={errors.password?.message}
        />
        {/* 
      <TextLink
        style={{ alignSelf: "flex-end", marginTop: 10, marginBottom: 10 }}
        color={Theme.colors.primary}
        text="Esqueci minha senha"
      /> */}

        <ContentButton>
          <BtnLogin
            backgroundButton={Theme.colors.primary}
            onPress={handleSubmit(handleLogin)}
          >
            <TextBtnLogin color={Theme.colors.text_white}>Entrar</TextBtnLogin>
          </BtnLogin>
        </ContentButton>

        <ContentTextNotAccount>
          <TextNotAccount>Não possui conta? {""}</TextNotAccount>
          <TextLink
            color={Theme.colors.primary}
            text="Registre-se"
            onPress={() => navigation.navigate("register")}
          />
        </ContentTextNotAccount>
      </ContentForm>
    </Container>
  );
};
