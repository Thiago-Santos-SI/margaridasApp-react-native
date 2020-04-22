import React from 'react';
import Main from './pages/Main';

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Calcula from "./pages/CalculaScreen/Calcula";
const Stack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Main} options={{ title: 'Margaridas app', headerTintColor: '#fff', headerLayoutPreset: 'center' ,
                    headerStyle: {
                        backgroundColor: '#7A36B2',
                    },
                    headerTitleStyle:{
                        textAlign: 'center', alignSelf: 'center', flex: 1
                    },

                } } />
                <Stack.Screen name="CalculaScreen" component={Calcula} options={{ title: '',  headerLayoutPreset: 'center' ,
                    headerStyle: {
                        backgroundColor: '#7A36B2',
                    },
                    headerTitleStyle:{
                        textAlign: 'center', alignSelf: 'center', flex: 1
                    },

                } } />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
