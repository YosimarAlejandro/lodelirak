import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importamos FontAwesome para los íconos

export const Historial = () => {
  // Estado para almacenar la fecha actual, nombre, grupo, imagen y datos adicionales
  const [currentDate, setCurrentDate] = useState('');
  const [userData, setUserData] = useState({
    nombre: 'Cargando...',
    grupo: 'Cargando...',
    imagen: 'https://i.imgur.com/9082o2m.jpg', // Imagen por defecto
  });
  const [tableData, setTableData] = useState({
    clase: 'Cargando...',
    estado: 'Cargando...', // El estado será "activo" o "inactivo"
    fecha: 'Cargando...',
    hora: 'Cargando...',
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

  // Función para obtener los datos de la tabla desde la API
  const fetchTableData = async () => {
    try {
      const response = await fetch('https://api.ejemplo.com/datosTabla');  // URL de la API de la tabla
      const data = await response.json();
      // Asignamos los datos recibidos de la API
      setTableData({
        clase: data.clase,
        estado: data.estado,  // 'activo' o 'inactivo'
        fecha: data.fecha,
        hora: data.hora,
      });
    } catch (error) {
      console.error('Error al obtener los datos de la tabla:', error);
    }
  };

  // Llamamos a las funciones cuando el componente se monta
  useEffect(() => {
    formatDate();  // Formatear la fecha
    fetchUserData();  // Obtener los datos del usuario
    fetchTableData(); // Obtener los datos de la tabla
  }, []);

  // Función para determinar el color del ícono según el estado
  const getStatusColor = (estado) => {
    if (estado === 'activo') {
      return 'green'; // Verde si el estado es "activo"
    } else {
      return 'red';  // Rojo si el estado es "inactivo"
    }
  };

  return (
    <View style={styles.mainContainer}>  {/* Contenedor principal centrado */}
      <View style={styles.container}>
        {/* Título Historial centrado */}
        <Text style={styles.title}>Historial</Text>

        <View style={styles.header}>
          <Text style={styles.headerText}>Dia {currentDate}</Text>
        </View>
        
        {/* Contenedor para la imagen, nombre y grupo alineados horizontalmente */}
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

        {/* Tabla de datos en formato horizontal */}
        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Clase:</Text>
            <Text style={styles.tableValue}>{tableData.clase}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Estado:</Text>
            <Text style={styles.tableValue}>
              <Icon
                name={tableData.estado === 'activo' ? 'check-circle' : 'times-circle'} // Ícono que cambia según el estado
                size={20}
                color={getStatusColor(tableData.estado)}  // Color verde o rojo según el estado
              />
              <Text style={{ color: getStatusColor(tableData.estado) }}>
                {tableData.estado}
              </Text>
            </Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Fecha:</Text>
            <Text style={styles.tableValue}>{tableData.fecha}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>Hora:</Text>
            <Text style={styles.tableValue}>{tableData.hora}</Text>
          </View>
        </View>

        {/* Botones centrados */}
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button}>
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
  title: {
    fontSize: 24, // Título más grande
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20, // Espaciado superior
    marginBottom: 20, // Espaciado inferior
    textAlign: 'center', // Asegura que el texto esté centrado
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
  profileContainer: {
    flexDirection: 'row', // Cambié a fila para colocar la imagen y los textos al lado
    alignItems: 'center',    // Centra todos los elementos
    marginTop: 20,  // Espaciado entre la fecha y la imagen
  },
  profileImg: {
    width: 100,  // Aumenté el tamaño de la imagen
    height: 100,
    borderRadius: 50,  // Imagen redonda
    marginRight: 20,  // Espaciado entre la imagen y el texto
  },
  profileDetails: {
    alignItems: 'flex-start',  // Alinea los textos a la izquierda
  },
  profileText: {
    color: '#000',
    fontSize: 20,
  },
  tableContainer: {
    marginTop: 20,  // Espaciado entre el perfil y la tabla
    width: '100%',  // Ocupa todo el ancho
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  tableRow: {
    flexDirection: 'row',  // Cambié a fila para colocar los datos horizontalmente
    justifyContent: 'flex-start',
    marginBottom: 10,  // Espaciado entre filas
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
    marginRight: 10,  // Espaciado entre el encabezado y el valor
  },
  tableValue: {
    fontSize: 16,
    color: '#333',
  },
  buttons: {
    flexDirection: 'column', // Cambiado a columna para centrar los botones
    gap: 10,  // Ajusta la separación entre los botones
    marginTop: 20,  // Ajustado para centrar más los botones
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

