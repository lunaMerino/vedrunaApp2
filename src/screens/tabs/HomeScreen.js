import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { theme } from '../theme'
import { StackNavigationPubli } from '../navegation/StackNavigationPubli'

export function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* <StackNavigationPubli /> */}
      <Text style={styles.title}>Home</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.blackish,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: theme.colors.lightGray,
    fontSize: 16,
    fontWeight: 'bold'
  }
});