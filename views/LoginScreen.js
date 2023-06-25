import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, ImageBackground, Image, Alert } from 'react-native';
import { Amplify, Auth } from 'aws-amplify';
import { DataStore } from 'aws-amplify';

const imageBackground = require('../assets/background.jpg');
const logoImage = require('../assets/TaskVerse.png');

export default function LoginScreen({ signIn, navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleSignIn = async () => {
    if ( (await signIn(username, password)) == true){
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
          placeholder="Contraseña"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        <Pressable onPress={handleSignIn} style={styles.button}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </Pressable>
        <Pressable onPress={handleRegister}>
          <Text style={styles.registerText}>¿No tienes una cuenta? Regístrate</Text>
        </Pressable>
        <Pressable onPress={handleVerification}>
          <Text style={styles.registerText}>¿Tienes un código de verificación?</Text>
        </Pressable>
        
        {showAlert && (
          <View style={styles.alertContainer}>
            <Text style={styles.alertText}>Contraseña incorrecta. Por favor, verifica tu contraseña.</Text>
            <Pressable onPress={closeAlert} style={styles.alertButton}>
              <Text style={styles.alertButtonText}>Cerrar</Text>
            </Pressable>
          </View>
        )}
    
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
  registerText: {
    marginTop: 10,
    color: '#A60321',
    textDecorationLine: 'underline',
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
    backgroundColor: '#A60321',
    padding: 10,
    borderRadius: 5,
  },
  alertButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});



