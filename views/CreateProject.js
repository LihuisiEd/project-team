import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataStore } from '@aws-amplify/datastore';
import { User, Companion,Project } from '../src/models';
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
  
      console.log('Proyecto agregado:', newProject);
    } catch (error) {
      console.log('Error al agregar el proyecto:', error);
    }
  };
  


  const handleEnviarClick = () => {
    setDatosEnviados({
      titulo,
      descripcion,
      companions: selectedItems.map((itemId) => {
        const companion = companions.find((item) => item.id === itemId);
        return companion?.companion?.name;
      }),
    });
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedItems.includes(item.id);

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.itemTitle}>{item.companion?.name}</Text>
        <TouchableOpacity
          style={[styles.checkbox, isSelected && styles.selectedCheckbox]}
          onPress={() => handleItemSelect(item.id)}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>

      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Ingresa el título"
      />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.textarea}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Ingresa la descripción"
        multiline={true}
      />

      <Text style={styles.label}>Colaboradores:</Text>
      <FlatList
        data={companions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

      <TouchableOpacity style={styles.button} onPress={() => {
       
          handleAddProject();
      }}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
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
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  textarea: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    textAlignVertical: 'top',
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
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
  },
  selectedCheckbox: {
    backgroundColor: 'blue',
    borderColor: 'blue',
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
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
