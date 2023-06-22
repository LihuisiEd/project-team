import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { Auth } from 'aws-amplify';

const ColaboratorScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { users } = await Auth.listUsers();
      setUsers(users);
    } catch (error) {
      console.log('Error fetching users:', error);
    }
  };

  return (
    <View>
      <Text>Hola, este es el archivo ColaboratorScreen.js</Text>
      {users.map((user) => (
        <Text key={user.username}>{user.username}</Text>
      ))}
    </View>
  );
};

export default ColaboratorScreen;
