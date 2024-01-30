import {
  useFonts,
  Lato_400Regular,
  Lato_700Bold,
  Lato_300Light,
} from "@expo-google-fonts/lato";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useEffect, useRef } from "react";
import { Alert } from "react-native";

import { Container } from "./styles";

import { Routes } from "./src/Routes";

import { ItemsFavoritesContextProvider } from "./src/Contexts/ItemsFavorites";
import { ItemsSalesContextProvider } from "./src/Contexts/ItemsSales";
import { AuthContextProvider } from "./src/Contexts/Auth";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

export default function App() {
  const responseListener = useRef<any>();

  let [fontLoaded] = useFonts({
    Lato_400Regular,
    Lato_700Bold,
    Lato_300Light,
  });

  const getTokenPushNotification = async () => {
    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert("Falha ao pegar o token do push notification");
        return;
      }

      const token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig.extra.eas.projectId,
      });

      await AsyncStorage.setItem(
        "@marketplace:token_push_notification",
        JSON.stringify(token.data)
      );
    }
  };

  useEffect(() => {
    getTokenPushNotification();

    responseListener.current = Notifications.addNotificationReceivedListener(
      (response) => {
        console.log(response);
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  if (!fontLoaded) {
    return null;
  }

  return (
    <Container>
      <StatusBar style="auto" />
      <ItemsFavoritesContextProvider>
        <ItemsSalesContextProvider>
          <AuthContextProvider>
            <Routes />
          </AuthContextProvider>
        </ItemsSalesContextProvider>
      </ItemsFavoritesContextProvider>
    </Container>
  );
}
