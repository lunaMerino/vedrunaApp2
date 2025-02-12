import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatListPubli, Publi } from "../StacksPublications/index";

export function StackNavigationPubli({ route }) {
    const Stack = createStackNavigator();
    const { user_id } = route.params || {}; // Asegura que user_id se extraiga

    return (
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="FlatListPubli">
                <Stack.Screen name="FlatListPubli" component={ FlatListPubli } initialParams={{ user_id }} />
                <Stack.Screen name="Publi" component={ Publi } />
            </Stack.Navigator>
    )
}