import { Text, View, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native'
import { API_IP, API_PORT } from '@env';
import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from "@react-navigation/native"; // Importar useFocusEffect
import { useCallback } from "react";


export function FlatListIncidencias({ navigation }) {
  const apiURL = `http://${API_IP}:${API_PORT}`;
  const [incidencias, setIncidencias] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    const fetchIncidencias = async () => {
      try {
        // const response = await fetch(`${apiURL}/proyecto01/incidencias`);
        const response = await fetch(`http://10.0.2.2:8080/proyecto01/incidencias`);
        const data = await response.json();
        setIncidencias(data);
      } catch (error) {
        console.error("Error obteniendo incidencias:", error);
      }
    };

    fetchIncidencias();
  }, []);

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "SOLUCIONADO":
        return "#9FC63B";
      case "EN TRÁMITE":
        return "#F19100";
      case "DENEGADA":
        return "#F10000";
      default:
        return "#FFFFFF";
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchIncidencias();
    setRefreshing(false);
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.titulo}>INCIDENCIAS</Text>

    {/* aqui saldrian las incidencias */}
    <FlatList
      style={styles.listaIncidencias}
        data={incidencias}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={styles.incidencia}
          >
            <Text style={styles.tituloIncidencia}>{item.titulo}</Text>
            <Text style={{ color: getEstadoColor(item.estado) }}>{item.estado}</Text>
          </View>
        )}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />


      <View style={styles.containerBoton}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('AddIncidencia')}
        >
          <Image
            source={require('../../../assets/añadir_comentario.png')}
            style={styles.logo}
          />
        </TouchableOpacity>
      </View>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({

  container: {
    // flex: 1,
    backgroundColor: '#23272A',
    alignItems: 'center',
    gap: 20,
  },


  // titutlo pagina
  titulo: {
    color: '#9FC63B',
    fontSize: 35,
    fontWeight: 'bold',
    position: 'absolute',
    top: 30, // Ajusta según sea necesario
    alignSelf: 'center',
    marginBottom: 20,
  },


  // incidencias
  listaIncidencias: {
    marginTop: 100,
    gap: 20,
    marginBottom: '108%'
  },

  incidencia: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#323639',
    width: 350
  },

  tituloIncidencia: {
    color: '#9FC63B',
    fontWeight: 'bold'
  },


  // boton añadir
  containerBoton: {
    position: 'absolute',
    bottom: 2,
    right: 2,
  },

  logo: {
    width: 130,
    height: 130,
  },


})