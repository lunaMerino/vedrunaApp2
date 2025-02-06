import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { theme } from "../theme";
import { API_IP, API_PORT } from "@env";

const apiURL = `http://${API_IP}:${API_PORT}`;

const LikeButton = ({ item, userId }) => {
  const [liked, setLiked] = useState(false); // Estado para saber si el usuario ya dio like
  const [likesCount, setLikesCount] = useState(item.like ? item.like.length : 0); // Contador de likes, asegurándose que `item.like` existe
  const [loading, setLoading] = useState(false); // Estado de carga mientras se actualizan los likes

  // Verificar si el usuario ya ha dado like
  useEffect(() => {
    const checkIfLiked = () => {
      if (!item || !item.like) {
        console.error("El item no contiene la propiedad 'like'.");
        return;
      }
  
      if (!userId) {
        console.error("userId no válido");
        return; // No hacer nada si userId es inválido
      }
  
      const isLiked = item.like.includes(userId);
      setLiked(isLiked);
    };
  
    checkIfLiked(); // Realizar la comprobación solo una vez cuando el componente se renderiza
  }, [item, userId]);

  // Manejar el like
  const handleLike = async () => {
    if (loading) return; // Evitar hacer múltiples solicitudes al mismo tiempo
    setLoading(true);

    try {
      if (!item || !item.id || !userId) {
        throw new Error("Faltan datos necesarios para realizar la solicitud.");
      }

      const likeUrl = `${apiURL}/put/${item.id}/${userId}`;
      console.log("Haciendo solicitud PUT a:", likeUrl); // Verificamos la URL

      // Realizar la petición para dar like o quitarlo
      const response = await fetch(likeUrl, {
        method: "PUT",
      });

      Alert.alert("Respuesta del servidor:", response); // Verificamos la respuesta

      if (!response.ok) {
        const responseText = await response.text();
        console.error("Error al dar like:", responseText); // Mostramos el mensaje de error del backend
        throw new Error("Error al dar like: " + response.statusText);
      }

      // Alternar el estado de "liked" y actualizar el número de likes
      setLiked((prevLiked) => {
        const newLikeStatus = !prevLiked;
        setLikesCount((prevLikesCount) => prevLikesCount + (newLikeStatus ? 1 : -1));
        return newLikeStatus;
      });
    } catch (error) {
      console.error("Error al dar like:", error);
      Alert.alert("Error", "Hubo un problema al actualizar tu like. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableOpacity
      style={styles.contLike}
      onPress={handleLike}
      disabled={loading} // Deshabilitar el botón mientras está en proceso de actualización
    >
      <Image
        source={require("../../../assets/megusta.png")}
        style={[styles.like, { tintColor: liked ? theme.colors.green : theme.colors.lightGray }]}
      />
      <Text style={styles.titleLike}>{likesCount} Me gusta</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contLike: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  like: {
    width: 20,
    height: 20,
  },
  titleLike: {
    color: theme.colors.lightGray,
  },
});

export default LikeButton;
