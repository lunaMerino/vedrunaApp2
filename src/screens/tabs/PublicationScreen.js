import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { theme } from '../theme';
import Button from '../components/Button';
import * as ImagePicker from 'expo-image-picker';
import Modal from 'react-native-modal';

export function PublicationScreen() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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

  return (
    <View style={styles.container}>
      {/* Header con título y botón para abrir el modal */}
      <View style={styles.header}>
        <Text style={styles.title}>PUBLICACIÓN</Text>
        <TouchableOpacity style={styles.add} onPress={toggleModal}>
          <Image
            source={require('../../../assets/contacts.png')}
            style={styles.imageButton}
          />
        </TouchableOpacity>
      </View>

      {/* Mostrar imagen seleccionada */}
      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
      )}

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
        />
      </View>

      {/* Pie con botón publicar */}
      <View style={styles.foot}>
        <Button label="PUBLICAR" onPress={() => {}} />
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
    width: 200,
    height: 200,
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
