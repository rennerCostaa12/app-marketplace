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
} from "./styles";

import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { useState } from "react";

import { Input } from "../../Components/Input";
import { TextLink } from "../../Components/TextLink";
import { Loading } from "../../Components/Loading";
import { ToastNotification } from "../../Components/ToastNotification";

import { useAuthContext } from "../../Contexts/Auth";
import { Masks } from "../../Utils/Mask";

import { UserLoginProps } from "./types";
import { TypeNotification } from "../../Components/ToastNotification/types";

const SchemaLogin = yup.object({
  phone: yup
    .string()
    .min(14, "Telefone inválido")
    .required("Campo telefone é obrigatório"),
  password: yup.string().required("Campo senha é obrigatório"),
});

export const Login = () => {
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

  const { navigate } = useNavigation() as any;

  const { signIn } = useAuthContext();

  const handleLogin = async (data: UserLoginProps) => {
    try {
      setLoading(true);
      await signIn(data.phone, data.password).then((response) => {
        if (response.status) {
          navigate("tab_routes");
        } else {
          setVisibleNotification(true);
          setTypeNotification("error");
          setTitleNotification(response.message);
        }
      });
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
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/001/822/225/non_2x/group-of-business-people-showing-teamwork-free-vector.jpg",
          }}
        />
      </ContentImg>

      <TitlePage style={{ fontFamily: "Lato_700Bold" }}>LOGIN</TitlePage>

      <Controller
        name="phone"
        control={control}
        render={({ field: { value } }) => (
          <Input
            type="default"
            placeholder="Telefone"
            keyboardType="numeric"
            value={value}
            maxLength={14}
            icon={<Entypo name="phone" size={24} color="black" />}
            onChangeText={(value) => setValue("phone", Masks.MaskPhone(value))}
            error={errors.phone?.message}
          />
        )}
      />

      <Input
        type="password"
        placeholder="Senha"
        icon={<AntDesign name="lock" size={24} color="black" />}
        onChangeText={(value) => setValue("password", value)}
        error={errors.password?.message}
      />
      {/* 
      <TextLink
        style={{ alignSelf: "flex-end", marginTop: 10, marginBottom: 10 }}
        color="#FF1493"
        text="Esqueci minha senha"
      /> */}

      <ContentButton>
        <BtnLogin
          backgroundButton="#FF1493"
          onPress={handleSubmit(handleLogin)}
        >
          <TextBtnLogin
            color="#ffffff"
            style={{ fontFamily: "Lato_400Regular" }}
          >
            Entrar
          </TextBtnLogin>
        </BtnLogin>
      </ContentButton>

      <ContentTextNotAccount>
        <TextNotAccount>Não possui conta? {""}</TextNotAccount>
        <TextLink
          color="#FF1493"
          text="Registre-se"
          onPress={() => navigate("register")}
        />
      </ContentTextNotAccount>
    </Container>
  );
};
