import { Container, Content, ContentIcon, TextVoice } from "./styles";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";
import { Audio } from "expo-av";

import { Modal, TouchableWithoutFeedback } from "react-native";
import { useState } from "react";

import { Theme } from "../../Theme";

interface ModalRecordingVoiceProps {
  visible: boolean;
  transparent: boolean;
  setVisible: (data: boolean) => void;
}

export const ModalRecordingVoice = ({
  visible,
  transparent,
  setVisible,
}: ModalRecordingVoiceProps) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recording, setRecording] = useState<any>();
  const [spokenPhrase, setSpokenPhrase] = useState<string>("");
  const [fileUriAudio, setFileUriAudio] = useState<string | null>(null);

  const handleIsRecording = () => {
    isRecording ? handleStopRecording() : handleStartRecording();
  };

  const handleStartRecording = async () => {
    try {
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setIsRecording(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStopRecording = async () => {
    try {
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      setIsRecording(false);

      const uri = recording.getURI();

      setFileUriAudio(uri);

      // if (uri) {
      //   const { sound } = await Audio.Sound.createAsync(
      //     { uri: uri },
      //     { shouldPlay: true }
      //   );
      //   await sound.setPositionAsync(0);
      // }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={transparent}
      onRequestClose={() => setVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setVisible(false)}>
        <Container />
      </TouchableWithoutFeedback>
      <Content>
        <ContentIcon isActive={isRecording} onPress={handleIsRecording}>
          <MaterialCommunityIcons
            name="microphone"
            size={RFValue(30)}
            color={
              isRecording ? Theme.colors.text_white : Theme.colors.text_black
            }
          />
        </ContentIcon>
        {isRecording && <TextVoice>Falar agora</TextVoice>}
      </Content>
    </Modal>
  );
};
