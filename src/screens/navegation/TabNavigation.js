import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { HomeScreen, SettingsScreen } from "../tabs/index";
import React from "react";
import { theme } from "../theme";

export function TabNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.colors.blackish,
          borderTopWidth: 0
        },
        tabBarActiveTintColor: theme.colors.green,
        tabBarInactiveTintColor: "#aaa",
      }}
    >
      <Tab.Screen
        name="Publicaciones"
        component={ HomeScreen }

        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Ajustes"
        component={ SettingsScreen }

        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
