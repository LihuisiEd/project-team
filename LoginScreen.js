import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { Amplify, Auth } from 'aws-amplify';
import { DataStore } from 'aws-amplify';

export default function LoginScreen({ signIn, navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSignIn = async () => {
    await signIn(username, password);
  };

  const handleVerification = () => {
    navigation.navigate('Verification');
  }

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
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
    </View>
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
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 10,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
