import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { Appbar, Menu, Divider } from 'react-native-paper';
import { TouchableOpacity, Image, View } from 'react-native';
import { Dimensions, StyleSheet } from 'react-native';

const MyHeader = ({ signOut }) => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const isMobile = windowWidth <= 767;
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

  return (
    <Appbar.Header style={styles.header} mode='medium' elevated>
      <TouchableOpacity
        onPress={() => {}}
        style={styles.logoContainer}
        activeOpacity={1}
      >
        <Image
          source={require('../Images/TaskVers-Logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Appbar.Content title="TaskVerse" titleStyle={styles.title} />
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        {isMobile ? (
          <Menu
            visible={menuVisible}
            onDismiss={handleMenuClose}
            anchor={
              <TouchableOpacity onPress={handleMore}>
                <Appbar.Action icon="dots-vertical" color={styles.icon.color} />
              </TouchableOpacity>
            }
          >
            <Menu.Item onPress={handlePerfil} titleStyle={styles.menuItem} title="Perfil" />
            <Divider />
            <Menu.Item onPress={signOut} titleStyle={styles.menuItem} title="Cerrar Sesión" />
          </Menu>
        ) : (
          <>
            <Appbar.Action
              icon="account"
              color={styles.icon.color}
              onPress={handlePerfil}
            />
            <Appbar.Action
              icon="logout"
              color={styles.icon.color}
              onPress={signOut}
            />
          </>
        )}
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#212022',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  title: {
    color: '#d03335',
    fontFamily: 'ITC Avant Garde Gothic',
    fontSize: 30,
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 10,
  },
  icon: {
    color: '#f9ead3',
  },
  menuItem: {
    color: '#d03335',
  },
});

export default MyHeader;
