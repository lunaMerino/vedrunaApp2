import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { theme } from './theme';

export function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Header Image */}
        <Image
          source={{ uri: 'https://s3-alpha-sig.figma.com/img/72d7/b319/4b4d43937556f9dedd4e2670fb4a1c44?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TbzD5fH71Ygw~ry45ZfxYueUUHazW8iwK1vc4zyhggjAMbpvdzkoy8m6UmrJ1g~cOi35bwg~Plr5V9wZWqOyLaFY~TVZXY1Fm7NCxqIt0tZf2Gqgcjx52WxxkQCulWbTENnDByWllb4cufsRRDgnCUV8HoUXMEO1WHMCdgmrm-yZSjtAR2PfJ9ettDSSANkghKOVeOMlRNiTVllDzY3f3E~Bo0eEPfXsbJeYw-OxcJxz6eGKAnhYgVPxoHvTtwvkVuoAdkT79iGs4f-2ZXKvT0bX3uHpbwZdKtoCW2Y6LxO-PYyB4stihhUGFyDHoGBD12zlma8W1KGeB-P3H4rhIA__' }}
          style={styles.image}
        />
      </View>
      
      <View style={styles.form}>
        {/* Title */}
        <Text style={styles.title}>Completar los siguientes campos:</Text>

        {/* Input Fields */}
        <TextInput
          style={styles.input}
          placeholder="Introduzca su correo"
          placeholderTextColor={theme.colors.darkGray}
        />
        <TextInput
          style={styles.input}
          placeholder="Introduzca contraseña"
          placeholderTextColor={theme.colors.darkGray}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Repita contraseña"
          placeholderTextColor={theme.colors.darkGray}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Introduzca su nick"
          placeholderTextColor={theme.colors.darkGray}
        />
        <TextInput
          style={styles.input}
          placeholder="Introduzca su nombre"
          placeholderTextColor={theme.colors.darkGray}
        />
        <TextInput
          style={styles.input}
          placeholder="Introduzca su primer apellido"
          placeholderTextColor={theme.colors.darkGray}
        />
        <TextInput
          style={styles.input}
          placeholder="Introduzca su segundo apellido"
          placeholderTextColor={theme.colors.darkGray}
        />

        {/* Submit Button */}
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}
          onPress={() => navigation.navigate('Login')}
          >FINALIZAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.blackish,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  image: {
    width: 350,
    height: 180,
    resizeMode: 'cover',
  },
  form: {
    flex: 2,
    width: '85%',
    paddingTop: 50,
    alignSelf: 'center',
  },
  title: {
    color: theme.colors.green,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 50,
    paddingLeft: 5,
  },
  input: {
    width: '100%',
    height: 25,
    borderBottomColor: theme.colors.lightGray,
    borderBottomWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 12,
    color: theme.colors.lightGray,
    marginBottom: 15,
  },
  button: {
    width: '40%',
    height: 40,
    backgroundColor: theme.colors.blackish,
    borderRadius: 8,
    borderWidth : 2,
    borderColor: theme.colors.green,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40,
  },
  buttonText: {
    color: theme.colors.lightGray,
    fontSize: 12,
    fontWeight: 'bold',
  },
});