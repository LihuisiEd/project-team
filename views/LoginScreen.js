import React, { useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { TextInput, Button,Provider as PaperProvider, DefaultTheme  } from 'react-native-paper';

const imageBackground = require('../views/Images/background-task.jpg');
const logoImage = require('../views/Images/TaskVers-Logo.png');

export default function LoginScreen({ signIn, navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSignIn = async () => {
    if (await signIn(username, password)) {
      await signIn(username, password);
    } else {
      setShowAlert(true);
    }
  };

  const handleVerification = () => {
    navigation.navigate('Verification');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const closeAlert = () => {
    setShowAlert(false);
  };

  return (
    <PaperProvider theme={theme}>
    <ImageBackground source={imageBackground} style={styles.backgroundImage}>
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

        <Button
          mode="contained"
          onPress={handleSignIn}
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          Iniciar sesión
        </Button>

        <Button onPress={handleRegister} labelStyle={styles.texto} >
          ¿No tienes una cuenta? Regístrate
        </Button>

        <Button onPress={handleVerification} labelStyle={styles.texto}>
          ¿Tienes un código de verificación?
        </Button>

        {showAlert && (
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>
              Contraseña incorrecta. Por favor, verifica tu contraseña.
            </Text>
            <Button onPress={closeAlert} style={styles.alertButton}>
              Cerrar
            </Button>
          </View>
        )}
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
    fontFamily: 'ITC Avant Garde Gothic',
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#A60321',
  },
  logo: {
    height: 80,
    aspectRatio: 4 / 1,
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
    color: 'white',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  alertContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    borderRadius: 5,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  alertText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
  },
  alertButton: {
    backgroundColor: '#d03335',
    padding: 10,
    borderRadius: 5,
  },
  texto: {
    color: '#d03335',
  },
});
