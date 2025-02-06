import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Publications, Add } from "../tabs/index";
import React from "react";
import { theme } from "../theme";

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
        tabBarInactiveTintColor: theme.colors.lightGray,
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
    </Tab.Navigator>
  );
}
