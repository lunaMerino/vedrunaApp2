import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Image, TouchableOpacity, Alert } from "react-native";
import { theme } from "../theme";
import { API_IP, API_PORT } from "@env";

const apiURL = `http://${API_IP}:${API_PORT}`;

const LikeButton = ({ item, userId }) => {
  const [liked, setLiked] = useState(false); // Estado para saber si el usuario ya dio like
  const [likesCount, setLikesCount] = useState(Array.isArray(item.like) ? item.like.length : 0); // Contador de likes, asegurándonos de que `item.like` sea un array
  const [loading, setLoading] = useState(false); 
  
  // Verificar si el usuario ya ha dado like
  useEffect(() => {
    const checkIfLiked = () => {
      if (!item || !Array.isArray(item.like)) {
        console.error("El item no contiene la propiedad 'like' o no es un array.");
        return;
      }

      if (!userId) {
        console.error("userId no válido");
        return;
      }

      const isLiked = item.like.includes(userId);
      setLiked(isLiked);
    };

    checkIfLiked();
  }, [item, userId]);

  // Manejar el like
  const handleLike = async () => {
    if (loading) return; // Evitar hacer múltiples solicitudes al mismo tiempo
    setLoading(true);

    try {
      if (!item || !item.id || !userId) {
        throw new Error("Faltan datos necesarios para realizar la solicitud.");
      }

      // Crear el objeto de la publicación con el userId en el array de likes
      const updatedItem = {
        ...item,
        like: item.like.includes(userId) ? item.like : [...item.like, userId], // Aseguramos que no se duplique el userId
      };


      const likeUrl = `${apiURL}/put/${item.id}`;

      // Realizar la solicitud PUT para actualizar la publicación
      const response = await fetch(likeUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        const responseText = await response.text();
        console.error("Error al dar like:", responseText);
        throw new Error("Error al dar like: " + response.statusText);
      }

      // Obtener la publicación actualizada desde el servidor
      const newPost = await response.json();

      // Actualizar y verificar si el id esta en el array de lkes
      setLiked(newPost.like.includes(userId));
      setLikesCount(newPost.like.length);

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
      disabled={loading}
    >
      <Image
        source={require("../../../assets/megusta.png")}
        style={[styles.like, { tintColor: liked ? theme.colors.green : theme.colors.lightGray }]}
      />
      <Text style={styles.titleLike}>
        {likesCount > 0 ? `${likesCount} Me gusta` : 'Me gusta'}
      </Text>
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
