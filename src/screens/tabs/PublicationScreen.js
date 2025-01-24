import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'
import { theme } from '../theme'
import  Button from '../components/Button'
import { StackNavigationPubli } from '../navegation/StackNavigationPubli'

export function PublicationScreen() {
  return (
    <View style={styles.container}>
      {/* <StackNavigationPubli /> */}
      <View style={styles.header}>
        <Text style={styles.title}>PUBLICACIÓN</Text>
        <View style={styles.add}>

        </View>
      </View>

      <View style={styles.form}>
        <Text style={styles.title2}>Título:</Text>
        <TextInput
          style={styles.input}
          placeholder="Máx. 40 Caracteres"
          placeholderTextColor={theme.colors.darkGray} 
        />
        <Text style={styles.title2}>Descripción:</Text>
        <TextInput
          style={styles.input}
          placeholder="Máx. 250 Caracteres"
          placeholderTextColor={theme.colors.darkGray}
          multiline={true}
          height={200}
          textAlignVertical='top'
          paddingTop = {10}
        />
      </View>

      <View style={styles.foot}>
        <Button label='PUBLICAR' onPress={() => {}} />
      </View>
      
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.blackish,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%'
  },
  header: {
    height: '45%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    gap: 40
  },
  title: {
    color: theme.colors.green,
    fontSize: 26,
    fontWeight: 'bold'
  },
  add: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: theme.colors.green,
    height: 180,
    width: 180
  },
  form:{
    height: '45%',
    width: '80%',
  },
  title2: {
    color: theme.colors.green,
    fontSize: 14,
    marginBottom: 10
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: theme.colors.gray,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 12,
    color: theme.colors.lightGray,
    marginBottom: 20
  },
  foot: {
    height: '10%',
    width: '100%',
  }
});