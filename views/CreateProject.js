import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataStore } from '@aws-amplify/datastore';
import { User, Companion, Project, Collaborator } from '../src/models';
import { TextInput, Button, Checkbox } from 'react-native-paper';
import PruebasPost from './PruebasPost';

const ProjectList = ({ user }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);

  const navigation = useNavigation();
  const [companions, setCompanions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [datosEnviados, setDatosEnviados] = useState(null);

  const getUserById = async (userId) => {
    try {
      const fetchedUser = await DataStore.query(User, userId);
      return fetchedUser;
    } catch (error) {
      console.log('Error fetching user by ID:', error);
    }
  };

  useEffect(() => {
    const fetchCompanions = async () => {
      try {
        const currentUser = await DataStore.query(User, (u) => u.name.eq(user.username.toLowerCase()));
        const fetchedCompanions = await DataStore.query(Companion, (c) =>
          c.userID.eq(currentUser[0].id)
        );

        const populatedCompanions = await Promise.all(
          fetchedCompanions.map(async (companion) => {
            const fetchedUser = await getUserById(companion.companionID);
            return { ...companion, companion: fetchedUser };
          })
        );

        setCompanions(populatedCompanions);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching companions:', error);
      }
    };

    fetchCompanions();

    const subscriptions = [
      DataStore.observe(Companion).subscribe(() => {
        fetchCompanions();
      }),
    ];

    return () => {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
    };
  }, [user]);

  const handleItemSelect = (itemId) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(itemId)) {
        return prevSelectedItems.filter((id) => id !== itemId);
      } else {
        return [...prevSelectedItems, itemId];
      }
    });
  };

  const handleAddProject = async () => {
    try {
      let userId; // Declarar la variable userId fuera del bloque try

      try {
        const users = await DataStore.query(User, (u) => u.name.eq(user.username.toLowerCase()));
        if (users.length === 0) {
          console.log("No se encontraron usuarios con ese nombre");
          return;
        }
        userId = users[0].id; // Asignar el valor de userId dentro del bloque try
        console.log("ID del usuario encontrado:", userId);
      } catch (error) {
        console.log("Error al buscar el usuario:", error);
        return;
      }

      const newProject = await DataStore.save(
        new Project({
          projectName: titulo,
          description: descripcion,
          creatorID: userId,
          createdAt: new Date().toISOString()
        })
      );

      if (selectedItems.length > 0) {
        for (const selectedItem of selectedItems) {
          await DataStore.save(
            new Collaborator({
              userID: selectedItem,
              projectID: newProject.id, 
            })
          );
        }
        console.log('Compañeros agregados:', selectedItems);
      }
      console.log('Proyecto agregado:', newProject);
    } catch (error) {
      console.log('Error al agregar el proyecto:', error);
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedItems.includes(item.id);

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.companion?.name}</Text>
        <Checkbox
          status={isSelected ? 'checked' : 'unchecked'}
          onPress={() => handleItemSelect(item.id)}
          color="#d03335" // Cambio de color del checkbox
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={[styles.input, { backgroundColor: '#f9ead3' }]}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Ingresa el título"
        theme={{ colors: { primary: '#d03335', text: 'black', background: '#f9ead3' } }}
      />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={[styles.textarea, { backgroundColor: '#f9ead3' }]}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Ingresa la descripción"
        multiline={true}
        theme={{ colors: { primary: '#d03335', text: 'black', background: '#f9ead3' } }}
      />

      <Text style={styles.label}>Colaboradores:</Text>
      <FlatList
        data={companions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <Button
        mode="contained"
        onPress={handleAddProject}
        style={[styles.button, { backgroundColor: '#d03335' }]}
        labelStyle={[styles.buttonText, { color: 'white' }]}
        theme={{ colors: { primary: '#d03335', text: 'white' } }}
      >
        Enviar
      </Button>
      {datosEnviados && <PruebasPost data={datosEnviados} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
  },
  textarea: {
    marginBottom: 16,
    height: 100,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    flex: 1,
    fontSize: 14,
  },
  button: {
    marginTop: 50,
    marginBottom: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
   textAlign: 'center',
  },
});

export default ProjectList;