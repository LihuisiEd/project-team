import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ImageBackground, Image } from 'react-native';
import { Auth } from 'aws-amplify';

const imageBackground = require('../assets/background.jpg');
const logoImage = require('../assets/TaskVerse.png');

export default function VerificationScreen() {
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, verificationCode);
      console.log('Cuenta confirmada correctamente');
      navigation.navigate('Home');
    } catch (error) {
      console.log('Error al confirmar la cuenta:', error);
    }
  };

  return (
    <ImageBackground source={imageBackground} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Image source={logoImage} style={styles.logo} />
        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Código de verificación"
          value={verificationCode}
          onChangeText={setVerificationCode}
        />
        <Pressable onPress={confirmSignUp} style={styles.button}>
          <Text style={styles.buttonText}>Confirmar cuenta</Text>
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
    textAlign: 'center'
  },
});
