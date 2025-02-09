import { Alert, View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { theme } from '../theme'

export function Profile({ route }) {
  const { user_id } = route.params || {};
  Alert.alert(user_id);
  return (
    <View style={styles.header}>
      <View style={styles.header1}>
        <View style={styles.avatarBase}>
          <Image
            source={require('../../../assets/avatar.jpeg')}
            style={styles.avatar}
          />
        </View>        
        <View style={styles.textPublications}>
          <Text style={styles.textHeader1}>25</Text>
          <Text style={styles.textHeader2}>publicaciones</Text>
        </View>
        <View style={styles.textFollowers}>
          <Text style={styles.textHeader1}>25</Text>
          <Text style={styles.textHeader2}>seguidores</Text>
        </View>
        <View style={styles.textFollowings}>
          <Text style={styles.textHeader1}>25</Text>
          <Text style={styles.textHeader2}>seguidos</Text>
        </View>
      </View>
      <View style={styles.header2}>
        <View style={styles.infoUser}>
          <Text style={styles.username}>Nombre del usuario</Text>
          <Text style={styles.email}>nombre@vedruna.es</Text>
        </View>
        <View style={styles.tab}>
          <View style={styles.gridImageContainer}>
            <Image
              source={require('../../../assets/grid.png')}
            style={styles.gridImage}
            />
          </View>
          <View style={styles.heartImageContainer}>
            <Image
              source={require('../../../assets/heartFull.png')}
            style={styles.heartImage}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: '36%',
    backgroundColor: theme.colors.blackish,
  },
  header1: {
    flex: 1,
    flexDirection: 'row',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    gap:18,
    marginTop: 40
  },
    avatarBase: {
      width: 75,
      height: 75,
      backgroundColor: theme.colors.green,
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 10
    },
    avatar: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  textPublications: {
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colors.lightGray
  },
  textFollowers: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textFollowings: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textHeader1: {
    fontSize: 12,
    fontWeight: 'bold',
    color: theme.colors.lightGray
  },
  textHeader2: {
    fontSize: 10,
    color: theme.colors.lightGray
  },
  header2: {
    height: '50%',
    justifyContent: 'space-between',
  },
  infoUser: {
    marginTop: 8,
    marginLeft: 34,
  },
  username: {
    fontSize: 14,
  color: theme.colors.green
 },
  email: {
    fontSize: 12,
    color: theme.colors.lightGray,
    textDecorationLine: 'underline',
  },
  tab: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    gap: 70,
  },
  gridImage: {
    width: 24,
    height: 24,
  },
  gridImageContainer: {
    width: 60,
    height: 30,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartImageContainer: {
    width: 60,
    height: 30,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.lightGray,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heartImage: {
    width: 26,
    height: 26,
  },
})