import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { theme } from '../theme'; // Asegúrate de tener un tema global definido

const ComentariosModal = ({ visible, onClose, onSubmit }) => {
  const [comentario, setComentario] = useState('');

  const handlePublicar = () => {
    if (comentario.trim() !== '') {
      onSubmit(comentario); // Llama a la función para manejar el comentario
      setComentario(''); // Limpia el campo de texto
      onClose(); // Cierra el modal
    } else {
      alert('Por favor, escribe un comentario.');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose} // Cierra el modal al presionar el botón de atrás
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Comentario:</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Máx. 500 Caracteres"
            placeholderTextColor='#ffff'
            multiline
            maxLength={500}
            value={comentario}
            onChangeText={setComentario}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>CANCELAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.publishButton]}
              onPress={handlePublicar}
            >
              <Text style={styles.buttonText}>PUBLICAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#23272A',
    borderRadius: 10,
    padding: 20,
    height: 531,
    justifyContent: 'center',
    borderColor: '#9FC63B',
    borderWidth: 1
  },
  modalTitle: {
    fontSize: 18,
    color: '#9FC63B',
    marginBottom: 30,
  },
  textInput: {
    backgroundColor: '#323639',
    color: '#ffff',
    borderRadius: 10,
    padding: 10,
    height: 274,
    textAlignVertical: 'top',
    marginBottom: 60,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },

  publishButton: {
    borderColor: '#9FC63B',
    borderWidth: 2
  },

  buttonText: {
    color: '#ffff',
    fontWeight: 'bold',
    fontSize: 18
  },
});

export default ComentariosModal;
