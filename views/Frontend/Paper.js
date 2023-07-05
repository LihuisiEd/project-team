import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Platform } from 'react-native';
import { Appbar, Avatar, IconButton, TextInput, Button, MD2Colors, MD2DarkTheme } from 'react-native-paper';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

const Paper = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // Función para retroceder a la vista anterior
  const handleGoBack = () => {
    navigation.goBack();
  };

  // Componente personalizado para el botón de retroceso
  const CustomBackButton = () => (
    <Appbar.Action icon="arrow-left" onPress={handleGoBack} />
  );

  const handleFormSubmit = () => {
    // Aquí puedes realizar acciones con los datos del formulario
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={{ flex: 1, backgroundColor: MD2DarkTheme.colors.background }}>
      <Appbar.Header>
        <CustomBackButton />
        <Appbar.Content title="Title" subtitle="Subtitle" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="dots-vertical" onPress={() => {}} />
      </Appbar.Header>

      {/* Contenido adicional */}
      <View style={{ flex: 1, padding: 16 }}>
        <Avatar.Icon icon="account" />
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          label="Password"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />
        <Button
          mode="contained"
          icon="send"
          onPress={handleFormSubmit}
          contentStyle={{ borderRadius: 50 }}
        >
          Enviar
        </Button>
      </View>
    </View>
  );
};

export default Paper;
