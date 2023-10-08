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

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { Input } from "../../Components/Input";
import { TextLink } from "../../Components/TextLink ";

const SchemaLogin = yup.object({
  email: yup
    .string()
    .email("Email inválido")
    .required("Campo email é obrigatório"),
  password: yup.string().required("Campo senha é obrigatório"),
});

export const Login = () => {
  const {
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm({
    resolver: yupResolver(SchemaLogin),
  });

  const { navigate } = useNavigation() as any;

  const handleLogin = async (data: any) => {
    console.log(data);
  };

  return (
    <Container>
      <ContentImg>
        <Image
          source={{
            uri: "https://static.vecteezy.com/system/resources/previews/001/822/225/non_2x/group-of-business-people-showing-teamwork-free-vector.jpg",
          }}
        />
      </ContentImg>
      <TitlePage style={{ fontFamily: "Lato_700Bold" }}>LOGIN</TitlePage>

      <Input
        type="default"
        placeholder="Email"
        icon={<Entypo name="email" size={24} color="black" />}
        onChangeText={(value) => setValue("email", value)}
        error={errors.email?.message}
      />

      <Input
        type="password"
        placeholder="Email"
        icon={<AntDesign name="lock" size={24} color="black" />}
        onChangeText={(value) => setValue("password", value)}
        error={errors.password?.message}
      />

      <TextLink
        style={{ alignSelf: "flex-end", marginTop: 10, marginBottom: 10 }}
        color="#FF1493"
        text="Esqueci minha senha"
      />

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
