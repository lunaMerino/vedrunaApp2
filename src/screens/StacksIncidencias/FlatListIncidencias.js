import React from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'

export function FlatListIncidencias({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>FlatListIncidencias</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('AddIncidencia')}
      >
        <Image
          source={require('../../../assets/añadir_comentario.png')}
          style={styles.logo}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
      width: 80,
      height: 80,
    },
})