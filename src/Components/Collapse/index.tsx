import { useState, ReactNode } from "react";
import { LayoutChangeEvent, View } from "react-native";

import { Container, HeaderCollapse, TextHeader, StatusTitle } from "./styles";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface CollapseProps {
  children: ReactNode;
  titleHeader: string;
  status?: string | undefined;
  colorStatus?: string | undefined;
}

export const Collapse = ({
  children,
  titleHeader,
  status,
  colorStatus,
}: CollapseProps) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);
  const animatedHeight = useSharedValue<number>(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    }
  };

  const collapsableStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded ? withTiming(height) : withTiming(0);

    return {
      height: animatedHeight.value,
    };
  }, [expanded, height]);

  return (
    <Container>
      <HeaderCollapse onPress={() => setExpanded(!expanded)}>
        <TextHeader>{titleHeader}</TextHeader>
        <StatusTitle backgroundStatus={colorStatus}>{status}</StatusTitle>
      </HeaderCollapse>
      <Animated.View style={[collapsableStyle, { overflow: "hidden" }]}>
        <View
          style={{
            position: "absolute",
            width: "100%",
          }}
          onLayout={onLayout}
        >
          {children}
        </View>
      </Animated.View>
    </Container>
  );
};
