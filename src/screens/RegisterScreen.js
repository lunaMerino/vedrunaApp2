import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Alert } from 'react-native';
import { theme } from './theme';
import { auth } from './utils/Firebase';
import Button from './components/Button';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { API_IP, API_PORT } from '@env';

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
    const { email, password, confirmPassword, nick, name, lastName1, lastName2 } = form;

    if (!email || !password || !nick || !name || !lastName1 || !lastName2) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
     // Validación de contraseñas
     if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const firebaseUID = userCredential.user.uid;
      console.log('Usuario creado en Firebase:', firebaseUID);

      // Enviar datos del usuario a la base de datos
      const newUser = {
        nick,
        user_id: firebaseUID,
        nombre: name,
        apellidos: `${lastName1} ${lastName2}`,
        profile_picture: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fes.pngtree.com%2Ffree-png-vectors%2Favatar-de-usuario&psig=AOvVaw0WSQzs5fHLf6vaNzywnmAc&ust=1737744280207000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCOD07YrAjIsDFQAAAAAdAAAAABAJ',
      };
      // Pasar el UID como prop al siguiente componente
      // Alert.alert('firebaseUID antes de navegar:', firebaseUID);
      // navigation.navigate('Add', { user_id: firebaseUID }); 

      console.log('Datos enviados al backend:', newUser);
      const apiURL = `http://${API_IP}:${API_PORT}`;
       return fetch(`${apiURL}/proyecto01/users`, {
        // return fetch(`http://10.0.2.2:8080/proyecto01/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
        .then((response) => {
          console.log('Respuesta del servidor (status):', response.status); // Log para ver el código de estado HTTP
          return response.json().then((data) => {
            console.log('Respuesta del servidor (body):', data); // Log para ver el contenido de la respuesta
            if (response.ok) {
              Alert.alert('Registro exitoso', 'Usuario creado correctamente');
              navigation.navigate('Login');
            } else {
              throw new Error(data.message || 'Error al registrar en la base de datos');
            }
          });
        })
        .catch((error) => {
          console.error('Error al guardar en la base de datos:', error); // Log específico del backend
          Alert.alert('Error', `Error al guardar en la base de datos: ${error.message}`);
        });
    })
    .catch((error) => {
      console.error('Error al crear usuario en Firebase:', error); // Log específico de Firebase
      Alert.alert('Error', `Error al crear usuario en Firebase: ${error.message}`);
    });
};
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/register.png')}
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

        <View style={styles.foot}>
        <Button label='REGISTRARSE' onPress={handleSubmit} />
        </View>

        {/* <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}
          >FINALIZAR</Text>
        </TouchableOpacity> */}

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
  foot:{
    marginTop: 40,
  }
});