import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Alert } from 'react-native';
import { theme } from './theme';
import { auth } from './utils/Firebase';
import Button from './components/Button';
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

      console.log('Datos enviados al backend:', newUser);

       return fetch('http://192.168.1.23:8080/proyecto01/users', {
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
          console.error('Error en el fetch:', error); // Log para capturar errores en el fetch
          Alert.alert('Error', `Error al guardar en la base de datos: ${error.message}`);
        });
    })
    .catch((error) => {
      console.error('Error al crear usuario en Firebase:', error); // Log para errores en Firebase
      Alert.alert('Error', `Error al crear usuario: ${error.message}`);
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