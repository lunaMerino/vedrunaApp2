import { View, Text, StyleSheet, Image, ImageBackground, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import { theme } from '../theme'
import LikeButton from '../components/LikeButton';
import { API_IP, API_PORT } from '@env';
import ComentariosModal from '../components/ComentariosModal'; // Importa el componente
import { FlatList, Pressable, ScrollView } from 'react-native-gesture-handler';



export function Publi({ route, navigation }) {
  const apiURL = `http://${API_IP}:${API_PORT}`;

  const { post, user_id } = route.params; // Datos de la publicación
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true); // Estado de carga
  const [newComment, setNewComment] = useState(''); // Comentario nuevo
  const [modalVisible, setModalVisible] = useState(false);
  const [refresh, setRefresh] = useState(false); // Estado para forzar la recarga

  console.log("🟢 user_id en Publi:", user_id);


  // Obtener todos los usuarios
  const fetchAllUsers = async () => {
    try {
      // const response = await fetch(`${apiURL}/proyecto01/users/name`);
      const response = await fetch(`http://10.0.2.2:8080/proyecto01/users/name`);
      if (!response.ok) throw new Error(`Error al obtener usuarios: ${response.status}`);
    
      const users = await response.json();
      // console.log("✅ Usuarios obtenidos:", users);
      return users;
    } catch (error) {
      console.error("error al obtener usuario",error);
      return [];
    }
  };

  // Obtener los comentarios y asociarlos con el nick del usuario
  useEffect(() => {
    const fetchCommentsWithUsers = async () => {
      try {
        // const response = await fetch(`${apiUrl}/proyecto01/comentarios/${post.id}`);
        const response = await fetch(`http://10.0.2.2:8080/proyecto01/comentarios/${post.id}`);
        if (!response.ok) throw new Error(`Error al obtener comentarios: ${response.status}`);
        const commentsData = await response.json();

        const allUsers = await fetchAllUsers(); // Obtener usuarios
        console.log("🔍 Usuarios cargados:", allUsers);

        console.log("✅ Todos los usuarios:", allUsers); // Verifica todos los usuarios
        console.log("✅ Comentarios obtenidos:", commentsData); // Verifica los comentarios

        // Asociar cada comentario con su usuario correspondiente
        const commentsWithUsers = commentsData.map((comment) => {
          // const userData = allUsers.find(user => user.id === comment.user_id);
          const userData = allUsers.find(user => String(user.user_id) === String(comment.user_id));
          
          console.log(`🔍 Comentario con user_id: ${comment.user_id}, Usuario encontrado:`, userData);

          return {
            ...comment,
            nick: userData ? userData.nick : 'Usuario desconocido'
          };
        });

        setComment(commentsWithUsers);
      } catch (error) {
        console.error(error);
        alert('Hubo un problema al cargar los comentarios.');
      } finally {
        setLoading(false);
      }
    };

    fetchCommentsWithUsers();
  }, [post.id, refresh]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        // const response = await fetch(`${apiURL}/proyecto01/comentarios/${post.id}`);
        const response = await fetch(`http://10.0.2.2:8080/proyecto01/comentarios/${post.id}`);
        if (!response.ok) {
          throw new Error(`Error al obtener comentarios: ${response.status}`);
        }
        const data = await response.json();
        setComment(data);

      } catch (error) {
        console.error(error.message);
        alert('Hubo un problema al cargar los comentarios.');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [post.id, refresh]);

   // Manejar el añadir un nuevo comentario
   const handleAddComment = async (newComment) => {
    console.log("🛠️ handleAddComment fue llamado");
    console.log("⏳ Intentando enviar comentario:", newComment);
    if (!newComment || typeof newComment !== "string") {
      console.error("❌ Error: `newComment` es inválido:", newComment);
      alert("El comentario es inválido.");
      return;
    }

    console.log("✅ Comentario recibido, intentando enviarlo...");
  

    const commentData = {
      user_id,
      idPublicacion: post.id,
      comentario: newComment,
    };

    console.log("📤 Enviando datos:", commentData);

    try {
      // const response = await fetch(`${apiURL}/proyecto01/comentarios/put`, {
      const response = await fetch(`http://10.0.2.2:8080/proyecto01/comentarios/put`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
      });
      
      console.log("📥 Respuesta del servidor:", response); 

      if (!response.ok) {
        throw new Error(`Error al guardar el comentario: ${response.status}`);
      }

      const savedComment = await response.json();
      console.log("✅ Comentario guardado correctamente:", savedComment);

      setComment((prev) => [...prev, savedComment]); // Actualiza la lista de comentarios
      setNewComment('');
      setModalVisible(false); // Cierra el modal
      setRefresh(prev => !prev); // 🔄 Fuerza la recarga de comentarios
    } catch (error) {
      console.error(error.message);
      alert('Hubo un problema al guardar el comentario. Inténtalo de nuevo.');
    }
  };



  //Calcular días desde la publicación
  const getDaysAgo = (createdAt) => {
    if (!createdAt) return "Fecha desconocida";
  
    let createdDate = new Date(createdAt);
    if (isNaN(createdDate.getTime())) return "Fecha inválida";
  
    const currentDate = new Date();
  
    // console.log("🔵 createdAt recibido:", createdAt);
    // console.log("🟢 createdDate (convertido):", createdDate);
    // console.log("🟡 currentDate (ahora):", currentDate);
  
    let diffInTime = currentDate - createdDate; // Diferencia en milisegundos
    // console.log("🔴 Diferencia en ms:", diffInTime);
  
    // Evitar números negativos
    if (diffInTime < 0) return "Hace 0 segundos";
  
    const diffInSeconds = Math.floor(diffInTime / 1000);
    // console.log("🟣 Diferencia en segundos:", diffInSeconds);
  
    if (diffInSeconds < 60) return `Hace ${diffInSeconds} segundos`;
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `Hace ${diffInMinutes} minutos`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Hace ${diffInHours} horas`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `Hace ${diffInDays} días`;
  };





  const daysAgo = getDaysAgo(post.createdAt); 

  return (
    <ScrollView>
    <View style={styles.container}>

      <View style={styles.contHeaderPubli}>
        <Pressable
          onPress={() => navigation.navigate('FlatListPubli')}
        >
          <Image 
            source={require("../../../assets/volver_atras.png")}
            style= {styles.flecha}
          />
        </Pressable>
        <View style={styles.avatarBase}>
          <Image
            source={require('../../../assets/avatar.jpeg')}
            style={styles.avatar}
          />
        </View>
        <View style={styles.texts}>
          <Text style={styles.title2}>Publicado por</Text>
          <Text style={styles.title3}>{post.nombre}</Text>
        </View>
      </View>

      <ImageBackground
        source={{ uri: post.image_url }}
        style={styles.publicationImage}
      >
      </ImageBackground>

      <View style={styles.body}>
        {/* <LikeButton {item={item}} userId={post.user_id} /> */}
        <Text style={styles.title}>{post.titulo}</Text>
        <Text style={styles.titleDescription}>{post.comentario}</Text>
        <Text style={styles.titleTime}> {daysAgo} </Text>
      </View>

      <View style={styles.botonAñadir}>
        <TouchableOpacity 
          style={styles.botonAddComentario}
          onPress={() => setModalVisible(true)}
        >
          <Image
            source={require('../../../assets/addComentario.png')}
            style={styles.imgAdd}
          />
           {/* Componente del Modal */}
          <ComentariosModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSubmit={handleAddComment}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.seccionComentarios}>
        <Text style={styles.comentario}>COMENTARIOS</Text>
        <FlatList
          data={comment}
          keyExtractor={(item) => item.id.toString()}
          ListEmptyComponent={<Text style={styles.noComments}>No hay comentarios</Text>}
          renderItem={({ item }) => (
            <View style={styles.informacionComentario}>
              <View style={styles.avatarBase}>
                <Image
                  source={require('../../../assets/avatar.jpeg')}
                  style={styles.avatar}
                />
              </View>
              <View style={styles.datos}>
              <Text style={styles.username}>{item.nick}</Text>
              <Text style={styles.commentText}>{item.comentario}</Text>
              </View>
            </View>
          )}
          scrollEnabled={false}  
        />
      </View>

    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#23272a',
    justifyContent: 'center',
    gap: 30,
  },

  contHeader: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },

  contHeaderPubli: {
    // flex: 1,
    flexDirection: 'row',
    width: '100%',
    marginTop: 50,
    paddingLeft: 20,
    gap: 20,
  },

  flecha:{
    marginTop: 10
  },
  
  contPubli: {
    height: 380,
    width: '100%',
  },



  // avatar del perfil
  avatarBase: {
    width: 60,
    height: 60,
    backgroundColor: theme.colors.green,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 50,
  },



  // apartado de "publicado por"
  texts: {
    flexDirection: 'column',
    color: '#ffff',
    marginTop: 5
  },

  title2: {
    color: theme.colors.lightGray,
    fontSize: 12,
  },

  title3: {
    color: theme.colors.lightGray,
    fontSize: 20,
    fontWeight: 'bold',
  },


  // foto publicacion
  publicationImage: {
    width: '100%',
    height: 380,
    marginBottom: 10,
    marginTop: '-30'
  },

  body: {
    paddingHorizontal: 30,
    paddingTop: 15,
  },

  

  title: {
    color: theme.colors.green,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  
  titleDescription: {
    color: theme.colors.lightGray,
  },

  titleTime: {
    color: theme.colors.lightGray,
    fontSize: 12,
    marginTop: 20,
    color: '#868686'
  },

  addComment: {
    width: 50,
    height: 50,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },


  // seccion comentarios
  comentario: {
    color: '#9FC63B',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },

  seccionComentarios: {
    paddingHorizontal: 30,
    marginBottom: 20
  },



  // like
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


  // boton añadir comentario
  botonAñadir: {
    alignItems: 'flex-end',
    marginVertical: '-40',
    marginHorizontal: 30
  },

  botonAddComentario: {
    backgroundColor: '#9FC63B',
    height: 63,
    width: 63,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40
  },

  imgAdd: {
    width: 31,
    height: 31
  },
  

  // estructura de comentarios

  informacionComentario:{
    marginBottom: 20,
    flexDirection: 'row',
    gap: 10
  },

  datos: {
    flexDirection: 'column'
  },

  username: {
    color: '#ffff'
  },

  commentText: {
    color: '#868686'
  },

  noComments:{
    marginBottom: '18%'
  },

});

