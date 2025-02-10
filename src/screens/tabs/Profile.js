import { Alert, View, Text, StyleSheet, Image, FlatList, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { theme } from '../theme'

// npm install react-native-tab-view
// npm install react-native-pager-view



export function Profile({ route }) {
  const { user_id } = route.params || {};
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'posts', title: 'Publicaciones', image: '../../../assets/grid.png' },
    { key: 'likes', title: 'Me gusta', image: '../../../assets/heartFull.png' },
  ]);
  // Alert.alert('routes', JSON.stringify(routes));
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicaciones = async () => {
      try {
        const response = await fetch('http://192.168.1.23:8080/proyecto01/publicaciones');
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

    fetchPublicaciones();
  }, [user_id]);

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.image_url }} style={styles.postImage} />
    </View>
  );

  const renderPosts = () => (
    loading ? <ActivityIndicator size="large" color={theme.colors.green} /> :
    <FlatList data={posts} keyExtractor={item => item.id} renderItem={renderItem} numColumns={3} />
  );

  const renderLikes = () => (
    loading ? <ActivityIndicator size="large" color={theme.colors.green} /> :
    <FlatList data={likedPosts} keyExtractor={item => item.id} renderItem={renderItem} numColumns={3} />
  );

const renderScene = ({ route }) => {
  switch (route.key) {
    case 'posts':
      return renderPosts();
    case 'likes':
      return renderLikes();
    default:
      return null;
  }
};



  return (
    
    <View style={styles.container}>
    {/* Cabecera */}
    <View style={styles.header}>
      <View style={styles.header1}>
        <View style={styles.avatarBase}>
          <Image source={require('../../../assets/avatar.jpeg')} style={styles.avatar} />
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
          <Text style={styles.textHeader2}>seguidos</Text>
        </View>
      </View>
      <View style={styles.header2}>
        <View style={styles.infoUser}>
          <Text style={styles.username}>Nombre del usuario</Text>
          <Text style={styles.email}>nombre@vedruna.es</Text>
        </View>
      </View>
    </View>

    {/* Pestañas */}
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: Dimensions.get('window').width }}
      renderTabBar={props => (
        <TabBar
        {...props}
        indicatorStyle={styles.indicator}
        style={styles.tabBar}
        renderLabel={() => null}  // Evita que el texto se muestre en las pestañas
        renderIcon={({ route, focused  }) => (
          // <Image
          //   source={route.image}  // Usamos la imagen del objeto `route`
          //   style={styles.tabImage}
          // />
          <Text style={[styles.tabLabel, focused ? styles.activeTab : styles.inactiveTab]}>{route.title}</Text>

            )}
          />
      )}
    />
  </View>
);
}

const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: theme.colors.blackish },
header: { height: '35%', backgroundColor: theme.colors.blackish },
header1: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 18, marginTop: 40 },
avatarBase: { width: 75, height: 75, backgroundColor: theme.colors.green, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
avatar: { width: 70, height: 70, borderRadius: 50 },
textContainer: { alignItems: 'center', justifyContent: 'center' },
textHeader1: { fontSize: 12, fontWeight: 'bold', color: theme.colors.lightGray },
textHeader2: { fontSize: 10, color: theme.colors.lightGray },
header2: { alignItems: 'center', marginTop: 10 },
infoUser: { alignItems: 'center' },
username: { fontSize: 14, color: theme.colors.green },
email: { fontSize: 12, color: theme.colors.lightGray, textDecorationLine: 'underline' },
tabLabel: { fontSize: 14, textTransform: 'capitalize' },
activeTab: { color: theme.colors.green, fontWeight: 'bold' },
inactiveTab: { color: theme.colors.lightGray },

postContainer: { 
  flex: 1, 
  margin: 4,
  gap: 10,
  alignItems: 'center',
  width: 105, 
  height: 100, 
  backgroundColor: theme.colors.green
},
postImage: { 
  width: 105, 
  height: 100, 
  borderRadius: 1,
},
tabLabelContainer: {
  flexDirection: 'row',
  alignItems: 'center',
},
tabImage: {
  width: 20,  // Ajusta según lo que necesites
  height: 20, // Ajusta según lo que necesites
  marginRight: 5, // Espacio entre la imagen y el texto si es necesario
},
tabImage: {
  width: 24,
  height: 24,
  resizeMode: 'contain',
},
tabBar: {
  backgroundColor: theme.colors.blackish,
  height: 50,
},
indicator: {
  backgroundColor: theme.colors.lightGray,
  height: 1,
  width: 90,
  borderRadius: 10,
  marginBottom: 4,
  marginLeft: 60,
},
});