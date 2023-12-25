import { Camera as CameraExpo, CameraType } from "expo-camera";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

import { useState, useRef } from "react";

import {
  ContentIconCapture,
  ContentIconChangePositionCamera,
  ContentIconClose,
  ContentOptionsCamera,
  ImagePreview,
  ContainerImagePreview,
  ContentButtons,
  ButtonPreviewImg,
  TextPreviewImg,
} from "./styles";

import { PhotoCapturedProps } from "./types";

import { Theme } from "../../Theme";

interface CameraProps {
  setVisibleCamera: (data: boolean) => void;
  setImg: (data: string | null) => void;
}

export const Camera = ({ setVisibleCamera, setImg }: CameraProps) => {
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [photoCaptured, setPhotoCaptured] = useState<PhotoCapturedProps>();

  const camera = useRef<any>(null);

  const handleCapturePhoto = async () => {
    try {
      if (!camera) return;
      const photo = await camera.current.takePictureAsync();
      setPhotoCaptured(photo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeTypeCamera = () => {
    setCameraType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  const handleAcceptPhoto = () => {
    setImg(photoCaptured.uri);
    setPhotoCaptured(undefined);
    setVisibleCamera(false);
  };

  const handleRecusePhoto = () => {
    setPhotoCaptured(undefined);
  };

  return (
    <>
      {photoCaptured ? (
        <ContainerImagePreview>
          <ImagePreview source={{ uri: photoCaptured.uri }} />
          <ContentButtons>
            <ButtonPreviewImg onPress={handleAcceptPhoto}>
              <AntDesign
                name="check"
                size={RFValue(30)}
                color={Theme.colors.green_dark}
              />
              <TextPreviewImg color={Theme.colors.green_dark}>
                Aceitar
              </TextPreviewImg>
            </ButtonPreviewImg>

            <ButtonPreviewImg onPress={handleRecusePhoto}>
              <AntDesign
                name="close"
                size={RFValue(30)}
                color={Theme.colors.red_crimson}
              />
              <TextPreviewImg color={Theme.colors.red_crimson}>
                Recusar
              </TextPreviewImg>
            </ButtonPreviewImg>
          </ContentButtons>
        </ContainerImagePreview>
      ) : (
        <>
          <CameraExpo
            type={cameraType}
            ref={(ref: any) => {
              camera.current = ref;
            }}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          ></CameraExpo>

          <ContentOptionsCamera>
            <ContentIconClose onPress={() => setVisibleCamera(false)}>
              <AntDesign
                name="close"
                size={RFValue(40)}
                color={Theme.colors.background_color}
              />
            </ContentIconClose>

            <ContentIconCapture onPress={handleCapturePhoto}>
              <AntDesign
                name="camera"
                size={RFValue(30)}
                color={Theme.colors.background_color}
              />
            </ContentIconCapture>

            <ContentIconChangePositionCamera onPress={handleChangeTypeCamera}>
              <FontAwesome
                name="exchange"
                size={RFValue(30)}
                color={Theme.colors.background_color}
              />
            </ContentIconChangePositionCamera>
          </ContentOptionsCamera>
        </>
      )}
    </>
  );
};
