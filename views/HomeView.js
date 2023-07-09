import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ProjectScreen from './ProjectScreen';
import TaskScreen from './TaskScreen';
import CollaboratorScreen from './CollaboratorScreen';
import Proyectos from './Proyectos';
import Calendario from './Calendario';
import PerfilScreen from './PerfilScreen';

const HomeView = ({ user, signOut }) => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: '1', title: 'Compañeros' },
    { key: '2', title: 'Proyectos' },
    { key: '3', title: 'Tareas' },
    // { key: '4', title: 'Perfil' },
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
    // '4': () => (
    //   <View style={styles.sceneContainer} onPress={handlePerfil}>
    //     {routes[3].title === 'Perfil' && (
    //       <View>
    //       <PerfilScreen />
    //     </View>
    //     )}
    //   </View>
    // ),
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
    backgroundColor: '#4564',
  },
  containertitulo: {
    paddingTop: 4,
    backgroundColor: '#45648C',
    alignItems: 'center',
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    // backgroundColor: '#45648C',
    color: '#5FB6D9',
  },
  signoff: {
    fontSize: 19,
    color: '#5FB6D9',
    marginLeft: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    backgroundColor: '#45648C',
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
    backgroundColor: '#45648C',
  },
  tabItemText: {
    fontWeight: 'bold',
    color: '#5FB6D9',
  },
  sceneContainer: {
    flex: 1,
  },
});

export default HomeView;