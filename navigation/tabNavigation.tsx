import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { View, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Generar from '../src/screens/Generar';
import { Profile } from '../src/screens/Profile';

const Tab = createMaterialBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Generar"
      activeColor="dodgerblue"
      inactiveColor="white"
      barStyle={styles.tabBar}
    >
      <Tab.Screen
        name="Generar"
        component={Generar}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="qrcode" color={color} size={26} />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name="account" color={color} size={26} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'dodgerblue',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    elevation: 5, // Añade sombra en Android
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
