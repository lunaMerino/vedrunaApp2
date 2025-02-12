import { Alert, View, Text, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { theme } from '../theme'
import LikeButton from '../components/LikeButton';
import { API_IP, API_PORT } from '@env';

export function FlatListPubli({ navigation, route }) {

  const apiURL = `http://${API_IP}:${API_PORT}`;
  const [ posts, setPosts ] = useState([]); // Para almacenar las publicaciones
  const [ users, setUsers ] = useState([]);
  const [ loading, setLoading ] = useState(true); // Para manejar el estado de carga
  const [commentCounts, setCommentCounts] = useState({});
  const [currentUser, setCurrentUser] = useState(null); 
  const { user_id } = route.params || {};

  console.log("user_id de publicaciones: ",user_id);

  // Usamos useEffect para hacer la llamada a la API cuando se monte el componente
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // const response = await fetch(`${apiURL}/proyecto01/publicaciones`);
        const response = await fetch(`http://10.0.2.2:8080/proyecto01/publicaciones`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
      }
    };
  
    const fetchUsers = async () => {
      try {
        // const response = await fetch(`${apiURL}/proyecto01/users/name`);
        const response = await fetch(`http://10.0.2.2:8080/proyecto01/users/name`);
        const data = await response.json();
        

        setUsers(data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };

    const fetchCurrentUser = async () => {
      try {
        const response = await fetch(`http://10.0.2.2:8080/proyecto01/users/name`);
        const data = await response.json();
    
        // console.log("🟢 Lista de usuarios obtenida:", data);
        console.log("🔍 Buscando user_id:", user_id);

    
        // Filtrar el usuario correcto
        const currentUserData = data.find((user) => String(user.user_id).trim() === String(user_id).trim());
    
        if (currentUserData) {
          setCurrentUser(currentUserData);
        } else {
          console.warn("⚠️ Usuario logueado no encontrado en la API.");
        }
      } catch (error) {
        console.error('🔴 Error al obtener el usuario actual:', error);
      }
    };

    fetchCurrentUser();
    
  
  
    const fetchData = async () => {
      await Promise.all([fetchPosts(), fetchUsers()]);
      setLoading(false);
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    if (!posts || posts.length === 0) return; // Evita ejecutar si no hay publicaciones
  
    const fetchCommentCounts = async () => {
      try {
        const counts = {};
  
        // Hacer una petición por cada publicación
        await Promise.all(
          posts.map(async (post) => {
            const response = await fetch(`http://10.0.2.2:8080/proyecto01/comentarios/${post.id}`);
            const data = await response.json();
  
            if (!Array.isArray(data)) {
              console.error(`⚠️ La API no devolvió un array para la publicación ${post.id}:`, data);
              return;
            }
  
            counts[post.id] = data.length; // Contamos los comentarios
          })
        );
  
        setCommentCounts((prevCounts) => ({ ...prevCounts, ...counts })); // Evita re-render innecesario
      } catch (error) {
        console.error("Error al obtener el conteo de comentarios:", error);
      }
    };
  
    fetchCommentCounts();
  }, [JSON.stringify(posts)]); // Se ejecuta solo cuando `posts` realmente cambia
  

  const getPostWithUserNames = () => {
    return posts.map((post) => {
      const user = users.find((u) => String(u.user_id).trim() === String(post.user_id).trim());
      return {
        ...post,
        nombre: user ? user.nombre : 'Usuario desconocido',
      };
    });
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
    return diffInDays === 1 
    ? "Hace 1 día" 
    : `Hace ${diffInDays} días`;
  };
    
  
  // Renderizar cada item en el FlatList
  const renderItem = ({ item }) => {
    const daysAgo = getDaysAgo(item.createdAt); 

    return (
      <View style={styles.todo}>
     
      <View style={styles.contPubli}>
        <ImageBackground
          source={{ uri: item.image_url }}
          style={styles.publicationImage}
        >
          <View style={styles.contHeaderPubli}>
            <View style={styles.avatarBase}>
              <Image
                source={require('../../../assets/avatar.jpeg')}
                style={styles.avatar}
              />
            </View>
            <View style={styles.texts}>
              <Text style={styles.title2}>Publicado por</Text>
              <Text style={styles.title3}>{item.nombre}</Text>
              <Text style={styles.titleTime}> {daysAgo} </Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.body}>
        <LikeButton item={item} userId={item.user_id} />
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.titleDescription}>{item.comentario}</Text>

        <TouchableOpacity
        onPress={() => navigation.navigate('Publi', { post: item, user_id })}
        >
          <Text
            style={styles.comentario}
          >
            {commentCounts[item.id] === 1 
              ? "1 comentario" 
              : `${commentCounts[item.id] || 0} comentarios`}
        </Text>
        </TouchableOpacity>
      </View>
       
    </View>
  );
};

  // Si los datos están cargando, mostramos un indicador de carga
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.green} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
          
      <View style={styles.cabecera}>
        <Image 
          source ={require("../../../assets/logo.png")}
          style={{ width:71, height: 71}}
        />
        <View style={styles.cabeceraView}>
          <Text style={styles.textoCabecera}>{currentUser.nick}</Text>
          <Text style={styles.tituloCabecera}>VEDRUNA</Text>
        </View>
      </View>
      <FlatList
      //Coge los datos, los renderiza y los identifica por id
      data={getPostWithUserNames()}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()} 
      showsVerticalScrollIndicator={false}
    />
    </View>
    
  );
}

const styles = StyleSheet.create({
  
  // apartado de la cabecera
  cabecera: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 25,
    justifyContent: 'center'
  },

  cabeceraView: {
  },

  textoCabecera: {
    color: '#ffff',
  },

  tituloCabecera: {
    color: '#ffff',
    fontSize: 55,
    fontWeight: 'bold',
    marginTop: '-10',
  },
  
  
  todo: {
    marginBottom: 80
  },

  container: {
    flex: 1,
    backgroundColor: theme.colors.blackish,
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
    alignItems: 'center',
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

  return: {
    height: 30,
    width: 18,
  },

  title2: {
    color: theme.colors.lightGray,
    fontSize: 12,
  },

  title3: {
    color: theme.colors.lightGray,
    fontSize: 14,
    fontWeight: 'bold',
  },
  
  avatarBase: {
    width: 50,
    height: 50,
    backgroundColor: theme.colors.green,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },

  texts: {
    flexDirection: 'column',
    marginTop: 10,
    color: '#ffff'
  },

  publicationImage: {
    width: '100%',
    height: 380,
    marginBottom: 10,
  },

  body: {
    paddingHorizontal: 30,
    paddingTop: 15,
  },

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
    marginBottom: 20,
    marginLeft: '-2'
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

  comentario: {
    color: '#868686',
    marginTop: 10
  },
  
});