import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Formulario from './CreateProject';
import Calendario from './Calendario';
import { User, Companion, Project } from '../src/models';
import { DataStore } from '@aws-amplify/datastore';

const ProjectList = ({ user }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const currentUser = await DataStore.query(User, (u) => u.name.eq(user.username.toLowerCase()));

        const fetchedProjects = await DataStore.query(Project, (p) =>
          p.creatorID.eq(currentUser[0].id)
        );

        setProjects(fetchedProjects);
        setLoading(false);
      } catch (error) {
        console.log('Error fetching projects:', error);
      }
    };

    fetchProjects();

    const subscriptions = [
      DataStore.observe(Project).subscribe(() => {
        fetchProjects();
      }),
    ];

    return () => {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
    };
  }, [user]);

  const [showFormulario, setShowFormulario] = useState(false);

  const handleButtonPress = () => {
    setShowFormulario(true);
  };

  const handleCloseFormulario = () => {
    setShowFormulario(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.projectList}>
        {projects.map((project) => (
          <View style={styles.projectContainer} key={project.id}>
            <Text>{project.projectName}</Text>
            <Text>{project.description}</Text>
            {/* Render other project properties as needed */}
          </View>
        ))}

        <TouchableOpacity onPress={handleButtonPress} style={styles.addButton}>
          <Text style={styles.addButtonLabel}>Agregar Crear Proyecto</Text>
        </TouchableOpacity>

        <Calendario />
      </View>

      {showFormulario && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Formulario user={user} />
            <Button title="Cerrar" onPress={handleCloseFormulario} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  projectList: {
    flex: 1,
  },
  projectContainer: {
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'blue',
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 5,
    marginTop: 400, // Adjust the value according to the desired spacing between the border and the content
    marginBottom: 300,
    borderColor: 'black', // Add the desired border color
    borderWidth: 1, // Adjust the border width as needed
  },
  addButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ProjectList;
