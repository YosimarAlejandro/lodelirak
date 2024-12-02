import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { Home } from './src/screens/Home';
import { Profile } from './src/screens/Profile';
import { Historial } from './src/screens/historial';
import Generar from './src/screens/Generar';
import DrawerNavigation from './navigation/DrawerNavigation';
const Stack = createStackNavigator();
const App = () => {
  return (

    <NavigationContainer>
    <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{headerShown: true}}>
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="Register" component={RegisterScreen} />
    <Stack.Screen name="Drawer" component={DrawerNavigation} />
    <Stack.Screen name="Inicio" component={Home} />
    <Stack.Screen name="Historial" component={Historial} />
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Generar" component={Generar} />
        {/* Aquí "Main" son klas sceeen que se encuentran en el drawerrr😊 */}
    </Stack.Navigator>
</NavigationContainer>
  );
}
export default App;