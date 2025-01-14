import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { theme } from './theme';

export function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Header Image */}
        <Image
          source={{ uri: 'https://s3-alpha-sig.figma.com/img/5cc2/326e/4b369d5d71efbfa1f6961ee2c182d04d?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=bSZH416UOGXhA4Aliq3e7Kv8LGHYJnn~q~PRmBPfS1u~nsu8DlI~ezms5OkF~alNWW7z7ODkGyg4Lp6cWEBMJZQP-drMkdkbjojQe9-5e3TNeUA9XEMHiyuk~eloimj3eqUBtxLh7jDRbe2nbW01lwTKcHWFLUXRAxUYIqD0-fy4fzEYfuC-MMUhbyf-~z0iaEe5uAupKA-2~ml8Hk8SXhslWOylshxneyocMhf0ZaLe2YaLZgXdUuDqogUjxuKzGxIICSCV6KruHySgvSwtrEC~9iZUms~LDY0yPtgYPJDrn6mz-2sDRNUE7PlWc5F7-cdk4k2GkGNR8jZzXD1thg__' }}
          style={styles.logo}
        />

        {/* Title */}
        <Text style={styles.title}>VEDRUNA EDUCACIÓN</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <View style={styles.fields}>
            {/* Input Fields */}
            <TextInput
              style={styles.input}
              placeholder="Introduzca su correo o nick..."
              placeholderTextColor={theme.colors.darkGray} 
            />
            <TextInput
              style={styles.input}
              placeholder="Introduzca su contraseña..."
              placeholderTextColor={theme.colors.darkGray} 
              secureTextEntry
            />
          </View>

          {/* Forgot Password */}
          <Text style={styles.forgotPassword}>¿Olvidaste la contraseña?</Text>

          {/* Login Button */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}
            onPress={() => navigation.navigate('Tab')}
            >Log in</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.createAccountContainer}>
        {/* Create Account */}
          <Text style={styles.createAccount}>
            ¿No tienes cuenta?
            <Text style={styles.createAccountLink}
              onPress={() => navigation.navigate('Register')}
              >Crear cuenta</Text>
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
    fontFamily: 'AsapCondensed-Regular'
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
    fontSize: 12,
    alignSelf: 'center',
    color: theme.colors.lightGray,
  },
  fields: {
    gap: 30,
  },
  forgotPassword: {
    color: theme.colors.green,
    fontSize: 10,
    alignSelf: 'flex-end',
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
    marginBottom: 20,
  },
  buttonText: {
    color: theme.colors.blackish,
    fontSize: 12,
    fontWeight: 'bold',
  },
  createAccountContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: theme.colors.gray,
    borderTopWidth: 1,
    height: 70,
  },
  createAccount: {
    color: theme.colors.lightGray,
    fontSize: 10,
  },
  createAccountLink: {
    color: theme.colors.green,
    fontWeight: 'bold',
    fontSize: 10,
  },
});