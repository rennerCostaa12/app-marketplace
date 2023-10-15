import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Entypo, AntDesign } from "@expo/vector-icons";

import { Home } from "../Screens/Home";
import { Doubt } from "../Screens/Doubt";
import { ConfigUser } from "../Screens/ConfigUser";

const { Navigator, Screen } = createBottomTabNavigator();

export const TabsRoutes = () => {
  return (
    <Navigator
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "#FF1493",
        headerShown: false,
      }}
    >
      <Screen
        name="home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: "Lato_700Bold",
          },
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="doubt"
        component={Doubt}
        options={{
          tabBarLabel: "Dúvidas",
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: "Lato_700Bold",
          },
          tabBarIcon: ({ color, size }) => (
            <Entypo name="help" size={size} color={color} />
          ),
        }}
      />
      <Screen
        name="configUser"
        component={ConfigUser}
        options={{
          tabBarLabel: "Conta",
          tabBarLabelStyle: {
            fontSize: 14,
            fontFamily: "Lato_700Bold",
          },
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
};
