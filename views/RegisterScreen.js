import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../src/models';
import { Appbar,Provider as PaperProvider, DefaultTheme  } from 'react-native-paper';

const imageBackground = require('../views/Images/background-task.jpg');
const logoImage = require('../views/Images/TaskVers-Logo.png');

export default function RegisterScreen({ signUp, setUser, navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSignUp = async () => {
    await signUp(username, password, email, "+51" + phoneNumber);
    createUser()
    navigation.navigate('Home');
  };

  const createUser = async () => {
    const user = await DataStore.save(
      new User({
        name: username.toLowerCase(),
        email: email,
        phoneNumber: phoneNumber,
        createdAt: new Date().toISOString(),
      })
    );
  
    console.log('Registro exitoso en la tabla "User":', user);

    setUsername('');
    setPassword('');
    setEmail('');
    setPhoneNumber('');
  };

  return (
    <PaperProvider theme={theme}>
    <ImageBackground source={imageBackground} style={styles.backgroundImage}>
      <Appbar.Header style={styles.navbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} style={styles.flechita}/>
      </Appbar.Header>
      <View style={styles.container}>
        <Text style={styles.companyName}>TaskVerse</Text>
        <Image source={logoImage} style={styles.logo} resizeMode="contain" />
        <TextInput
          label="Usuario"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          label="Contraseña"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TextInput
          label="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          label="Número de teléfono"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
          labelStyle={styles.buttonText}
        />
        <Button
          mode="contained"
          onPress={handleSignUp}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Registrarse
        </Button>
      </View>
    </ImageBackground>
    </PaperProvider>
  );
}
const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#d03335',
  },
};
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  flechita: {
    backgroundColor: '#d03335',
  },
  navbar: {
    backgroundColor: '#212022',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  companyName: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#A60321',
    fontFamily: 'ITC Avant Garde Gothic', // Agrega el estilo de letra
  },
  logo: {
    height: 80, // Ajusta la altura deseada
    aspectRatio: 4 / 1, // Ajusta la relación de aspecto del logo
    marginBottom: 20,
  },
  input: {
    width: 300,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 20,
    width: 300,
    backgroundColor: '#d03335',
    
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
