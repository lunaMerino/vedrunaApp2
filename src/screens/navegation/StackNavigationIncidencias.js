import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AddIncidencia, FlatListIncidencias } from '../StacksIncidencias';

export function StackNavigationIncidencias() {
    const Stack = createStackNavigator();
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="FlatListIncidencias">
                <Stack.Screen name="FlatListIncidencias" component={ FlatListIncidencias } />
                <Stack.Screen name="AddIncidencia" component={ AddIncidencia } />
            </Stack.Navigator>
    )
}