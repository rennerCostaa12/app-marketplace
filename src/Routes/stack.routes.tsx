import { createStackNavigator } from '@react-navigation/stack';

import { ApresentationApp } from '../Screens/ApresentationApp';

import { TabsRoutes } from './tabs.routes';

import { ProductsFavorites } from '../Screens/ProductsFavorites';

const { Navigator, Screen } = createStackNavigator();

export const StackRoutes = () => {
    return (
        <Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen
                name='apresentation_app'
                component={ApresentationApp}
            />
            <Screen
                name='tab_routes'
                component={TabsRoutes}
            />
            <Screen
                name='productsFavorites'
                component={ProductsFavorites}
                options={{
                    headerShown: true,
                    title: 'Favoritos',
                    headerStyle: {
                        backgroundColor: '#FF1493'
                    },
                    headerTitleStyle: {
                        color: '#FFFFFF',
                        fontWeight: 'bold'
                    },
                    headerTintColor: '#FFFFFF'
                }}
            />
        </Navigator>
    )
}