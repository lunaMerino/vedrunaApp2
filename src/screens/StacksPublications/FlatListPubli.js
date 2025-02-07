import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState, useEffect } from 'react'
import { theme } from '../theme'
import { API_IP, API_PORT } from '@env';
import LikeButton from '../components/LikeButton';

export function FlatListPubli({ navigation }) {

  const apiURL = `http://${API_IP}:${API_PORT}`;
  const [ posts, setPosts ] = useState([]); // Para almacenar las publicaciones
  const [ users, setUsers ] = useState([]);
  const [ loading, setLoading ] = useState(true); // Para manejar el estado de carga
  
  // Usamos useEffect para hacer la llamada a la API cuando se monte el componente
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${apiURL}/proyecto01/publicaciones`);
        // const response = await fetch(`http://10.0.2.2:8080/proyecto01/publicaciones`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
      }
    };
  
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiURL}/proyecto01/users/name`);
        // const response = await fetch(`http://10.0.2.2:8080/proyecto01/users/name`);
        const data = await response.json();
        
        setUsers(data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };
  
    const fetchData = async () => {
      await Promise.all([fetchPosts(), fetchUsers()]);
      setLoading(false);
    };
  
    fetchData();
  }, []);

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
  const currentDate = new Date();
  const createdDate = new Date(createdAt);
  const diffInTime = currentDate.getTime() - createdDate.getTime();
  const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

  return diffInDays;
};

  // Renderizar cada item en el FlatList
  const renderItem = ({ item }) => {
    const daysAgo = getDaysAgo(item.createdAt); 
    return (
      <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Publi', { post: item })}
    >
      <View style={styles.contHeader}>
        <Image
          source={require('../../../assets/cabecera_logo_home.png')}
          style={styles.logo}
        />
      </View>

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
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.body}>
        <LikeButton item={item} userId={item.user_id} />
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.titleDescription}>{item.comentario}</Text>
        <Text style={styles.titleTime}>Hace {daysAgo} días</Text>
      </View>
    </TouchableOpacity>
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
    <FlatList
      //Coge los datos, los renderiza y los identifica por id
      data={getPostWithUserNames()}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()} 
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
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
    fontSize: 10,
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
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  texts: {
    flexDirection: 'column',
  },
  publicationImage: {
    width: '100%',
    height: 380,
    marginBottom: 10,
  },
  body: {
    width: '100%',
    paddingLeft: 30,
    paddingRight: 30,
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
    marginBottom: 20,
  },
  titleDescription: {
    color: theme.colors.lightGray,
    marginBottom: 10,
  },
  titleTime: {
    color: theme.colors.lightGray,
    fontSize: 8,
    marginBottom: 20,
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
});