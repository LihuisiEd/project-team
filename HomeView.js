import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, Button, Image } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import PostList from './PostList';
import CreatePostForm from './CreatePost';


/*  Importaciones de pestaña Proyectos */
import ProjectList from './proyectos/ProjectList';
/* Fin Importaciones de pestaña Proyectos */


const HomeView = ({ user, signOut }) => {
  const [index, setIndex] = useState(0);
  const [posts, setPosts] = useState([]);
  const [routes] = useState([
    { key: '1', title: 'Compañeros' },
    { key: '2', title: 'Proyectos' },
    { key: '3', title: 'Grupos' },
    { key: '4', title: 'Tareas' },
  ]);

  const renderScene = SceneMap({
    '1': () => (
        <View style={styles.sceneContainer}>
          {routes[0].title === 'Compañeros' && (
            <View>
                <CreatePostForm />
                <PostList />
            </View>
          )}
        </View>
      ),
    
    '2': () => (
        <View style={styles.sceneContainer}>
          {routes[1].title === 'Proyectos' && (
            <View>
                <ProjectList /> 
  
            </View>
          )}
        </View>
      ),
    
    '3': () => <Text>{routes[2].title}</Text>,
    '4': () => <Text>{routes[3].title}</Text>,
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

    return (
        <View style={styles.container}>
            <View style={styles.containertitulo}>
                <Text style={styles.title}>¡Bienvenid@ {user.username}, a TaskVerse!</Text>
                <TouchableOpacity onPress={signOut}>
                    <Text>Cerrar sesión</Text>
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
    backgroundColor: 'lightgray'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical:20,
    textAlign: 'center',
    backgroundColor: 'lightgray'
  },
  tabBar: {
    flexDirection: 'row',
    margin:15
  },
  tabItem: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10
  },
  tabItemActive: {
    backgroundColor: '#FFC7C7',
  },
  tabItemText: {
    fontWeight: 'bold',
    color: '#E33636'
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