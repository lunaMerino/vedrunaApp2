import { View, StyleSheet, Text, TouchableOpacity, Image, TextInput } from 'react-native'
import Button from '../components/Button'
import React, { useState, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import { theme } from '../theme';
import { API_IP, API_PORT } from '@env';


export function AddIncidencia({ navigation }) {
  const apiURL = `http://${API_IP}:${API_PORT}`;
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [numero, setNumero] = useState('');
  const [descripcion, setDescripcion] = useState('');


  // Solicitar permisos al iniciar la app
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        alert('Se requieren permisos para acceder a la cámara');
      }
    };
    requestPermissions();
  }, []);

  // Alternar visibilidad del modal
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  // Manejar selección de imagen desde cámara o galería
  const handleImagePick = async (source) => {
    let result;
    try {
      if (source === 'camera') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          alert('Se requieren permisos para usar la cámara');
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          quality: 1,
        });
      }

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error al seleccionar imagen:', error);
    } finally {
      toggleModal(); // Cierra el modal al seleccionar la imagen
    }
  };

  // Subir imagen a Cloudinary
  const uploadToCloudinary = async (imageUri) => {
  const data = new FormData();
  const cloudName = 'dtnbwqv9k';
  const uploadPreset = 'presetAppVedruna'; // Configurado en tu cuenta de Cloudinary

  // Adjuntar la imagen
  data.append('file', {
    uri: imageUri,
    type: 'image/jpeg', // Ajusta según el formato de la imagen
    name: 'photo.jpg',
  });
  data.append('upload_preset', uploadPreset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: data,
      });

      const result = await response.json();
      if (result.secure_url) {
        console.log('Imagen subida a Cloudinary:', result.secure_url);
        saveToDatabase(result.secure_url);
      } else {
        console.error('Error subiendo a Cloudinary:', result);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Guardar URL en MongoDB
  const saveToDatabase = async (imageUrl) => {
    const newIncidencia = {
      incidencia_picture: imageUrl,
      numero: numero,
      titulo: titulo,
      comentario:descripcion,
      estado: 'EN TRÁMITE'
    };

    try {
      // const response = await fetch(`${apiURL}/proyecto01/incidencias`, {
      const response = await fetch(`http:10.0.2.2:8080/proyecto01/incidencias`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newIncidencia),
      });

      const result = await response.json();
      console.log('URL guardada en MongoDB:', result);
    } catch (error) {
      console.error('Error guardando en la base de datos:', error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage) {
      alert("Por favor, selecciona una imagen antes de publicar.");
      return;
    }
  
    try {
      // Subir imagen a Cloudinary
      await uploadToCloudinary(selectedImage);
      navigation.navigate('FlatListIncidencias');
    } catch (error) {
      console.error("Error al publicar:", error);
      alert("Hubo un error al realizar la publicación. Intenta nuevamente.");
    }
  };


  return (
    <View style={styles.container}>

      <View style={styles.inicio}>
      <Text style={styles.titulo}>INCIDENCIA</Text>
      {!selectedImage ? (
        <TouchableOpacity style={styles.add} onPress={toggleModal}>
          <Image
            source={require('../../../assets/contacts.png')}
            style={styles.imageButton}
          />
        </TouchableOpacity>
      ) : (
        // Mostrar la imagen seleccionada
        <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
      )}
      </View>
      <Modal
          isVisible={isModalVisible}
          backdropOpacity={0.5}
          animationIn="fadeIn"
          animationOut="fadeOut"
          onBackdropPress={toggleModal} // Cierra el modal al tocar fuera
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona una opción</Text>
            <Button label='Tomar Foto' onPress={() => handleImagePick('camera')} />
            <Button label='Elegir de la galeria' onPress={() => handleImagePick('gallery')} />
          </View>
        </Modal>

      <View style={styles.form}>
        <Text style={styles.title2}>Nº del equipo / clase:</Text>
        <TextInput
          style={styles.input}
          placeholderTextColor='#D9D9D9'
          value={numero}
          onChangeText={setNumero}
        />
        <Text style={styles.title2}>Título:</Text>
        <TextInput
          style={styles.input}
          placeholder="Máx. 40 Caracteres"
          placeholderTextColor='#D9D9D9'
          value={titulo}
          onChangeText={setTitulo}
        />
        <Text style={styles.title2}>Descripción:</Text>
        <TextInput
          style={styles.input}
          placeholder="Máx. 250 Caracteres"
          placeholderTextColor='#D9D9D9'
          multiline={true}
          height={200}
          textAlignVertical="top"
          paddingTop={10}
          value={descripcion}
          onChangeText={setDescripcion}
        />
      </View>

      
      <TouchableOpacity
        style={styles.boton}
        onPress={() => handleSubmit()}
      >
        <Text style={styles.enviar}>ENVIAR</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272A',
    alignItems: 'center',
    justifyContent: 'center',
  },


  // inicio
  inicio: {
    alignItems: 'center',
    gap: 25,
  },


  // foto
  modalContent: {
    gap: 20, 
  },

  modalTitle: {
    color: theme.colors.green,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // titulo
  titulo: {
    color: '#9FC63B',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: '-30'
  },

  // contenedor añadir foto
  add: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#9FC63B',
    height: 180,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
  },

  imageButton: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },

  imagePreview: {
    marginTop: 10,
    width: 180,
    height: 180,
    borderRadius: 10,
  },

  // formulario
  form: {
      height: '45%',
      width: '80%',
      marginTop: 40
  },

  title2: {
    color: '#9FC63B',
    fontSize: 18,
    marginBottom: 10,
  },

  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#323639',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 12,
    color: '#d9d9d9',
    marginBottom: 20,
  },


  // boton
  boton: {
    marginTop: 70,
    marginBottom: '-40',
    borderWidth: 2,
    borderColor: '#9FC63B',
    borderRadius: 8
  },

  enviar: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#d9d9d9',
    paddingHorizontal: 45,
    paddingVertical: 5
  },

})