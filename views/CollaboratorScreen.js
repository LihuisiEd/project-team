import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Button, ActivityIndicator, Image, Text, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataStore } from '@aws-amplify/datastore';
import { User, Companion } from '../src/models';
import { Card } from 'react-native-paper';

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

  const handleDeleteCompanion = async (companionId) => {
    try {
      const companionToDelete = await DataStore.query(Companion, companionId);
      await DataStore.delete(companionToDelete);
      console.log('Companion deleted successfully.');
    } catch (error) {
      console.log('Error deleting companion:', error);
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
        <ActivityIndicator size="large" color="#f9ead3" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Button onPress={handleAddCollaborator} title="Añadir compañero" color="#d03335" />
      <Text style={styles.dividers}>Mis compañeros:</Text>
      <View style={styles.gridContainer}>
        {companions.map((item) => (
          <Card key={item.id} style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={require('../assets/perfil.jpg')} style={styles.profileImage} resizeMode="contain" />
            </View>
            <Text style={styles.cardTitle}>{item.companion?.name}</Text>
            <Text style={styles.cardText}>{item.companion?.email}</Text>
            <View style={styles.boton}>
              <Button
                title="Eliminar"
                onPress={() => handleDeleteCompanion(item.id)}
                color="#d03335"
              />
            </View>
          </Card>
        ))}
      </View>

      <Text style={styles.dividers}>Soy compañero de:</Text>
      <View style={styles.gridContainer}>
        {companionOf.map((item) => (
          <Card key={item.id} style={styles.card}>
            <View style={styles.imageContainer}>
              <Image source={require('../assets/perfil.jpg')} style={styles.profileImage} resizeMode="contain" />
            </View>
            <Text style={styles.cardTitle}>{item.user?.name}</Text>
            <Text style={styles.cardText}>{item.user?.email}</Text>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
  },
  dividers: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 8,
    marginTop: 16,
    color: '#d03335',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 3,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 160,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 8,
    color: '#d03335',
  },
  cardText: {
    fontSize: 14,
    padding: 8,
    color: '#f9ead3',
  },
 
});

export default CollaboratorScreen;
