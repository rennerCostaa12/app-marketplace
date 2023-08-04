import { createStackNavigator } from '@react-navigation/stack';

import { ApresentationApp } from '../Screens/ApresentationApp';

import { TabsRoutes } from './tabs.routes';

const { Navigator, Screen } = createStackNavigator();

export const StackRoutes = () => {
    return(
        <Navigator screenOptions={{
            headerShown: false
        }}>
            <Screen name='apresentation_app'  component={ApresentationApp}/>
            <Screen name='home'  component={TabsRoutes}/>
        </Navigator>
    )
}