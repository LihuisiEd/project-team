import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, ActivityIndicator, Image } from 'react-native';
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
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Button onPress={handleAddCollaborator} title="Añadir compañero" color="#45648C" />
      <Text style={styles.dividers}>Mis compañeros:</Text>
      <FlatList
        data={companions}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* <Text style={styles.cardTitle}>UserID: {item.companionID}</Text> */}
            {/* <Text style={styles.Image}> Imagen</Text> */}
            <View style={styles.loadingContainer}>
            <Image source={require('../assets/perfil.jpg')} style={styles.profileImage} />
      </View>
           <Text style={styles.cardTitle}> {item.companion?.name}</Text>
            <Text style={styles.cardText}> {item.companion?.email}</Text>
            <View style={styles.boton}>
            <Button 
              title="Eliminar"
              onPress={() => handleDeleteCompanion(item.id)}
              color="#5FB6D9"
            />
            </View>
          </View>
        )}
      />

      <Text style={styles.dividers}>Soy compañero de:</Text>
      <FlatList
        data={companionOf}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {/* <Text style={styles.cardTitle}>UserID: {item.userID}</Text> */}
            <View style={styles.loadingContainer}>
            <Image source={require('../assets/perfil.jpg')} style={styles.profileImage} />
            </View>
            <Text style={styles.cardTitle}> {item.user?.name}</Text>
            <Text style={styles.cardText}> {item.user?.email}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  
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
  },
  card: {
    backgroundColor: '#F2F2F2',
    // padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#888',
    borderStyle: 'solid',
    shadowColor: '#000',
    // marginRight: 10,
    // marginLeft: 10,
    flex: 0.5,
    // height: 240,
  
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingLeft: 16,
    paddingRight: 16,
  },
  cardText: {
    fontSize: 14,
    paddingLeft: 16,
    paddingBottom: 16,
    paddingRight: 16,
  },
  boton: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
  },
  
});

export default CollaboratorScreen;