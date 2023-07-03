import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { User, Companion } from '../src/models';

const CollaboratorList = ({ onAddCollaborator }) => {
    const [users, setUsers] = useState([]);
    //Este es un ejemplo de cambio
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const fetchedUsers = await DataStore.query(User);
                setUsers(fetchedUsers);
            } catch (error) {
                console.log('Error fetching users:', error);
            }
        };

        fetchUsers();

        const subscription = DataStore.observe(User).subscribe(() => {
            fetchUsers();
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleAddCollaborator = async (selectedUser) => {
        try {
            const newCompanion = await DataStore.save(
                new Companion({
                    userID: selectedUser.id,
                    companionID: selectedUser.id,
                })
            );

            console.log('Compañero agregado:', newCompanion);
            onAddCollaborator(); // Actualizar la lista de compañeros después de añadir uno nuevo
        } catch (error) {
            console.log('Error al agregar el compañero:', error);
        }
    };

    return (
        <View style={styles.container}>
            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CollaboratorList;
