import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataStore } from '@aws-amplify/datastore';
import { User, Companion } from '../src/models';

const CollaboratorScreen = ({ user }) => {
  const navigation = useNavigation();
  const [companions, setCompanions] = useState([]);
  const [companionOf, setCompanionOf] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleAddCollaborator = () => {
    navigation.navigate('AddCollaborator');
  };

  const getUserById = async (userId) => {
    try {
      const fetchedUser = await DataStore.query(User, userId);
      return fetchedUser;
    } catch (error) {
      console.log('Error fetching user by ID:', error);
    }
  };

  useEffect(() => {
    const fetchCompanions = async () => {
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

        if (currentUser.length === 0) {
          console.log('Usuario logueado no encontrado');
          return;
        }

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button onPress={handleAddCollaborator} title="Añadir compañero" />
      <Text style={styles.dividers}>Mis compañeros:</Text>
      <FlatList
        data={companions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>UserID: {item.companionID}</Text>
            <Text>Name: {item.companion?.name}</Text>
            <Text>Email: {item.companion?.email}</Text>
          </View>
        )}
      />

      <Text style={styles.dividers}>Soy compañero de:</Text>
      <FlatList
        data={companionOf}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text>UserID: {item.userID}</Text>
            <Text>Name: {item.user?.name}</Text>
            <Text>Email: {item.user?.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dividers: {
    fontWeight: 'bold',
  },
});

export default CollaboratorScreen;
