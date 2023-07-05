import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import HomeView from './views/HomeView';
import LoginScreen from './views/LoginScreen';
import RegisterScreen from './views/RegisterScreen';
import VerificationScreen from './views/VerificationScreen'
import PerfilScreen from './views/PerfilScreen';
import AddColaborator from './views/AddCollaborator';

//Frontend FrameWork
import Paper from './views/Frontend/Paper'
import { Provider as PaperProvider, MD2DarkTheme, configureFonts, MD2LightTheme } from 'react-native-paper';
import { fontConfig } from './views/Frontend/fontConfig'

// Amplify
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);


export default function App() {
  const [user, setUser] = useState(null);
  const Stack = createStackNavigator();

  const theme = {
    ...MD2DarkTheme,
    fonts: configureFonts({ config: fontConfig, isV3: false }),
    colors: {
      ...MD2DarkTheme.colors,
      primary: '#2196F3', // Azul primario
      accent: '#00BCD4', // Celeste de acento
      error: '#FF0000', // Rojo de error
      background: '#121212', // Color de fondo
      surface: '#212121', // Color de la superficie
      text: '#FFFFFF', // Color del texto
      disabled: '#9E9E9E', // Color de elementos deshabilitados
      placeholder: '#9E9E9E', // Color del texto de marcador de posición
      backdrop: '#000000', // Color de fondo del modal
      notification: '#FF9800', // Color de notificación
      onSurface: '#FFFFFF', // Color del texto en la superficie
      onBackground: '#FFFFFF', // Color del texto en el fondo
      accentVariant: '#0097A7', // Variante de color de acento
      surfaceVariant: '#37474F', // Variante de color de la superficie
      disabledSurface: '#616161', // Superficie deshabilitada
      disabledText: '#BDBDBD', // Texto deshabilitado
      placeholderText: '#757575', // Color del texto de marcador de posición en los TextInputs
      selectionColor: '#64B5F6', // Color de la selección de texto
      underlineColor: '#64B5F6', // Color de la línea inferior en los TextInputs
    },
  };

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUser(user);
    } catch (error) {
      setUser(null);
    }
  }

  async function signIn(username, password) {
    try {
      const user = await Auth.signIn(username, password);
      if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {

      } else {
        setUser(user);
        console.log('Inicio de sesión exitoso para', user);
      }
    } catch (error) {

      console.log('Error al iniciar sesión', error);
    }
  }

  async function signUp(username, password, email, phoneNumber) {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          phone_number: phoneNumber,
        },
        autoSignIn: {
          enabled: true,
        },
      });
      console.log('Registro exitoso para', user);
      setUser(user);
    } catch (error) {
      console.log('Error al registrar', error);
    }
  }

  async function signOut() {
    try {
      await Auth.signOut();
      setUser(null);
    } catch (error) {
      console.log('Error al cerrar sesión', error);
    }
  }

  return (
    <PaperProvider theme={theme}>


      <NavigationContainer>
        <Stack.Navigator>
          {user ? (
            <Stack.Screen name="Home" options={{ headerShown: false }}>
              {(props) => <HomeView {...props} user={user} signOut={signOut} />}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Login" options={{ headerShown: false }}>
                {(props) => <LoginScreen {...props} signIn={signIn} />}
              </Stack.Screen>
              <Stack.Screen name="Register">
                {(props) => (
                  <RegisterScreen {...props} signUp={signUp} setUser={setUser} />
                )}
              </Stack.Screen>
              <Stack.Screen name="Verification">
                {(props) => (
                  <VerificationScreen {...props} signUp={signUp} setUser={setUser} />
                )}
              </Stack.Screen>

            </>
          )}
          <Stack.Screen name="Perfil">
            {(props) => <PerfilScreen {...props} user={user} />}
          </Stack.Screen>
          <Stack.Screen name="Paper" options={{ headerShown: false }}>
            {(props) => <Paper {...props} user={user} />}
          </Stack.Screen>
          <Stack.Screen name="AddCollaborator">
            {(props) => <AddColaborator {...props} user={user} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
