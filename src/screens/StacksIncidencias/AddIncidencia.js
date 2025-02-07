import { View, StyleSheet } from 'react-native'
import React from 'react'
import Button from '../components/Button'

export function AddIncidencia({ navigation }) {
    
  return (
    <View style={styles.container}>
      <Button label="Enviar" onPress={() => navigation.navigate('FlatListIncidencias')} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }


})