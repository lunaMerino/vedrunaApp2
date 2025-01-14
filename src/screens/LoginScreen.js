import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';

export function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header Image */}
      <Image
        source={{ uri: 'https://s3-alpha-sig.figma.com/img/5cc2/326e/4b369d5d71efbfa1f6961ee2c182d04d?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bSZH416UOGXhA4Aliq3e7Kv8LGHYJnn~q~PRmBPfS1u~nsu8DlI~ezms5OkF~alNWW7z7ODkGyg4Lp6cWEBMJZQP-drMkdkbjojQe9-5e3TNeUA9XEMHiyuk~eloimj3eqUBtxLh7jDRbe2nbW01lwTKcHWFLUXRAxUYIqD0-fy4fzEYfuC-MMUhbyf-~z0iaEe5uAupKA-2~ml8Hk8SXhslWOylshxneyocMhf0ZaLe2YaLZgXdUuDqogUjxuKzGxIICSCV6KruHySgvSwtrEC~9iZUms~LDY0yPtgYPJDrn6mz-2sDRNUE7PlWc5F7-cdk4k2GkGNR8jZzXD1thg__' }}
        style={styles.logo}
      />

      {/* Title */}
      <Text style={styles.title}>VEDRUNA EDUCACIÓN</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Introduzca su correo o nick..."
        placeholderTextColor="#AAAAAA"
      />
      <TextInput
        style={styles.input}
        placeholder="Introduzca su contraseña..."
        placeholderTextColor="#AAAAAA"
        secureTextEntry
      />

      {/* Forgot Password */}
      <Text style={styles.forgotPassword}>¿Olvidaste la contraseña?</Text>

      {/* Login Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      {/* Create Account */}
      <Text style={styles.createAccount}>
        ¿No tienes cuenta? <Text style={styles.createAccountLink}>Crear cuenta</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F1F1F',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#333333',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: 'white',
    fontSize: 16,
    marginBottom: 15,
  },
  forgotPassword: {
    color: '#AAAAAA',
    fontSize: 14,
    alignSelf: 'flex-end',
    marginBottom: 30,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#9FC63B',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createAccount: {
    color: '#AAAAAA',
    fontSize: 14,
  },
  createAccountLink: {
    color: '#9FC63B',
    fontWeight: 'bold',
  },
});