import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Button, Image } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ProjectScreen from './ProjectScreen';
import TaskScreen from './TaskScreen';
import CollaboratorScreen from './CollaboratorScreen';
import ProjectList from './ProjectList';
import Calendario from './Calendario';
import { ScrollView } from 'react-native';

const HomeView = ({ user, signOut }) => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: '1', title: 'Compañeros' },
    { key: '2', title: 'Proyectos' },
    { key: '3', title: 'Tareas' },
  ]);

  const renderScene = SceneMap({
    '1': () => (
      <View style={styles.sceneContainer}>
        {routes[0].title === 'Compañeros' && (
          <View>
            <CollaboratorScreen user={user} />
          </View>
        )}
      </View>
    ),
    '2': () => (
      <View style={styles.sceneContainer}>
        {routes[1].title === 'Proyectos' && (
              <View >
                <ProjectList/>
               
              </View>
        )}
      </View>
    ),
    
    
    '3': () => (
      <View style={styles.sceneContainer}>
        {routes[2].title === 'Tareas' && (
          <View>
            <TaskScreen />
          </View>
        )}
      </View>
    ),
  });

  const renderTabBar = (props) => (
    <View style={styles.tabBar}>
      {props.navigationState.routes.map((route, i) => (
        <TouchableOpacity
          key={route.key}
          style={[styles.tabItem, index === i && styles.tabItemActive]}
          onPress={() => setIndex(i)}
        >
          <Text style={styles.tabItemText}>{route.title}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const handlePerfil = () => {
    navigation.navigate('Perfil');
  };

  return (
    <View style={styles.container}>

      <View style={styles.containertitulo}>
        <Text style={styles.title}>¡Bienvenid@ {user.username}, a TaskVerse!</Text>
        <TouchableOpacity onPress={signOut}>
          <Text style={styles.signoff}>Cerrar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePerfil}>
          <Text style={styles.signoff}>Perfil</Text>
        </TouchableOpacity>
      </View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: 300 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'Poppins-Bold.ttf',
    flex: 1,
  },
  containertitulo: {
    paddingTop: 20,
    backgroundColor: '#A60321',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    backgroundColor: '#A60321',
    color: '#F29C6B',
  },
  signoff: {
    fontSize: 19,
    color: '#F29C6B',
  },
  tabBar: {
    flexDirection: 'row',
    margin: 15
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10
  },
  tabItemActive: {
    backgroundColor: '#F29C6B',
  },
  tabItemText: {
    fontWeight: 'bold',
    color: '#A60321',
  },
  sceneContainer: {
    flex: 1,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 30,
    marginTop: 20
  },
  userImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginRight: 10,
  },
  userImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontWeight: 'bold',
  },
  userActions: {
    flexDirection: 'row',
  },
  userButton: {
    borderRadius: 50,
    paddingHorizontal: 8,
    paddingVertical: 5,
    backgroundColor: '#E33636',
    marginLeft: 10,
  },
  userButtonText: {
    color: 'white',
  },

});

export default HomeView;
