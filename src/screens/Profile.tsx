import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';  // Usamos TouchableOpacity para personalizar el botón
import Icon from 'react-native-vector-icons/FontAwesome';  // Importa los íconos

export const Profile = () => {
  // Estado para almacenar el nombre, grupo, matrícula, email, imagen
  const [userData, setUserData] = useState({
    nombre: 'Cargando...',
    grupo: 'Cargando...',
    matricula: 'Cargando...',
    email: 'Cargando...',
    imagen: 'https://i.imgur.com/9082o2m.jpg', // Imagen por defecto
  });

  // Función para obtener los datos del usuario desde la API
  const fetchUserData = async () => {
    try {
      const response = await fetch('https://api.ejemplo.com/usuario');  // URL de la API
      const data = await response.json();
      // Asignamos los datos recibidos de la API
      setUserData({
        nombre: data.nombre,
        grupo: data.grupo,
        matricula: data.matricula,
        email: data.email,
        imagen: data.imagen,  // URL de la imagen recibida de la API
      });
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
    }
  };

  // Llamamos a la función cuando el componente se monta
  useEffect(() => {
    fetchUserData();  // Obtener los datos del usuario
  }, []);

  return (
    <View style={styles.mainContainer}>  
      <View style={styles.container}>
        
        <View style={styles.profileContainer}>
          <View style={styles.halfCircleBackground} />

          <Image
            source={{ uri: userData.imagen }}  // Imagen recibida desde la API
            style={styles.profileImg}
          />

          <View style={styles.infoContainer}>
            <View style={styles.infoBox}>
              <Icon name="user" size={25} color="#fff" style={styles.icon} />
              <Text style={styles.infoText}>Nombre: {userData.nombre}</Text>
            </View>
            <View style={styles.infoBox}>
              <Icon name="group" size={25} color="#fff" style={styles.icon} />
              <Text style={styles.infoText}>Grupo: {userData.grupo}</Text>
            </View>
            <View style={styles.infoBox}>
              <Icon name="id-card" size={25} color="#fff" style={styles.icon} />
              <Text style={styles.infoText}>Matrícula: {userData.matricula}</Text>
            </View>
            <View style={styles.infoBox}>
              <Icon name="envelope" size={25} color="#fff" style={styles.icon} />
              <Text style={styles.infoText}>Email: {userData.email}</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.button}onPress={fetchUserData}>
            <Text style={styles.buttonText}>Volver</Text>
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
  profileContainer: {
    flexDirection: 'column', // Coloca la imagen, el nombre y el grupo en columna
    alignItems: 'center',    // Centra todos los elementos
    marginTop: 60,  // Espaciado entre la fecha y la imagen
  },
  profileImg: {
    width: 100,  // Aumenté el tamaño de la imagen
    height: 100,
    borderRadius: 50,  // Imagen redonda
    marginTop: 10,  // Espaciado entre el medio círculo y la imagen
    zIndex: 1,  // Asegura que la imagen esté sobre el medio círculo
  },
  halfCircleBackground: {
    width: 350,  // Aumenté el ancho del medio círculo
    height: 150,  // Aumenté la altura del medio círculo
    backgroundColor: 'rgba(0,123 ,255 , 0.5)',  // Color azul
    borderBottomLeftRadius: 150,  // Aumento el redondeo de la esquina izquierda
    borderBottomRightRadius: 150,  // Aumento el redondeo de la esquina derecha
    position: 'absolute',  // Coloca el medio círculo por encima de la imagen
    left: 0,  // Pegado al borde izquierdo del contenedor
    top: -80,  // Coloca el medio círculo ligeramente arriba de la imagen
    zIndex: 0,  // Coloca el medio círculo por debajo de la imagen
  },
  infoContainer: {
    marginTop: 60,  // Espaciado entre la imagen y los contenedores de información
  },
  infoBox: {
    backgroundColor: '#007BFF',  // Fondo azul
    padding: 15,
    marginVertical: 10,  // Espaciado entre los íconos
    borderRadius: 10,
    width: 350,  // Ancho fijo para todos los contenedores
    height: 50,  // Altura fija para todos los contenedores
    flexDirection: 'row',  // Alinea el icono y el texto en fila
    alignItems: 'center',  // Centra verticalmente el contenido
  },
  infoText: {
    color: '#fff',  // Texto blanco
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 15,  // Espaciado entre el ícono y el texto
  },
  icon: {
    marginRight: 10,  // Espaciado entre el ícono y el texto
  },
  button: {
    backgroundColor: '#007BFF',  // Color de fondo del botón
    paddingVertical: 12,  // Relleno superior e inferior
    paddingHorizontal: 30,  // Relleno izquierdo y derecho
    borderRadius: 25,  // Borde redondeado
    marginTop: 20,  // Espaciado entre el botón y los demás elementos
  },
  buttonText: {
    color: '#fff',  // Texto blanco en el botón
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',  // Centra el texto
  },
});
