import { View, Text, StyleSheet, Image, FlatList, ActivityIndicator, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import { theme } from '../theme'
import { API_IP, API_PORT } from '@env';

export function PublicationScreen() {
  
  const apiURL = `http://${API_IP}:${API_PORT}`;
  const [ posts, setPosts ] = useState([]); // Para almacenar las publicaciones
  const [ users, setUsers ] = useState([]);
  const [ loading, setLoading ] = useState(true); // Para manejar el estado de carga

  // Usamos useEffect para hacer la llamada a la API cuando se monte el componente
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${apiURL}/proyecto01/publicaciones`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error al obtener las publicaciones:', error);
      }
    };
  
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${apiURL}/proyecto01/users/name`);
        const data = await response.json();
        
        setUsers(data);
      } catch (error) {
        console.error('Error al obtener los usuarios:', error);
      }
    };
  
    const fetchData = async () => {
      await Promise.all([fetchPosts(), fetchUsers()]); // Espera a que ambas peticiones terminen
      setLoading(false); // Solo desactiva el estado de carga cuando ambas estén listas
    };
  
    fetchData();
  }, []);

  const getPostWithUserNames = () => {
    return posts.map((post) => {
      const user = Array.isArray(users)
      ? users.find((u) => {
        return String(u.user_id).trim() === String(post.user_id).trim();
      })
    : null;
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
          <Text style={styles.title3}>{item.nombre}</Text>
        </View>
      </View>

      <View style={styles.contPubli}>
        <Image
          source={{ uri: item.image_url }} 
          style={styles.publicationImage}
        />
      </View>
  
      <View style={styles.body}>
        <View style={styles.contLike}>
          <Image
            source={require('../../../assets/megusta.png')}
            style={styles.like}
          />
          <Text style={styles.titleLike}>{item.likes} Me gusta</Text>
        </View>
        <Text style={styles.title}>{item.titulo}</Text>
        <Text style={styles.titleDescription}>{item.comentario}</Text>
        <View style={styles.contComments}>
        <Text style={styles.titleTime}>Hace {daysAgo} días</Text>
          {/* <TouchableOpacity onPress={() => navigation.navigate('Comments', { publication_id: item.id })}> */}
          <Image source={require('../../../assets/añadir_mensaje.png')} style={styles.addComment} />
          {/* </TouchableOpacity> */}
        </View>
        <Text style={styles.title}>COMENTARIOS</Text>
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
    <FlatList
      data={getPostWithUserNames()} // Los datos que provienen de la API
      renderItem={renderItem} // Cómo renderizar cada publicación
      keyExtractor={(item) => item.id.toString()} // Usamos el id como clave única
      showsVerticalScrollIndicator={false} 
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.blackish,
  },
  contHeaderPubli: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
    marginBottom: 10,
    paddingLeft: 10,
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
    marginLeft: 15,
  },
  contPubli: {
    height: 380,
    width: '100%',
    // borderBlockColor: theme.colors.green,
    // borderBottomWidth: 2
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
  contComments: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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