import { Alert,View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Keyboard, TouchableWithoutFeedback  } from 'react-native';
import React, { useState, useEffect } from 'react';
import { theme } from '../theme';
import Button from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';
import { API_IP, API_PORT } from '@env';

export function Add({ navigation, route }) {
  const apiURL = `http://${API_IP}:${API_PORT}`;
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { user_id } = route.params || {};
  const [titulo, setTitulo] = useState('');
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
  const newPubli = {
    user_id: user_id,
    image_url: imageUrl,
    titulo: titulo,
    comentario:descripcion,
    like: [],
  };
  try {
    // const response = await fetch(`${apiURL}/proyecto01/publicaciones`, {
    const response = await fetch(`http://10.0.2.2:8080/proyecto01/publicaciones`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPubli),
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
    alert("Publicación realizada con éxito.");
    navigation.navigate('Publicaciones');
  } catch (error) {
    console.error("Error al publicar:", error);
    alert("Hubo un error al realizar la publicación. Intenta nuevamente.");
  }
};

  

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* Header con título y botón para abrir el modal */}
        <View style={styles.header}>
          <Text style={styles.title}>PUBLICACIÓN</Text>
          {/* Mostrar botón solo si no hay una imagen seleccionada */}
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

        {/* Modal personalizado */}
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

        {/* Formulario de publicación */}
        <View style={styles.form}>
          <Text style={styles.title2}>Título:</Text>
          <TextInput
            style={styles.input}
            placeholder="Máx. 40 Caracteres"
            placeholderTextColor={theme.colors.darkGray}
            value={titulo}
            onChangeText={setTitulo}
          />
          <Text style={styles.title2}>Descripción:</Text>
          <TextInput
            style={styles.input}
            placeholder="Máx. 250 Caracteres"
            placeholderTextColor={theme.colors.darkGray}
            multiline={true}
            height={200}
            textAlignVertical="top"
            paddingTop={10}
            value={descripcion}
            onChangeText={setDescripcion}
          />
        </View>

        {/* Pie con botón publicar */}
        <View style={styles.foot}>
          <Button label="PUBLICAR" onPress={handleSubmit} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.blackish,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  header: {
    height: '45%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
    gap: 40,
  },
  title: {
    color: theme.colors.green,
    fontSize: 26,
    fontWeight: 'bold',
  },
  add: {
    borderRadius: 10,
    borderWidth: 4,
    borderColor: theme.colors.green,
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
    marginTop: 20,
    width: 180,
    height: 180,
    borderRadius: 10,
  },
  form: {
    height: '45%',
    width: '80%',
  },
  title2: {
    color: theme.colors.green,
    fontSize: 14,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: theme.colors.gray,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 12,
    color: theme.colors.lightGray,
    marginBottom: 20,
  },
  foot: {
    height: '10%',
    width: '100%',
  },
   modalContent: {
    gap: 20, 
  },
  modalTitle: {
    color: theme.colors.green,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: theme.colors.gray,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  closeButtonText: {
    color: theme.colors.blackish,
    fontSize: 16,
    fontWeight: 'bold',
  },
});