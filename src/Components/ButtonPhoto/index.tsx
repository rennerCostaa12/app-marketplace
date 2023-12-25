import { TouchableOpacityProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import { Container, ContentButton, Image, ContentIconAdd } from "./styles";

import { Theme } from "../../Theme";

interface ButtonPhotoProps extends TouchableOpacityProps {
  background: string;
  enableIcon?: boolean;
  urlImg?: string | null;
}

export const ButtonPhoto = ({
  background,
  enableIcon,
  urlImg,
  ...props
}: ButtonPhotoProps) => {
  return (
    <Container>
      <ContentButton background={background} {...props}>
        <Image
          source={
            urlImg
              ? { uri: urlImg }
              : require("../../assets/images/img_default_photo.png")
          }
        />
        {enableIcon && (
          <ContentIconAdd>
            <Ionicons
              name="add-circle"
              size={RFValue(30)}
              color={Theme.colors.background_color}
            />
          </ContentIconAdd>
        )}
      </ContentButton>
    </Container>
  );
};
