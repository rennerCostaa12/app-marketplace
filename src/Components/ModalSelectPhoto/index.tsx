import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import { Modal } from "react-native";

import {
  Container,
  Content,
  Title,
  ButtonOptions,
  TextButtonOptions,
} from "./styles";

interface ModalSelectPhotoProps {
  showModal: boolean;
  setShowModal: (data: boolean) => void;
  title: string;
  handleGetPermissionsCamera: () => void;
  handleOpenGallery: () => void;
}

export const ModalSelectPhoto = ({
  setShowModal,
  showModal,
  title,
  handleGetPermissionsCamera,
  handleOpenGallery,
}: ModalSelectPhotoProps) => {
  return (
    <Modal
      style={{
        display: "flex",
        justifyContent: "flex-end",
      }}
      animationType="slide"
      transparent={true}
      visible={showModal}
      onRequestClose={() => setShowModal(false)}
    >
      <Container>
        <Content>
          <Title>{title}</Title>
          <ButtonOptions onPress={handleGetPermissionsCamera}>
            <AntDesign name="camera" size={RFValue(20)} color="#000000" />
            <TextButtonOptions>Câmera</TextButtonOptions>
          </ButtonOptions>
          <ButtonOptions onPress={handleOpenGallery}>
            <MaterialCommunityIcons
              name="view-gallery"
              size={RFValue(20)}
              color="#000000"
            />
            <TextButtonOptions>Galeria</TextButtonOptions>
          </ButtonOptions>
        </Content>
      </Container>
    </Modal>
  );
};
