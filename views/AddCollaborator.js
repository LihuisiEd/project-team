import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { User, Companion } from '../src/models';

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
            console.log(currentUser)
            console.log(selectedUser)
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

            console.log('Compañero agregado:', newCompanion);
        } catch (error) {
            console.log('Error al agregar el compañero:', error);
        }
    };

    return (
        <View>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.name}</Text>
                        <Text>{item.email}</Text>
                        <Button
                            title="Añadir"
                            onPress={() => handleAddUser(item.id)}
                        />
                    </View>
                )}
            />
        </View>
    );
};

export default AddColaborator;
