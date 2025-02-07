import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Publications, Add, Incidencias, Profile } from "../tabs/index";
import React from "react";
import { theme } from "../theme";
import { Image } from "react-native";

export function TabNavigation({ route }) {
  const Tab = createBottomTabNavigator();

  const { params } = route;
  const user_id = params?.user_id;
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.colors.blackish,
          borderTopWidth: 0
        },
        tabBarActiveTintColor: theme.colors.green,
        tabBarInactiveTintColor: theme.colors.darkGray,
      }}
    >
      <Tab.Screen
        name="Publicaciones"
        component={ Publications }

        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Añadir"
        component={ Add }
        initialParams={{ user_id }}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="add-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Incidencias"
        component={ Incidencias }

        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ Profile }

        options={{
          tabBarIcon: ({ focused }) => (
            <Image
                source={
                  focused
                    ? require("../../../assets/profile2.png")
                    : require("../../../assets/profile.png")
                }
                style={{ width: 22, height: 22 }}
              />          ),
        }}
      />
    </Tab.Navigator>
  );
}
