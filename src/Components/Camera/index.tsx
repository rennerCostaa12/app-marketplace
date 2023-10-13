import { Camera as CameraExpo, CameraType } from "expo-camera";
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
import { AntDesign, FontAwesome } from "@expo/vector-icons";

import { PhotoCapturedProps } from "./types";

import { useState, useRef } from "react";

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
              <AntDesign name="check" size={30} color="#419B45" />
              <TextPreviewImg color="#419B45">Aceitar</TextPreviewImg>
            </ButtonPreviewImg>

            <ButtonPreviewImg onPress={handleRecusePhoto}>
              <AntDesign name="close" size={30} color="#DC143C" />
              <TextPreviewImg color="#DC143C">Recusar</TextPreviewImg>
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
              <AntDesign name="close" size={40} color="#ffffff" />
            </ContentIconClose>

            <ContentIconCapture onPress={handleCapturePhoto}>
              <AntDesign name="camera" size={30} color="#ffffff" />
            </ContentIconCapture>

            <ContentIconChangePositionCamera onPress={handleChangeTypeCamera}>
              <FontAwesome name="exchange" size={30} color="#ffffff" />
            </ContentIconChangePositionCamera>
          </ContentOptionsCamera>
        </>
      )}
    </>
  );
};
