import { createStackNavigator } from '@react-navigation/stack';
import { StackA, StackB } from "../Stacks/index";

export function StackNavigationPubli() {
    const Stack = createStackNavigator();
    return (
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="A1" component={ StackA } />
                <Stack.Screen name="B2" component={ StackB } />
            </Stack.Navigator>
    )
}