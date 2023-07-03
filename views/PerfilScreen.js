import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ImageBackground } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../src/models';

const PerfilScreen = ({ user }) => {
  const [perfilUser, setPerfilUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPerfilUser = async () => {
      try {
        const currentUser = await DataStore.query(User, (u) =>
          u.name.eq(user.username.toLowerCase())
        );

        if (currentUser.length === 0) {
          console.log('Usuario logueado no encontrado');
          return;
        }

        setPerfilUser(currentUser[0]);
        setLoading(false);
      } catch (error) {
        console.log('Error al cargar el perfil del usuario:', error);
      }
    };

    loadPerfilUser();
  }, [user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.profileContainer}>
            <Image source={require('../assets/perfil.jpg')} style={styles.profileImage} />
            <Text style={styles.username}>{perfilUser.name}</Text>
          </View>
          <Text style={styles.label}>Email de usuario:</Text>
          <Text style={styles.text}>{perfilUser.email}</Text>
          <Text style={styles.label}>Teléfono de usuario:</Text>
          <Text style={styles.text}>{perfilUser.phoneNumber}</Text>
        </View>
      </View>
    </ImageBackground>
  );
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
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    elevation: 3,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
  },
});

export default PerfilScreen;


