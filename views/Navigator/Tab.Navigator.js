import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import TaskScreen from '../TaskScreen';
import ProjectList from '../ProjectList';
import CollaboratorScreen from '../CollaboratorScreen';
import { FontAwesome } from 'react-native-vector-icons';

const Tab = createMaterialBottomTabNavigator();

const TabNavigator = ({ user }) => {
  return (
    <Tab.Navigator
      barStyle={{ backgroundColor: '#212022' }}
      activeColor="#d03335"
    >
      <Tab.Screen
        name="Compañeros"
        component={() => <CollaboratorScreen user={user} />}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="users" size={20} color={'#d03335'} />
          ),
          tabBarLabelStyle: { color: '#f9ead3' },
        }}
      />
      <Tab.Screen
        name="Proyectos"
        component={() => <ProjectList user={user} />}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="folder" size={20} color={'#d03335'} />
          ),
          tabBarLabelStyle: { color: '#f9ead3' },
        }}
      />
      <Tab.Screen
        name="Tareas"
        component={() => <TaskScreen user={user} />}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="tasks" size={20} color={'#d03335'} />
          ),
          tabBarLabelStyle: { color: '#f9ead3' },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
