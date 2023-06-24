import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ImageBackground,Image } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../src/models';

const imageBackground = require('../assets/background.jpg');
const logoImage = require('../assets/TaskVerse.png');

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
    <ImageBackground source={imageBackground} style={styles.backgroundImage}>
      <View style={styles.container}>
      <Image source={logoImage} style={styles.logo}  />
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Número de teléfono"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
        />
        <Pressable onPress={handleSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  logo: {
    width: 400,
    height: 100,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    width: 380,
  },
  button: {
    backgroundColor: '#A60321',
    padding: 10,
    borderRadius: 5,
    width: 380,
  },
  buttonText: {
    color: '#F29C6B',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
