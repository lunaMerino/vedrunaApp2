import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { theme } from '../theme'

export function PublicationScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Publications</Text>
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
