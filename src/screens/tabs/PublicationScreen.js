import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import React from 'react'
import { theme } from '../theme'
export function PublicationScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.contInfoPubli}>
        {/* <TouchableOpacity style={styles.buttonPrev} onPress={ () => navigation.navigate('Tab')}>
                    <Text style={styles.buttonText}
                    >{'<'}</Text>
        </TouchableOpacity> */}
        <View style={styles.avatarBase}>
          <Image
          source={require('../../../assets/avatar.jpeg')}
          style={styles.avatar}
          />
        </View>
        <View style={styles.tesxts}>
          <Text style={styles.title2}>Publicacado por</Text>
          <Text style={styles.title3}>Nombre Usuario</Text>
        </View>
      </View>

      <View style={styles.contPubli}>
      </View>

      <View style={styles.body}>
        <View style={styles.contLike}>
          <Image
            source={require('../../../assets/megusta.png')}
            style={styles.like}
          />
          <Text style={styles.titleLike}>x Me gusta</Text>
        </View>
        <Text style={styles.title}>NOMBRE PUBLICACION</Text>
        <Text style={styles.titleDescription}>Descripcion de la publicacion</Text>
        <Text style={styles.titleTime}>Hace x días</Text>
        <Text style={styles.title}>COMENTARIOS</Text>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.blackish,
  },
  title2: {
    color: theme.colors.lightGray,
    fontSize: 10,
  },
  title3: {
    color: theme.colors.lightGray,
    fontSize: 14,
    fontWeight: 'bold'
  },  
  contInfoPubli: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 40,
    marginBottom: 10,
    paddingLeft: 10
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
    borderRadius: 50
  },
  tesxts: {
    flexDirection: 'column',
    marginLeft: 15
  },
  contPubli: {
    height: 380,
    width: '100%',
    backgroundColor: theme.colors.green,
    // borderBlockColor: theme.colors.green,
    // borderBottomWidth: 2
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
  titleLike: {
    color: theme.colors.lightGray,
  },
  title: {
    color: theme.colors.green,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20
  },
  titleDescription: {
    color: theme.colors.lightGray,
    marginBottom: 10
  },
  titleTime: {
    color: theme.colors.lightGray,
    fontSize: 8,
    marginBottom: 20
  }
});
