import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Alert, Pressable } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { User, Companion } from '../src/models';

const AddColaborator = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState('');

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
        console.log('No puedes incluirte a ti mismo como compañero');
        return;
      }

      const newCompanion = await DataStore.save(
        new Companion({
          userID: currentUser[0].id,
          companionID: selectedUser
        })
      );

      const selectedUserObj = users.find((user) => user.id === selectedUser);
      const selectedUserName = selectedUserObj ? selectedUserObj.name : '';

      console.log('Compañero agregado:', newCompanion, 'nombre: ', selectedUserName);

      setSelectedUserName(selectedUserName);
      setShowAlert(true);

    } catch (error) {
      console.log('Error al agregar el compañero:', error);
    }
  };

  const closeAlert = () => {
    setShowAlert(false);
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
              color="#d03335"
              style={styles.addButton}
              disabled={showAlert}
            />
          </View>
        )}
      />
      {showAlert && (
        <View style={styles.alertContainer}>
          <Text style={styles.alertText}>Añadiste a {selectedUserName} correctamente</Text>
          <Pressable onPress={closeAlert} style={styles.alertButton}>
            <Text style={styles.alertButtonText}>Cerrar</Text>
          </Pressable>
        </View>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#212022', 
  },
  userContainer: {
    marginBottom: 16,
    backgroundColor: '#25232A',
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
    color: '#d03335',
  },
  userEmail: {
    fontSize: 16,
    marginBottom: 8, 
    color: '#f9ead3',
  },
  addButton: {
    marginTop: 8,
    borderRadius: 8,
    backgroundColor: '#d03335'
  },
  alertContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 20,
    borderRadius: 5,
    position: 'fixed',
    top: 80,
    left: 20,
    right: 20,
  },
  alertText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 10,
    color: '#f9ead3',
  },
  alertButton: {
    backgroundColor: '#d03335',
    padding: 10,
    borderRadius: 5,
  },
  alertButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddColaborator;