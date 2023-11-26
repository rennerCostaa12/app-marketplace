import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { RFValue } from "react-native-responsive-fontsize";

import { useEffect } from "react";
import { TouchableWithoutFeedback } from "react-native";

import {
  Content,
  BrandColor,
  Text,
  Title,
  ContentDescriptionNotification,
} from "./styles";

import { TypeNotification } from "./types";

interface ToastNotificationProps {
  visible: boolean;
  setVisible: (data: boolean) => void;
  type: TypeNotification;
  title: string;
  text?: string;
  autoHide?: boolean;
  duration?: number;
}

export const ToastNotification = ({
  visible,
  setVisible,
  type,
  title,
  text,
  autoHide,
  duration,
}: ToastNotificationProps) => {
  const switchTypeNotification = () => {
    switch (type) {
      case "success":
        return "#007C00";
      case "error":
        return "#DC143C";
      case "info":
        return "#1AA3E8";
      case "warning":
        return "#FFCC00";
      default:
        return "#007C00";
    }
  };

  const translateX = useSharedValue(-2000);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }] as any,
  }));

  const autoHideAnimation = () => {
    setTimeout(() => {
      hideAnimation();
    }, duration);
  };

  const showAnimation = () => {
    setVisible(true);
    translateX.value = withTiming(5, {
      duration: 500,
    });

    if (autoHide) {
      autoHideAnimation();
    }
  };

  const hideAnimation = () => {
    setVisible(false);
    translateX.value = withTiming(-2000, {
      duration: 500,
    });
  };

  useEffect(() => {
    visible ? showAnimation() : hideAnimation();
  }, [visible]);

  return (
    <Animated.View
      style={[
        {
          top: RFValue(20),
          left: 0,
          position: "absolute",
          zIndex: 1000,
        },
        animatedStyles,
      ]}
    >
      <TouchableWithoutFeedback onPress={() => hideAnimation()}>
        <Content>
          <BrandColor color={switchTypeNotification()} />
          <ContentDescriptionNotification>
            <Title
              style={{
                fontFamily: "Lato_700Bold",
              }}
            >
              {title}
            </Title>
            {text && <Text>{text}</Text>}
          </ContentDescriptionNotification>
        </Content>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};
