import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { theme } from './theme';
import { auth } from './utils/Firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";

export function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    nick: '',
    name: '',
    lastName1: '',
    lastName2: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    const { email, password, nick, name, lastName1, lastName2 } = form;

    if (!email || !password || !nick || !name || !lastName1 || !lastName2) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert('Registro exitoso', 'Usuario creado correctamente');
        console.log('Usuario registrado:', { nick, name, lastName1, lastName2 });
        navigation.navigate('Login');
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://s3-alpha-sig.figma.com/img/72d7/b319/4b4d43937556f9dedd4e2670fb4a1c44?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TbzD5fH71Ygw~ry45ZfxYueUUHazW8iwK1vc4zyhggjAMbpvdzkoy8m6UmrJ1g~cOi35bwg~Plr5V9wZWqOyLaFY~TVZXY1Fm7NCxqIt0tZf2Gqgcjx52WxxkQCulWbTENnDByWllb4cufsRRDgnCUV8HoUXMEO1WHMCdgmrm-yZSjtAR2PfJ9ettDSSANkghKOVeOMlRNiTVllDzY3f3E~Bo0eEPfXsbJeYw-OxcJxz6eGKAnhYgVPxoHvTtwvkVuoAdkT79iGs4f-2ZXKvT0bX3uHpbwZdKtoCW2Y6LxO-PYyB4stihhUGFyDHoGBD12zlma8W1KGeB-P3H4rhIA__' }}
          style={styles.image}
        />
      </View>
      
      <View style={styles.form}>
        <Text style={styles.title}>Completar los siguientes campos:</Text>
        <TextInput
          style={styles.input}
          placeholder="Introduzca su correo"
          placeholderTextColor={theme.colors.darkGray}
          value={form.email}
          onChangeText={(value) => handleInputChange('email', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Introduzca contraseña"
          placeholderTextColor={theme.colors.darkGray}
          value={form.password}
          onChangeText={(value) => handleInputChange('password', value)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Repita contraseña"
          placeholderTextColor={theme.colors.darkGray}
          value={form.confirmPassword}
          onChangeText={(value) => handleInputChange('confirmPassword', value)}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Introduzca su nick"
          placeholderTextColor={theme.colors.darkGray}
          value={form.nick}
          onChangeText={(value) => handleInputChange('nick', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Introduzca su nombre"
          placeholderTextColor={theme.colors.darkGray}
          value={form.name}
          onChangeText={(value) => handleInputChange('name', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Introduzca su primer apellido"
          placeholderTextColor={theme.colors.darkGray}
          value={form.lastName1}
          onChangeText={(value) => handleInputChange('lastName1', value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Introduzca su segundo apellido"
          placeholderTextColor={theme.colors.darkGray}
          value={form.lastName2}
          onChangeText={(value) => handleInputChange('lastName2', value)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}
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