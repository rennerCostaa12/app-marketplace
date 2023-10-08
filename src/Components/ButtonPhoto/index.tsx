import { Container, ContentButton, Image, ContentIconAdd } from "./styles";

import { TouchableOpacityProps } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
          source={{
            uri: `${
              urlImg
                ? urlImg
                : "https://cdn-icons-png.flaticon.com/512/5218/5218413.png"
            }`,
          }}
        />
        {enableIcon && (
          <ContentIconAdd>
            <Ionicons name="add-circle" size={30} color="#ffffff" />
          </ContentIconAdd>
        )}
      </ContentButton>
    </Container>
  );
};
