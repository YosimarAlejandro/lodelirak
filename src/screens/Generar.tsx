import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import axios from 'axios';

const QrScreen = ({ username }) => {
  const [qrCode, setQrCode] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!username) {
      console.error('Username is undefined');
      return; // Si el username no está disponible, no hacer la solicitud
    }

    const fetchQrCode = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/qr/${username}`);
        console.log(username)
        setQrCode(response.data.qrCode);
      } catch (error) {
        console.error('Error fetching QR Code:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQrCode();
  }, [username]);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" />;
  }

  if (!qrCode) {
    return <Text>No QR code available.</Text>;
  }

  return (
    <View style={styles.container}>
      <img src={qrCode} alt="QR Code" style={styles.qrImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  loader: {
    flex: 1,
  },
});

export default QrScreen;
