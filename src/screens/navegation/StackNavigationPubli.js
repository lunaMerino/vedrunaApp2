import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatListPubli, Publi } from "../Stacks/index";

export function StackNavigationPubli() {
    const Stack = createStackNavigator();
    return (
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="FlatListPubli">
                <Stack.Screen name="FlatListPubli" component={ FlatListPubli } />
                <Stack.Screen name="Publi" component={ Publi } />
            </Stack.Navigator>
    )
}