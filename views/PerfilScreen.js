import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../src/models';
import Swal from 'sweetalert2';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const imageBackground = require('../views/Images/background-task.jpg');

const PerfilScreen = ({ user }) => {
  const [perfilUser, setPerfilUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);

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

  const loadProfileImage = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://taskverse-api-env.eba-hzcetw9a.us-east-1.elasticbeanstalk.com/api/images/${perfilUser.id}/profile_photo`,
        {
          responseType: 'arraybuffer',
        }
      );

      const imageUrl = URL.createObjectURL(new Blob([response.data], { type: 'image/jpeg' }));
      setProfileImage(imageUrl);
      setLoading(false);
    } catch (error) {
      console.log('Error al cargar la imagen:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (perfilUser && perfilUser.id) {
      loadProfileImage();
    }
  }, [perfilUser]);

  const handleEditPhoto = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissionResult.granted) {
        alert('Se requiere permiso para acceder a las imágenes');
        return;
      }

      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      setIsEditMode(true);

      if (!pickerResult.cancelled) {
        setProfileImage(pickerResult.uri);
        setPreviewImage(pickerResult.uri);
      }
    } catch (error) {
      console.log('Error al seleccionar la imagen:', error);
    }
  };

  const handleSavePhoto = async () => {
    try {
      if (profileImage !== null) {
        const blobImage = await convertBase64ToBlob(profileImage, 'image/jpeg');
        const formData = new FormData();
        formData.append('userId', perfilUser.id);
        formData.append('image', blobImage, 'profile_photo.jpg');

        const response = await axios.post(
          'http://taskverse-api-env.eba-hzcetw9a.us-east-1.elasticbeanstalk.com/api/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (response.status === 200) {
          Swal.fire('Imagen guardada correctamente', '', 'success');
          setIsEditMode(false);

          // Actualizar el estado para reflejar que se ha guardado la imagen
          setPerfilUser((prevUser) => ({
            ...prevUser,
            profileImage: true,
          }));
          setProfileImage(null); // Limpiar la imagen seleccionada
        } else {
          Swal.fire('Error al guardar la imagen', '', 'error');
        }
      } else {
        Swal.fire('Por favor, selecciona un archivo primero', '', 'error');
      }
    } catch (error) {
      console.log('Error al guardar la imagen:', error);
      Swal.fire('Error al guardar la imagen', '', 'error');
    }
  };

  const convertBase64ToBlob = (base64, type) => {
    return new Promise((resolve, reject) => {
      const base64String = base64.split(',')[1];

      const byteCharacters = atob(base64String);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const slice = byteCharacters.slice(offset, offset + 1024);
        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
          byteNumbers[i] = slice.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type });
      resolve(blob);
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <ImageBackground source={imageBackground} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Avatar.Image
            size={200}
            source={
              profileImage ? { uri: profileImage } : require('../assets/perfil.jpg')
            }
          />
          <Button
            mode="contained"
            style={styles.editButton}
            onPress={isEditMode ? handleSavePhoto : handleEditPhoto}
          >
            {isEditMode ? 'Guardar Foto' : 'Editar Foto'}
          </Button>
        </View>
        <Card style={styles.card}>
          <Card.Content>
            <Text style={styles.label}>Nombre de usuario:</Text>
            <Text style={styles.text}>{perfilUser.name}</Text>
            <Text style={styles.label}>Email de usuario:</Text>
            <Text style={styles.text}>{perfilUser.email}</Text>
            <Text style={styles.label}>Teléfono de usuario:</Text>
            <Text style={styles.text}>{perfilUser.phoneNumber}</Text>
          </Card.Content>
        </Card>
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
  profileContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  editButton: {
    marginTop: 8,
  
  },
  card: {
    width: '80%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  text: {
    fontSize: 14,
    marginBottom: 10,
  },
});

export default PerfilScreen;
