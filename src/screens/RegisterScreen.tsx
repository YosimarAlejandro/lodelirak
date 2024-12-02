import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import axios from 'axios';

export const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const register = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });
      alert('Registro exitoso');
      navigation.navigate('Login'); //te manda a tu login 
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      setErrorMessage('Error en el registro. Por favor, revisa tus datos.');
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Nuevo usuario</Text>
        <Text style={styles.subtitle}>Regístrate para comenzar</Text>

        {/* Botones superiores */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')} // regresa a login
          >
            <Text style={styles.buttonText}>Cuenta existente</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Nueva sesión</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre de Usuario</Text>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
            placeholder="Ingresa tu Nombre de Usuario"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            value={email}
            placeholder="Ingresa tu Correo"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Contraseña</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            placeholder="Ingresa tu Contraseña"
            secureTextEntry
          />
        </View>

        {/* Mostrar error */}
        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}

        {/* Botones */}
        {loading ? (
          <Text style={styles.loadingText}>Registrando...</Text>
        ) : (
          <TouchableOpacity style={styles.registerButton} onPress={register}>
            <Text style={styles.registerButtonText}>Registrarse</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    background: {
      flex: 1,
      resizeMode: 'cover', // O 'contain' dependiendo de cómo quieras que se ajuste la imagen
      justifyContent: 'center',
    },
    outerContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    container: {
      backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco con un poco de transparencia
      borderRadius: 10,
      borderWidth: 1, // Ancho del borde
      borderColor: 'black', // Color del borde
      padding: 20,
      width: '90%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5, // Para Android
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      marginBottom: 20,
      textAlign: 'center',
    },
    buttonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 20,
    },
    button: {
      flex: 1,
      backgroundColor: '#007BFF',
      borderRadius: 5,
      padding: 10,
      marginHorizontal: 5,
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    inputContainer: {
      marginBottom: 15,
    },
    label: {
      fontSize: 14,
      marginBottom: 5,
    },
    input: {
      height: 40,
      borderColor: '#CCCCCC',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
    },
    imagePickerButton: {
      backgroundColor: 'transparent', // Botón transparente
      borderRadius: 5,
      padding: 10,
      alignItems: 'center',
      marginTop: 10,
      borderWidth: 1, // Ancho del borde
      borderColor: '#ccc', // Color del borde gris
  },
  imagePickerButtonText: {
      color: '#ccc', // Color del texto gris
      fontSize: 16,
      
    },
    imagePreview: {
      width: 100,
      height: 100,
      borderRadius: 10,
      marginTop: 10,
      alignSelf: 'center',
    },
    loginButton: {
      backgroundColor: 'black',
      borderRadius: 5,
      padding: 10,
      marginTop: 20,
      alignItems: 'center',
    },
    loginButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
    },
    loadingText: {
      color: 'blue',
      fontSize: 16,
      textAlign: 'center',
    },
    registerButton: {
      backgroundColor: '#28a745',
      borderRadius: 5,
      padding: 10,
      alignItems: 'center',
      marginTop: 10,
    },
    registerButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    errorMessage: {
      color: 'red',
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 10,
    },
  });