import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { User, Companion } from '../src/models';
import Swal from 'sweetalert2'

const AddColaborator = ({ user }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const fetchedUsers = await DataStore.query(User, (u) => u.email.ne(user.email));
      setUsers(fetchedUsers);
    };
    fetchUsers();

    const subscription = DataStore.observe(User).subscribe(() => {
      fetchUsers();
    });

    return () => subscription.unsubscribe();
  }, [user]);

  const handleAddUser = async (selectedUser) => {
    try {
      const currentUser = await DataStore.query(User, (u) => u.name.eq(user.username.toLowerCase()));

      if (currentUser.length === 0) {
        console.log('Usuario logueado no encontrado');
        return;
      }
      if (currentUser[0].id === selectedUser) {
        Swal.fire({icon: 'error',title: 'Oops...', text: '¡No puedes incluirte a ti mismo como compañero!'}, 'success');
        console.log('No puedes incluirte a ti mismo como compañero');
        return;
      }

      const newCompanion = await DataStore.save(
        new Companion({
          userID: currentUser[0].id,
          companionID: selectedUser
        })
      );

      console.log('Compañero agregado:', newCompanion);
    } catch (error) {
      console.log('Error al agregar el compañero:', error);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.userName}>{item.name}</Text>
            <Text style={styles.userEmail}>{item.email}</Text>
            <Button
              title="Añadir"
              onPress={() => handleAddUser(item.id)}
              color="#A60321"
              style={styles.addButton}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  userContainer: {
    marginBottom: 16,
    backgroundColor: '#F2F2F2',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#888',
    borderStyle: 'solid',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 8,
  },
  addButton: {
    marginTop: 8,
    borderRadius: 8,
  },
});

export default AddColaborator;
