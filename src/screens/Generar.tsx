import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import QRCode from "expo-barcode-generator"; // Librería para generar el QR
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";

// Funciones para manejar el token
const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem('@user_token', token);
  } catch (error) {
    console.error('Error al guardar el token', error);
  }
};

const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('@user_token');
    return token;
  } catch (error) {
    console.error('Error al obtener el token', error);
    return null;
  }
};

const Generar = () => {
  const [userData, setUserData] = useState({ username: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Recuperar el token cuando lo necesites
        const token = await getToken(); // Obtén el token desde AsyncStorage

        if (!token) {
          setError("No se encontró el token.");
          setLoading(false);
          return;
        }

        // Realiza la solicitud con el token en los headers
        const response = await axios.get("http://localhost:5000/api/auth/current", {
          headers: { Authorization: `Bearer ${token}` } // Envia el token en el header
        });

        console.log('Datos del usuario:', response.data); // Verifica los datos que recibes
        const { username } = response.data;
        console.log(username,token)
        setUserData({ username });
        setLoading(false);
      } catch (err) {
        console.error('Error al obtener los datos:', err);
        setError("Error al obtener los datos del usuario");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Usuario: {userData.username}</Text>
      {userData.username && (
        <QRCode
          value={userData.username}
          size={200}
          color="black"
          backgroundColor="white"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    color: "red",
    fontSize: 16,
  },
});

export default Generar;
