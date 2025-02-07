import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native';
import { theme } from '../theme'
import LikeButton from '../components/LikeButton';

export function Publi() {

  return (
    <View>
      <Text>StackB</Text>
    </View>
  )
}


























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