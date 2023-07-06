import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataStore } from '@aws-amplify/datastore';
import { User, Companion } from '../src/models';
import { Button, Avatar, Card, IconButton, Text, ActivityIndicator, Dialog, Portal } from 'react-native-paper';
const CollaboratorScreen = ({ user }) => {
  const navigation = useNavigation();
  const [companions, setCompanions] = useState([]);
  const [companionOf, setCompanionOf] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCompanion, setSelectedCompanion] = React.useState(null);
  const [dialogVisible, setDialogVisible] = React.useState(false);

  const openDialog = (companion) => {
    setSelectedCompanion(companion);
    setDialogVisible(true);
  };
  const closeDialog = () => {
    setDialogVisible(false);
  };
  const getUserById = async (userId) => {
    try {
      const fetchedUser = await DataStore.query(User, userId);
      return fetchedUser;
    } catch (error) {
      console.log('Error fetching user by ID:', error);
    }
  };
  const handleDelete = async () => {
    try {
      await handleDeleteCompanion(selectedCompanion.id);
      console.log('Companion deleted successfully.');
    } catch (error) {
      console.log('Error deleting companion:', error);
    }
    closeDialog();
  };
  const handleDeleteCompanion = async (companionId) => {
    try {
      const companionToDelete = await DataStore.query(Companion, companionId);
      await DataStore.delete(companionToDelete);
    } catch (error) {
      console.log('Error deleting companion:', error);
      throw error;
    }
  };
  useEffect(() => {
    const fetchCompanions = async () => {
      if (!user || !user.username) {
        console.log('Usuario no válido');
        return;
      }
      try {
        const currentUser = await DataStore.query(User, (u) => u.name.eq(user.username.toLowerCase()));

        if (currentUser.length === 0) {
          console.log('Usuario logueado no encontrado');
          return;
        }

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

    const fetchCompanionOf = async () => {
      try {
        const currentUser = await DataStore.query(User, (u) => u.name.eq(user.username.toLowerCase()));


        const fetchedCompanionOf = await DataStore.query(Companion, (c) =>
          c.companionID.eq(currentUser[0].id)
        );

        const populatedCompanionOf = await Promise.all(
          fetchedCompanionOf.map(async (companion) => {
            const fetchedUser = await getUserById(companion.userID);
            return { ...companion, user: fetchedUser };
          })
        );

        setCompanionOf(populatedCompanionOf);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching companionOf:', error);
      }
    };

    fetchCompanions();
    fetchCompanionOf();

    const subscriptions = [
      DataStore.observe(Companion).subscribe(() => {
        fetchCompanions();
      }),
      DataStore.observe(Companion).subscribe(() => {
        fetchCompanionOf();
      }),
    ];

    return () => {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
    };
  }, [user]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button mode='contained-tonal' onPress={() => navigation.navigate('AddCollaborator')}>Añadir compañero</Button>
      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8, marginTop: 16 }}>Mis compañeros:</Text>
      <FlatList
        data={companions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 8 }}>
            <Card.Title
              title={item.companion?.name}
              subtitle={item.companion?.email}
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="close-circle"
                  onPress={() => openDialog(item)}
                />
              )}
            />
          </Card>
        )}
      />

      <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8, marginTop: 16 }}>Soy compañero de:</Text>
      <FlatList
        data={companionOf}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 8 }}>
            <Card.Title
              title={item.user?.name}
              subtitle={item.user?.email}
              left={(props) => <Avatar.Icon {...props} icon="folder" />}
              right={(props) => (
                <IconButton
                  {...props}
                  icon="close-circle"
                  onPress={() => openDialog(item)}
                />
              )}
            />
          </Card>
        )}
      />

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={closeDialog}>
          <Dialog.Title>¡Hasta pronto!</Dialog.Title>
          <Dialog.Content>
            <Text>¿Estás seguro que quieres eliminar este compañero?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleDelete}>Eliminar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default CollaboratorScreen;

