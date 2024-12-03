import React, { useState, useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import QRCode from "react-native-qrcode-svg";
import axios from "axios";

const QRScreen = () => {
  const [userData, setUserData] = useState({ username: null, email: null, name: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Cambia la URL de tu API
    const fetchUserData = async () => {
      try {
        const response = await axios.get("https://tu-api.com/usuario"); // Reemplaza con tu endpoint
        const { username, email, name } = response.data; // Ajusta si la estructura de la API es diferente
        setUserData({ username, email, name });
        setLoading(false);
      } catch (err) {
        console.error(err);
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
      <Text style={styles.text}>Nombre: {userData.name}</Text>
      <Text style={styles.text}>Email: {userData.email}</Text>
      <Text style={styles.text}>Usuario: {userData.username}</Text>
      {userData.username && <QRCode value={userData.username} size={200} />}
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

export default QRScreen;