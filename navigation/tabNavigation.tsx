import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Generar from '../src/screens/Generar';
import { Profile } from '../src/screens/Profile';


const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        headerShadowVisible: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Generar') {
            iconName = 'account-circle'; // aqui cambia los iconos we 
          } else if (route.name === 'Perfil') {
            iconName = 'account-circle'; // aqui tambor
          }

          return (
            <View style={focused ? styles.iconContainerActive : styles.iconContainerInactive}>
              <MaterialCommunityIcons name={iconName} size={size} color={focused ? 'dodgerblue' : color} />
            </View>
          );
        },
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          elevation: 0,
          backgroundColor: 'dodgerblue',
          borderRadius: 40,
          height: 90,
        },
        tabBarShowLabel: false, 
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'white',
      })}
    >
      <Tab.Screen name="Calendario" component={Generar} />
      <Tab.Screen name="Perfil" component={Profile} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  iconContainerActive: {
    backgroundColor: 'white', 
    borderRadius: 25, 
    padding: 10, 
  },
  iconContainerInactive: {
    backgroundColor: 'transparent', 
    borderRadius: 25,
    padding: 10,
  },
});
