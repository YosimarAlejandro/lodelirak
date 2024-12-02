import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importar el ícono

export const Home = () => {
  // Estado para almacenar la fecha actual, nombre, grupo y imagen
  const [currentDate, setCurrentDate] = useState('');
  const [userData, setUserData] = useState({
    nombre: 'Cargando...',
    grupo: 'Cargando...',
    imagen: 'https://i.imgur.com/9082o2m.jpg', // Imagen por defecto
  });

  // Función para formatear la fecha
  const formatDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');  // Día con 2 dígitos
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Mes (0-11) + 1
    const year = date.getFullYear();  // Año
    setCurrentDate(`${day}/${month}/${year}`);  // Asigna la fecha formateada
  };

  // Función para obtener los datos del usuario desde la API
  const fetchUserData = async () => {
    try {
      const response = await fetch('https://api.ejemplo.com/usuario');  // URL de la API
      const data = await response.json();
      // Asignamos los datos recibidos de la API
      setUserData({
        nombre: data.nombre,
        grupo: data.grupo,
        imagen: data.imagen,  // URL de la imagen recibida de la API
      });
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };

  // Llamamos a las funciones cuando el componente se monta
  useEffect(() => {
    formatDate();  // Formatear la fecha
    fetchUserData();  // Obtener los datos del usuario
  }, []);

  return (
    <View style={styles.mainContainer}>  {/* Contenedor principal centrado */}
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Dia {currentDate}</Text>
          
          {/* Icono de la tuerquita en la parte superior derecha */}
          <TouchableOpacity style={styles.settingsButton}>
            <Icon name="cogs" size={30} color="#000" /> {/* Tuerquita */}
          </TouchableOpacity>
        </View>
        
        {/* Contenedor para la imagen, nombre y grupo centrados */}
        <View style={styles.profileContainer}>
          {/* Imagen del perfil */}
          <Image
            source={{ uri: userData.imagen }}  // Imagen recibida desde la API
            style={styles.profileImg}
          />
          
          {/* Contenedor de nombre y grupo */}
          <View style={styles.profileDetails}>
            <Text style={styles.profileText}>{userData.nombre}</Text>
            <Text style={styles.profileText}>{userData.grupo}</Text>
          </View>
        </View>

        {/* Botones centrados */}
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Generar Qr</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Historial</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,  // Asegura que ocupe toda la pantalla
    justifyContent: 'center',  // Centra el contenido verticalmente
    alignItems: 'center',  // Centra el contenido horizontalmente
    backgroundColor: '#f5f5f5',  // Fondo de la pantalla
  },
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo blanco con un poco de transparencia
    borderRadius: 10,
    borderWidth: 1, // Ancho del borde
    borderColor: 'black', // Color del borde
    padding: 20,
    width: '90%',  // Ajusta el tamaño del contenedor
    height: 800,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Para Android
  },
  header: {
    width: '100%',
    padding: 10,
    color: '#000',
    flexDirection: 'row',
    justifyContent: 'center',  // Centra la fecha
    alignItems: 'center',
    marginTop: 1,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    flex: 1,  // Ocupa el espacio disponible
    textAlign: 'center',  // Centra el texto
  },
  settingsButton: {
    position: 'absolute', // Coloca el icono en una posición fija
    right: 20,  // Alineado a la derecha
    top: 10,    // Un poco abajo del borde superior
  },
  profileContainer: {
    flexDirection: 'column', // Coloca la imagen, el nombre y el grupo en columna
    alignItems: 'center',    // Centra todos los elementos
    marginTop: 20,  // Espaciado entre la fecha y la imagen
  },
  profileImg: {
    width: 100,  // Aumenté el tamaño de la imagen
    height: 100,
    borderRadius: 50,  // Imagen redonda
    marginBottom: 10,  // Espaciado entre la imagen y el nombre
  },
  profileDetails: {
    alignItems: 'center',  // Centra el texto de nombre y grupo
  },
  profileText: {
    color: '#000',
    fontSize: 20,
  },
  buttons: {
    flexDirection: 'column', // Cambiado a columna para centrar los botones
    gap: 100,  // Aumenté la separación entre los botones
    marginTop: 100,  // Ajustado para centrar más los botones
    alignItems: 'center', // Centra los botones horizontalmente
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,  // Esquinas redondeadas
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',  // Texto blanco
    fontSize: 16,
    fontWeight: 'bold',
  },
});
