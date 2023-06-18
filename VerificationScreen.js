import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { Auth } from 'aws-amplify';

export default function VerificationScreen() {
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');

  const confirmSignUp = async () => {
    try {
      await Auth.confirmSignUp(username, verificationCode);
      console.log('Cuenta confirmada correctamente');
    } catch (error) {
      console.log('Error al confirmar la cuenta:', error);
    }
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
        placeholder="Código de verificación"
        value={verificationCode}
        onChangeText={setVerificationCode}
      />
      <Pressable onPress={confirmSignUp} style={styles.button}>
        <Text style={styles.buttonText}>Confirmar cuenta</Text>
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
});
