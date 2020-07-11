import React from 'react';
import Main from './pages/Main';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Calcula from "./pages/CalculaScreen/Calcula";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator()


export default function Routes() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = focused
                                ? 'ios-information-circle'
                                : 'ios-information-circle-outline';
                        } else if (route.name === 'Settings') {
                            iconName = focused ? 'ios-list-box' : 'ios-list';
                        }

                        // You can return any component that you like here!
                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                })}
                tabBarOptions={{
                    style:{
                        backgroundColor: '#FFF',
                    },
                    activeTintColor: 'tomato',
                    inactiveTintColor: 'gray',

                }}
            >
                <Tab.Screen name="Home" component={Main} />
                <Tab.Screen name="Settings" component={Calcula} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
