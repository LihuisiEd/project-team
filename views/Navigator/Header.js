import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Appbar, Menu, Divider } from 'react-native-paper';

const MyHeader = () => {
    const navigation = useNavigation();
    const [menuVisible, setMenuVisible] = React.useState(false);

    const handleMore = () => {
        setMenuVisible(true);
    };

    const handleMenuClose = () => {
        setMenuVisible(false);
    };

    const handlePerfil = () => {
        navigation.navigate('Perfil');
        setMenuVisible(false);
    };


    const handleCerrarSesion = () => {
        // Lógica para cerrar sesión
    };

    return (
        <Appbar.Header>
            <Appbar.Content title="Mi Aplicación" />
            <Menu
                visible={menuVisible}
                onDismiss={handleMenuClose}
                anchor={
                    <Appbar.Action icon="dots-vertical" color="#fff" onPress={handleMore} />
                }
            >
                <Menu.Item onPress={handlePerfil} title="Perfil" />
                <Divider />
                <Menu.Item onPress={handleCerrarSesion} title="Cerrar Sesión" />
            </Menu>
        </Appbar.Header>
    );
};

export default MyHeader;
