import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen, RegisterScreen, Tab } from './src/screens/index';
import AppLoading from 'expo-app-loading';
import { useFonts, Rajdhani_400Regular, Rajdhani_500Medium, Rajdhani_600SemiBold, Rajdhani_700Bold } from '@expo-google-fonts/rajdhani';

export function App() {
  const Stack = createStackNavigator();
  const [fontsLoaded] = useFonts({
    Rajdhani_400Regular,
    Rajdhani_500Medium,
    Rajdhani_600SemiBold,
    Rajdhani_700Bold,
    
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator  screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={ LoginScreen } />
        <Stack.Screen name="Register" component={ RegisterScreen } />
        <Stack.Screen name="Tab" component={ Tab } />
      </Stack.Navigator>
    </NavigationContainer>
  );
}