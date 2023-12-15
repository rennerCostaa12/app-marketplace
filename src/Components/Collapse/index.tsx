import { useState, ReactNode } from "react";
import { LayoutChangeEvent, View } from "react-native";

import { Container, HeaderCollapse, TextHeader } from "./styles";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface CollapseProps {
  children: ReactNode;
  titleHeader: string;
}

export const Collapse = ({ children, titleHeader }: CollapseProps) => {
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
      </HeaderCollapse>
      <Animated.View style={[collapsableStyle, { overflow: "hidden" }]}>
        <View style={{ position: "absolute" }} onLayout={onLayout}>
          {children}
        </View>
      </Animated.View>
    </Container>
  );
};
