import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, RegisterScreen, Tab } from './src/screens/index';

export function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={ LoginScreen } />
        <Stack.Screen name="Register" component={ RegisterScreen } />
        <Stack.Screen name="Tab" component={ Tab } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}