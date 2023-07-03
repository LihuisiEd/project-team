// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import { DataStore } from '@aws-amplify/datastore';
// import { User } from '../src/models';

// const PerfilScreen = ({ user }) => {
//   const [perfilUser, setPerfilUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const loadPerfilUser = async () => {
//       try {
//         const currentUser = await DataStore.query(User, (u) =>
//           u.name.eq(user.username.toLowerCase())
//         );

//         if (currentUser.length === 0) {
//           console.log('Usuario logueado no encontrado');
//           return;
//         }

//         setPerfilUser(currentUser[0]);
//         setLoading(false);
//       } catch (error) {
//         console.log('Error al cargar el perfil del usuario:', error);
//       }
//     };

//     loadPerfilUser();
//   }, [user]);

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#000000" />
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Nombre de usuario:</Text>
//       <Text style={styles.text}>{perfilUser.name}</Text>
//       <Text style={styles.label}>Email de usuario:</Text>
//       <Text style={styles.text}>{perfilUser.email}</Text>
//       <Text style={styles.label}>Teléfono de usuario:</Text>
//       <Text style={styles.text}>{perfilUser.phoneNumber}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   text: {
//     fontSize: 14,
//   },
// });

// export default PerfilScreen;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ImageBackground, TouchableOpacity, Button, TextInput, Platform } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../src/models';
import Swal from 'sweetalert2';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

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
      const response = await axios.get(`http://localhost:3000/api/images/${perfilUser.id}/profile_photo`, {
        responseType: 'arraybuffer',
      });

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

        const response = await axios.post('http://localhost:3000/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        if (response.status === 200) {
          Swal.fire('Imagen guardada correctamente', '', 'success');
          setIsEditMode(false);

          // Actualizar el estado para reflejar que se ha guardado la imagen
          setPerfilUser(prevUser => ({
            ...prevUser,
            profileImage: true
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
      const base64String = base64.split(',')[1]; // Eliminar el prefijo "data:image/jpeg;base64,"

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
    <ImageBackground source={require('../assets/background.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.profileImageContainer}
          onPress={isEditMode ? handleSavePhoto : handleEditPhoto}
        >
          <View style={styles.profileContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
            ) : profileImage ? (
              <Image source={{ uri: profileImage }} style={styles.profileImage} />
            ) : (
              <Image source={require('../assets/perfil.jpg')} style={styles.profileImage} />
            )}
            <Text style={styles.editPhotoText}>{isEditMode ? 'Guardar Foto' : 'Editar Foto'}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.card}>
          <Text style={styles.label}>Nombre de usuario:</Text>
          <Text style={styles.text}>{perfilUser.name}</Text>
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
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 5,
    marginTop: 5,
    padding: 5,
  },
});

export default PerfilScreen;


