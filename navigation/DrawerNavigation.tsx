import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MyTabs from './tabNavigation';
import { Home } from '../src/screens/Home';

const Drawer = createDrawerNavigator();

export default function DrawerNavigation() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Tabs" component={MyTabs} />
      {/* Agrega otras screens al Drawer si es necesario pero como quierasxd*/}
    </Drawer.Navigator>
  );
}
export const DrawerNavigator = () => {
}
