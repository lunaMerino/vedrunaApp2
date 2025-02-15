import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { theme } from './theme';
import { auth } from './utils/Firebase.js';
import { signInWithEmailAndPassword } from "firebase/auth";
export function LoginScreen({ navigation }) {
  
  // const [email, setEmail] = useState('usuario23@gmail.com');
  // const [password, setPassword] = useState('usuario23');
  const [email, setEmail] = useState('hugo25@gmail.com');
  const [password, setPassword] = useState('123456');


  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor, introduce correo y contraseña');
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const firebaseUID = userCredential.user.uid;
        navigation.navigate('Tab', { user_id: firebaseUID });
      })
      .catch((error) => {
        Alert.alert('Error', error.message);
      });
  };
  return (
    
    <View style={styles.container}>
      <View style={styles.header}>

        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />

        <View>
          <Text style={styles.title}>VEDRUNA</Text>
          <Text style={styles.title}>EDUCACIÓN</Text>
        </View>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <View style={styles.fields}>
            <TextInput
              style={styles.input}
              placeholder="Introduzca su correo o nick..."
              placeholderTextColor={theme.colors.darkGray}
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Introduzca su contraseña..."
              placeholderTextColor={theme.colors.darkGray} 
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <Text style={styles.forgotPassword}>¿Olvidaste la contraseña?</Text>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}
            >Log in</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.createAccountContainer}>
          <Text style={styles.createAccount}>
            ¿No tienes cuenta?
            </Text>

          <Text style={styles.createAccountLink}
            onPress={() => navigation.navigate('Register')}
            >Crear cuenta
          </Text>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.blackish,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    marginTop: 30,
    marginBottom: 20,
    width: 200,
    height: 200,
  },
  title: {
    color: theme.colors.lightGray,
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'AsapCondensed-Regular',
  },
  form: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  inputContainer: {
    flex: 1,
    width: '80%',
    alignSelf: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: theme.colors.gray,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontFamily: 'Rajdhani_600SemiBold',
    fontSize: 14,
    alignSelf: 'center',
    color: theme.colors.lightGray,
  },
  fields: {
    gap: 30,
  },
  forgotPassword: {
    color: theme.colors.green,
    fontSize: 14,
    alignSelf: 'flex-end',
    fontFamily: 'Rajdhani_600SemiBold',
    marginTop: 15,
    marginBottom: 30,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: theme.colors.green,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Rajdhani_600SemiBold',
    marginBottom: 20,
  },
  buttonText: {
    color: theme.colors.blackish,
    fontSize: 14,
    fontWeight: 'bold',
  },
  createAccountContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: theme.colors.gray,
    borderTopWidth: 1,
    height: 70,
    flexDirection: 'row',
    gap: 6
  },
  createAccount: {
    color: theme.colors.lightGray,
    fontFamily: 'Rajdhani_600SemiBold',
    fontSize: 14,
  },
  createAccountLink: {
    color: theme.colors.green,
    fontWeight: 'bold',
    fontFamily: 'Rajdhani_600SemiBold',
    fontSize: 14,
  },
});