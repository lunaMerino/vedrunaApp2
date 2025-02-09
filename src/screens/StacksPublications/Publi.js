import { View, Text, StyleSheet, Image, ImageBackground, Modal, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import { theme } from '../theme'
import LikeButton from '../components/LikeButton';
import { API_IP, API_PORT } from '@env';
import ComentariosModal from '../components/ComentariosModal'; // Importa el componente
import { FlatList } from 'react-native-gesture-handler';



export function Publi({ route }) {
  const apiURL = `http://${API_IP}:${API_PORT}`;

  const { post } = route.params; // Datos de la publicación
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true); // Estado de carga
  const [newComment, setNewComment] = useState(''); // Comentario nuevo
  const [modalVisible, setModalVisible] = useState(false);


      // Obtener los comentarios al cargar el componente
  useEffect(() => {
    const fetchComments = async () => {
      try {
        // const response = await fetch(`${apiURL}/proyecto01/comentarios/${post.id}`);
        const response = await fetch(`http://localhost:8080/proyecto01/comentarios/${post.id}`);
        if (!response.ok) {
          throw new Error(`Error al obtener comentarios: ${response.status}`);
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error(error.message);
        alert('Hubo un problema al cargar los comentarios.');
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [post.id]);


   // Manejar el añadir un nuevo comentario
   const handleAddComment = async () => {
    if (!newComment.trim()) {
      alert('Por favor, escribe un comentario.');
      return;
    }

    const commentData = {
      user_id: post.user_id, // Cambia esto si tienes el ID del usuario actual almacenado
      idPublicacion: post.id,
      comentario: newComment,
    };

    try {
      const response = await fetch(`http://localhost:8080/proyecto01/comentarios/put`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error(`Error al guardar el comentario: ${response.status}`);
      }

      const savedComment = await response.json();
      setComments((prev) => [...prev, savedComment]); // Actualiza la lista de comentarios
      setNewComment('');
      setModalVisible(false); // Cierra el modal
    } catch (error) {
      console.error(error.message);
      alert('Hubo un problema al guardar el comentario. Inténtalo de nuevo.');
    }
  };



  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
  



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
    <View style={styles.container}>

      <View style={styles.contHeaderPubli}>
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
          data={comments}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={<Text style={styles.noComments}>No hay comentarios.</Text>}
          renderItem={({ item }) => (
            <View>
              <Text style={styles.username}>{item.nombre}</Text>
              <Text style={styles.commentText}>{item.comentario}</Text>
            </View>
          )}
        />
      </View>

    </View>
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
    // alignItems: 'center',
    width: '100%',
    marginTop: 10,
    paddingLeft: 20,
    gap: 20,
  },
  
  contPubli: {
    height: 380,
    width: '100%',
    // borderBlockColor: theme.colors.green,
    // borderBottomWidth: 2
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
    fontWeight: 'bold'
  },

  seccionComentarios: {
    paddingHorizontal: 30
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
  
});


























// import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { useRoute } from '@react-navigation/native';
// import { theme } from '../theme'
// import LikeButton from '../components/LikeButton';

// export function Publi({ navigation }) {
//   const route = useRoute();
//   const { post } = route.params;
//   return (
//     <View style={styles.container}>
//       <View style={styles.contHeaderPubli}>
//         <TouchableOpacity onPress={() => navigation.goBack()}>
//           <Image source={require('../../../assets/volver_atras.png')} style={styles.return} />
//         </TouchableOpacity>
//         <View style={styles.avatarBase}>
//           <Image
//             source={require('../../../assets/avatar.jpeg')}
//             style={styles.avatar}
//           />
//         </View>
//         <View style={styles.texts}>
//           <Text style={styles.title2}>Publicado por</Text>
//           <Text style={styles.title3}>{post.nombre}</Text>  {/* Aquí usamos post.nombre */}
//         </View>
//       </View>

//       <View style={styles.contPubli}>
//         <Image
//           source={{ uri: post.image_url }}  {/* Usamos la URL de la imagen del post */}
//           style={styles.publicationImage}
//         />
//       </View>

//       <View style={styles.body}>
//         <LikeButton item={post} />  {/* Usamos el post completo aquí para el LikeButton */}
//         <Text style={styles.title}>{post.titulo}</Text>  {/* Usamos post.titulo */}
//         <Text style={styles.titleDescription}>{post.comentario}</Text>  {/* Usamos post.comentario */}
//         <View style={styles.contComments}>
//           <Text style={styles.titleTime}>Hace {daysAgo} días</Text>  {/* Muestra los días pasados desde la publicación */}
//           <TouchableOpacity onPress={() => navigation.navigate('Comments', { publication_id: post.id })}>
//             <Image source={require('../../../assets/añadir_mensaje.png')} style={styles.addComment} />
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.title}>COMENTARIOS</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',  // Asegúrate de que el fondo sea blanco o el que desees
//   },
//   contHeaderPubli: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 15,
//     backgroundColor: theme.colors.green,  // Si usas un color de tu tema
//   },
//   return: {
//     width: 30,
//     height: 30,
//   },
//   avatarBase: {
//     width: 50,
//     height: 50,
//     backgroundColor: theme.colors.green,
//     borderRadius: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginLeft: 20,
//   },
//   avatar: {
//     width: 45,
//     height: 45,
//     borderRadius: 50,
//   },
//   texts: {
//     marginLeft: 10,
//   },
//   title2: {
//     color: theme.colors.lightGray,
//     fontSize: 10,
//   },
//   title3: {
//     color: theme.colors.lightGray,
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   contPubli: {
//     marginTop: 20,
//     marginBottom: 20,
//   },
//   publicationImage: {
//     width: '100%',
//     height: 300,  // Ajusta el tamaño de la imagen según sea necesario
//     borderRadius: 10,
//   },
//   body: {
//     paddingHorizontal: 20,
//   },
//   title: {
//     color: theme.colors.green,
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginVertical: 10,
//   },
//   titleDescription: {
//     color: theme.colors.lightGray,
//     fontSize: 14,
//     marginBottom: 10,
//   },
//   contComments: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   titleTime: {
//     color: theme.colors.lightGray,
//     fontSize: 10,
//     marginRight: 10,
//   },
//   addComment: {
//     width: 30,
//     height: 30,
//   },
// });



























// export function PublicationScreen() {
  
//   const apiURL = `http://${API_IP}:${API_PORT}`;
//   const [ posts, setPosts ] = useState([]); // Para almacenar las publicaciones
//   const [ users, setUsers ] = useState([]);
//   const [ loading, setLoading ] = useState(true); // Para manejar el estado de carga
  
//   // Usamos useEffect para hacer la llamada a la API cuando se monte el componente
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await fetch(`${apiURL}/proyecto01/publicaciones`);
//         const data = await response.json();
//         setPosts(data);
//       } catch (error) {
//         console.error('Error al obtener las publicaciones:', error);
//       }
//     };
  
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(`${apiURL}/proyecto01/users/name`);
//         const data = await response.json();
        
//         setUsers(data);
//       } catch (error) {
//         console.error('Error al obtener los usuarios:', error);
//       }
//     };
  
//     const fetchData = async () => {
//       await Promise.all([fetchPosts(), fetchUsers()]); // Espera a que ambas peticiones terminen
//       setLoading(false); // Solo desactiva el estado de carga cuando ambas estén listas
//     };
  
//     fetchData();
//   }, []);

//   const getPostWithUserNames = () => {
//     return posts.map((post) => {
//       const user = Array.isArray(users)
//       ? users.find((u) => {
//         return String(u.user_id).trim() === String(post.user_id).trim();
//       })
//     : null;
//       return {
//         ...post,
//         nombre: user ? user.nombre : 'Usuario desconocido',
//       };
//     });
//   };
  
//   //Calcular días desde la publicación
// const getDaysAgo = (createdAt) => {
//   const currentDate = new Date();
//   const createdDate = new Date(createdAt);

//   const diffInTime = currentDate.getTime() - createdDate.getTime();
//   const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

//   return diffInDays;
// };

//   // Componente LikeButton
//   const LikeButton = ({ item }) => {
//     const [liked, setLiked] = useState(false);
//     return (
//       <TouchableOpacity
//         style={styles.contLike}
//         onPress={() => setLiked(!liked)} // Cambiar estado al hacer clic
//       >
//         <Image
//           source={require("../../../assets/megusta.png")}
//           style={[styles.like, { tintColor: liked ? theme.colors.green : theme.colors.lightGray }]}
//         />
//         <Text style={styles.titleLike}>{item.likes} Me gusta</Text>
//       </TouchableOpacity>
//     );
//   };

//   // Renderizar cada item en el FlatList
//   const renderItem = ({ item }) => {
//     const daysAgo = getDaysAgo(item.createdAt); 
//     return (
//     <View style={styles.container}>
//       <View style={styles.contHeaderPubli}>
//         {/* <TouchableOpacity style={styles.button} onPress={handleReturn}> */}
//                     <Image source={require('../../../assets/volver_atras.png')} style={styles.return} />
//                   {/* </TouchableOpacity> */}
//         <View style={styles.avatarBase}>
//           <Image
//             source={require('../../../assets/avatar.jpeg')}
//             style={styles.avatar}
//           />
//         </View>
//         <View style={styles.texts}>
//           <Text style={styles.title2}>Publicado por</Text>
//           <Text style={styles.title3}>{item.nombre}</Text>
//         </View>
//       </View>

//       <View style={styles.contPubli}>
//         <Image
//           source={{ uri: item.image_url }} 
//           style={styles.publicationImage}
//         />
//       </View>
  
//       <View style={styles.body}>
//         <LikeButton item={item} />
//         <Text style={styles.title}>{item.titulo}</Text>
//         <Text style={styles.titleDescription}>{item.comentario}</Text>
//         <View style={styles.contComments}>
//         <Text style={styles.titleTime}>Hace {daysAgo} días</Text>
//           {/* <TouchableOpacity onPress={() => navigation.navigate('Comments', { publication_id: item.id })}> */}
//           <Image source={require('../../../assets/añadir_mensaje.png')} style={styles.addComment} />
//           {/* </TouchableOpacity> */}
//         </View>
//         <Text style={styles.title}>COMENTARIOS</Text>
//       </View>
//     </View>
//   );
// };

//   // Si los datos están cargando, mostramos un indicador de carga
//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color={theme.colors.green} />
//       </View>
//     );
//   }

//   return (
//     <FlatList
//       data={getPostWithUserNames()} // Los datos que provienen de la API
//       renderItem={renderItem} // Cómo renderizar cada publicación
//       keyExtractor={(item) => item.id.toString()} // Usamos el id como clave única
//       showsVerticalScrollIndicator={false} 
//     />
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: theme.colors.blackish,
//   },
//   contHeaderPubli: {
//     // flex: 1,
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//     marginTop: 40,
//     marginBottom: 10,
//     paddingLeft: 20,
//     gap: 20,
//   },
//   return: {
//     height: 30,
//     width: 18,
//   },
//   title2: {
//     color: theme.colors.lightGray,
//     fontSize: 10,
//   },
//   title3: {
//     color: theme.colors.lightGray,
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   avatarBase: {
//     width: 50,
//     height: 50,
//     backgroundColor: theme.colors.green,
//     borderRadius: 50,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   avatar: {
//     width: 45,
//     height: 45,
//     borderRadius: 50,
//   },
//   texts: {
//     flexDirection: 'column',
//   },
//   contPubli: {
//     height: 380,
//     width: '100%',
//     // borderBlockColor: theme.colors.green,
//     // borderBottomWidth: 2
//   },
//   publicationImage: {
//     width: '100%',
//     height: 380,
//     marginBottom: 10,
//   },
//   body: {
//     width: '100%',
//     paddingLeft: 30,
//     paddingRight: 30,
//     paddingTop: 15,
//   },
//   contLike: {
//     flexDirection: 'row',
//     gap: 10,
//     marginBottom: 20,
//   },
//   like: {
//     width: 20,
//     height: 20,
//   },
//   titleLike: {
//     color: theme.colors.lightGray,
//   },
//   title: {
//     color: theme.colors.green,
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   titleDescription: {
//     color: theme.colors.lightGray,
//     marginBottom: 10,
//   },
//   titleTime: {
//     color: theme.colors.lightGray,
//     fontSize: 8,
//     marginBottom: 20,
//   },
//   contComments: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   addComment: {
//     width: 50,
//     height: 50,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });