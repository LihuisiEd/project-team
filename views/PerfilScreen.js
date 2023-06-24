import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../src/models';

const PerfilScreen = ({ user }) => {
    const [perfilUser, setPerfilUser] = useState(null);

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
                console.log(currentUser)
                setPerfilUser(currentUser[0]);
            } catch (error) {
                console.log('Error al cargar el perfil del usuario:', error);
            }
        };

        loadPerfilUser();
    }, [user]);

    if (!perfilUser) {
        return <Text>Cargando...</Text>;
    }

    return (
        <View>
            <Text>Nombre de usuario: {perfilUser.name}</Text>
            <Text>Email de usuario: {perfilUser.email}</Text>
            <Text>Teléfono de usuario: {perfilUser.phoneNumber}</Text>
        </View>
    );
};

export default PerfilScreen;
