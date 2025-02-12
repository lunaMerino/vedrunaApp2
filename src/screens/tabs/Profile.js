import { Alert, View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { theme } from '../theme'
import { API_IP, API_PORT } from '@env';
import { useIsFocused } from '@react-navigation/native';
// npm install react-native-tab-view
// npm install react-native-pager-view



export function Profile({ route }) {
  const apiURL = `http://${API_IP}:${API_PORT}`;
  
  const { user_id } = route.params || {};
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [showLiked, setShowLiked] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      fetchPublicaciones(); // Vuelve a cargar las publicaciones cuando el usuario regresa a la pestaña de perfil
    }
  }, [isFocused]);

    const fetchPublicaciones = async () => {
      try {
        // const response = await fetch('http://192.168.1.23:8080/proyecto01/publicaciones');
        const response = await fetch(`${apiURL}/proyecto01/publicaciones`);
        const data = await response.json();
        // Filtrar publicaciones del usuario
        const userPosts = data.filter(post => post.user_id === user_id);
        setPosts(userPosts);

        // Filtrar publicaciones donde el usuario ha dado "me gusta"
        const userLikedPosts = data.filter(post => post.like.includes(user_id));
        setLikedPosts(userLikedPosts);
      } catch (error) {
        console.error('Error al obtener publicaciones:', error);
      } finally {
        setLoading(false);
      }
    };


  const renderItem = ({ item }) => (
    
    <View style={styles.postContainer}>
      <Image source={{ uri: item.image_url }} style={styles.postImage} />
    </View>
  );


  const renderFlatList = () => {
    if (loading) {
      return <ActivityIndicator size="large" color={theme.colors.green} />;
    }
    return (
      <FlatList
        data={showLiked ? likedPosts :posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={3}
        style={styles.flatList}
      />
    );
  };



  return (
    
    <View style={styles.container}>
      {/* Cabecera */}
      <View style={styles.header}>
        <View style={styles.header1}>
          <View style={styles.avatarBase}>
            <Image source={require('../../../assets/joseCarlos.jpg')} style={styles.avatar} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textHeader1}>{posts.length}</Text>
            <Text style={styles.textHeader2}>publicaciones</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textHeader1}>25</Text>
            <Text style={styles.textHeader2}>seguidores</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textHeader1}>25</Text>
            <Text style={styles.textHeader2}>siguiendo</Text>
          </View>
        </View>
        <View style={styles.header2}>
          <View style={styles.infoUser}>
            <Text style={styles.username}>José Carlos</Text>
            <Text style={styles.email}>josecarlos.moreno@a.vedrunasevillasj.es</Text>
          </View>
          <View style={styles.buttonContainer}>
            {/* Botones para alternar entre Mis Publicaciones y Publicaciones que me gustan */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, !showLiked && styles.activeButton]} 
                onPress={() => setShowLiked(false)}
              >
                <Image source={require('../../../assets/grid.png')} style={styles.iconButton} />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.button, showLiked && styles.activeButton]} 
                onPress={() => setShowLiked(true)}
              >
                <Image source={require('../../../assets/heartFull.png')} style={styles.iconButton} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
        {/* FlatList que muestra las publicaciones según el valor de `showLiked` */}
        {renderFlatList()}
    </View>
);
}

const styles = StyleSheet.create({
  titleprueba: {
    color: theme.colors.lightGray,
  },
container: { 
  flex: 1, 
  backgroundColor: theme.colors.blackish 
},
header: { 
  height: '33%', 
  backgroundColor: theme.colors.blackish 
},
header1: { 
  flexDirection: 'row', 
  justifyContent: 'center', 
  alignItems: 'center', 
  gap: 18, 
  marginTop: 40 
},
avatarBase: { width: 75, 
  height: 75, 
  backgroundColor: theme.colors.green, 
  borderRadius: 50, 
  alignItems: 'center', 
  justifyContent: 'center' 
},
avatar: { width: 70, 
  height: 70, 
  borderRadius: 50 
},
textContainer: { 
  alignItems: 'center', 
  justifyContent: 'center' 
},
textHeader1: { 
  fontSize: 12,
  fontFamily: 'Rajdhani_700Bold',
  color: theme.colors.lightGray 
},
textHeader2: { 
  fontSize: 12,
  fontFamily: 'Rajdhani_500Medium',
  color: theme.colors.lightGray 
},
header2: { 
  marginTop: 20,
  flex: 1,
  justifyContent: 'space-between'
},
infoUser: { 
  marginLeft:40,
},
username: { 
  fontSize: 15, 
  fontFamily: 'Rajdhani_600SemiBold',
  color: theme.colors.green 
},
email: { 
  fontSize: 12, 
  color: theme.colors.lightGray, 
  textDecorationLine: 'underline',
  fontFamily: 'Rajdhani_500Medium',
},
tabLabel: { 
  fontSize: 14, 
  textTransform: 'capitalize' 
},
activeTab: { 
  color: theme.colors.green, 
  fontWeight: 'bold' 
},
inactiveTab: { 
  color: theme.colors.lightGray 
},

buttonContainer: { 
  flexDirection: 'row', 
  justifyContent: 'center', 
  alignItems: 'center',
  gap: 50,
},
button: { 
  paddingVertical: 8, 
  paddingHorizontal: 16,
  marginBottom: 4,
  width: 70,
  alignItems: 'center', 
  justifyContent: 'center',
  // borderBottomWidth: 1,
  // borderBottomColor: theme.colors.lightGray,
},
activeButton: { 
  borderBottomWidth: 1,
  borderBottomColor: theme.colors.lightGray,
},
flatList: {
  marginLeft: 3,
},
postContainer: { 
  flex: 1, 
  margin: 1,
  alignItems: 'center',
  maxWidth: 126,
  height: 115, 
},
postImage: { 
  width: '100%', 
  height: '100%',
  borderRadius: 2,
  borderWidth: 1,
  borderColor: theme.colors.lightGray,
},
tabImage: {
  width: 20,  // Ajusta según lo que necesites
  height: 20, // Ajusta según lo que necesites
  marginRight: 5, // Espacio entre la imagen y el texto si es necesario
},
iconButton: {
  width: 24,
  height: 24,
  resizeMode: 'contain',
},
// tabBar: {
//   backgroundColor: theme.colors.blackish,
//   height: 50,
// },
indicator: {
  backgroundColor: theme.colors.lightGray,
  height: 1,
  width: 90,
  borderRadius: 10,
  marginBottom: 4,
  marginLeft: 60,
},
});