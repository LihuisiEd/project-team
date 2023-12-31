import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { TextInput, Button, Appbar,Provider as PaperProvider, DefaultTheme  } from 'react-native-paper';
import { Auth } from 'aws-amplify';

const imageBackground = require('../views/Images/background-task.jpg');
const logoImage = require('../views/Images/TaskVers-Logo.png');

export default function VerificationScreen({ navigation }) {
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
    <PaperProvider theme={theme} >
    <ImageBackground source={imageBackground} style={styles.backgroundImage}>
      <Appbar.Header style={styles.navbar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} style={styles.flechita}/>
      </Appbar.Header>
      <View style={styles.container}>
        <Text style={styles.companyName}>TaskVerse</Text>
        <Image source={logoImage} style={styles.logo} resizeMode="contain"/>
        <TextInput
          label="Usuario"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
        />
        <TextInput
          label="Código de verificación"
          value={verificationCode}
          onChangeText={setVerificationCode}
          style={styles.input}
        />
        <Button
          mode="contained"
          onPress={confirmSignUp}
          style={styles.button}
          labelStyle={styles.buttonText}
          contentStyle={styles.buttonContent}
        >
          Confirmar cuenta
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
    fontFamily: 'ITC Avant Garde Gothic',
  },
  logo: {
    height: 80,
    aspectRatio: 4 / 1,
    marginBottom: 20,
  },
  input: {
    width: 300,
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    width: 300,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  navbar: {
    backgroundColor: '#212022',
  },
  flechita: {
    backgroundColor: '#d03335',
  },
});
