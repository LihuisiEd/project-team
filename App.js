import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DataStore } from 'aws-amplify';


import HomeView from './views/HomeView';
import LoginScreen from './views/LoginScreen';
import RegisterScreen from './views/RegisterScreen';
import VerificationScreen from './views/VerificationScreen'
import PerfilScreen from './views/PerfilScreen';
import AddColaborator from './views/AddCollaborator';


// Amplify
import { Amplify, Auth } from 'aws-amplify';
import awsconfig from './src/aws-exports';
Amplify.configure(awsconfig);


export default function App() {
  const [user, setUser] = useState(null);

  const Stack = createStackNavigator();

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
      console.log('Autentificacion malaaaaa', error);
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
            <Stack.Screen name="Register" options={{ headerShown: false }}>
              {(props) => (
                <RegisterScreen {...props} signUp={signUp} setUser={setUser} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Verification" options={{ headerShown: false }}>
              {(props) => (
                <VerificationScreen {...props} signUp={signUp} setUser={setUser} />
              )}
            </Stack.Screen>

          </>
        )}
        <Stack.Screen name="Perfil">
          {(props) => <PerfilScreen {...props} user={user} />}
        </Stack.Screen>
        <Stack.Screen name="AddCollaborator">
          {(props) => <AddColaborator {...props} user={user} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    width: 200,
  },
});
