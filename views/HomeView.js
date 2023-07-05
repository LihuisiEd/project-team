import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
          <View>
              <Proyectos />
              <Calendario />
          </View>
        )}
      </View>),
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
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={[styles.buttonContainer, styles.leftButton]} onPress={handlePerfil}>
          <Text style={styles.signoff}>Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonContainer, styles.rightButton]} onPress={signOut}>
          <Text style={styles.signoff}>Cerrar sesión</Text>
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
    flex: 1,
  },
  containertitulo: {
    paddingTop: 4,
    backgroundColor: '#A60321',
    alignItems: 'center',
    marginBottom: 5,
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
    marginLeft: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: '#A60321',
    marginLeft: 30,
    marginRight: 30,
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonContainer: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  leftButton: {
    marginRight: 5,
  },
  rightButton: {
    marginLeft: 5,
  },
  tabBar: {
    flexDirection: 'row',
    margin: 15,
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
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
});

export default HomeView;