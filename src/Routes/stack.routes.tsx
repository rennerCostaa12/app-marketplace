import { createStackNavigator } from "@react-navigation/stack";

import { ApresentationApp } from "../Screens/ApresentationApp";
import { ProductsFavorites } from "../Screens/ProductsFavorites";
import { Drinks } from "../Screens/Drinks";
import { Foods } from "../Screens/Foods";
import { Cleaning } from "../Screens/Cleaning";
import { Toys } from "../Screens/Toys";
import { ProductSales } from "../Screens/ProductsSales";
import { SearchProducts } from "../Screens/SearchProducts";
import { Login } from "../Screens/Login";
import { Register } from "../Screens/Register";
import { DetailsRequests } from "../Screens/DetailsRequests";

import { TabsRoutes } from "./tabs.routes";

import { Theme } from "../Theme";

const { Navigator, Screen } = createStackNavigator();

export const StackRoutes = () => {
  return (
    <Navigator
      initialRouteName="apresentation_app"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="login" component={Login} />
      <Screen
        name="register"
        component={Register}
        options={{
          headerShown: true,
          title: "Cadastro",
          headerStyle: {
            backgroundColor: Theme.colors.primary,
          },
          headerTitleStyle: {
            color: Theme.colors.text_white,
            fontWeight: "bold",
          },
          headerTintColor: Theme.colors.text_white,
        }}
      />
      <Screen name="apresentation_app" component={ApresentationApp} />
      <Screen name="tab_routes" component={TabsRoutes} />
      <Screen
        name="productsFavorites"
        component={ProductsFavorites}
        options={{
          headerShown: true,
          title: "Favoritos",
          headerStyle: {
            backgroundColor: Theme.colors.primary,
          },
          headerTitleStyle: {
            color: Theme.colors.text_white,
            fontWeight: "bold",
          },
          headerTintColor: Theme.colors.text_white,
        }}
      />

      <Screen
        name="drinks"
        component={Drinks}
        options={{
          headerShown: true,
          title: "Bebidas",
          headerStyle: {
            backgroundColor: Theme.colors.primary,
          },
          headerTitleStyle: {
            color: Theme.colors.text_white,
            fontWeight: "bold",
          },
          headerTintColor: Theme.colors.text_white,
        }}
      />

      <Screen
        name="foods"
        component={Foods}
        options={{
          headerShown: true,
          title: "Alimentos",
          headerStyle: {
            backgroundColor: Theme.colors.primary,
          },
          headerTitleStyle: {
            color: Theme.colors.text_white,
            fontWeight: "bold",
          },
          headerTintColor: Theme.colors.text_white,
        }}
      />

      <Screen
        name="cleaning"
        component={Cleaning}
        options={{
          headerShown: true,
          title: "Limpeza",
          headerStyle: {
            backgroundColor: Theme.colors.primary,
          },
          headerTitleStyle: {
            color: Theme.colors.text_white,
            fontWeight: "bold",
          },
          headerTintColor: Theme.colors.text_white,
        }}
      />

      <Screen
        name="toys"
        component={Toys}
        options={{
          headerShown: true,
          title: "Brinquedos",
          headerStyle: {
            backgroundColor: Theme.colors.primary,
          },
          headerTitleStyle: {
            color: Theme.colors.text_white,
            fontWeight: "bold",
          },
          headerTintColor: Theme.colors.text_white,
        }}
      />

      <Screen
        name="sales"
        component={ProductSales}
        options={{
          headerShown: true,
          title: "Sacola",
          headerStyle: {
            backgroundColor: Theme.colors.primary,
          },
          headerTitleStyle: {
            color: Theme.colors.text_white,
            fontWeight: "bold",
          },
          headerTintColor: Theme.colors.text_white,
        }}
      />

      <Screen
        name="search_products"
        component={SearchProducts}
        options={{
          headerShown: false,
        }}
      />

      <Screen
        name="details_requests"
        component={DetailsRequests}
        options={{
          headerShown: true,
          title: "Detalhes do pedido",
          headerStyle: {
            backgroundColor: Theme.colors.primary,
          },
          headerTitleStyle: {
            color: Theme.colors.text_white,
            fontWeight: "bold",
          },
          headerTintColor: Theme.colors.text_white,
        }}
      />
    </Navigator>
  );
};
