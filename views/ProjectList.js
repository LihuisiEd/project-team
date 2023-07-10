import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Dialog, Portal, Drawer, IconButton, Text } from 'react-native-paper';
import { DataStore } from '@aws-amplify/datastore';
import { User, Project } from '../src/models';
import ProjectCard from './Projects/ProjectCard';
import Calendario from './Projects/Calendario';
import Formulario from './CreateProject';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProjectList = ({ user }) => {
  const [projects, setProjects] = useState([]);
  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);
  const [showFormulario, setShowFormulario] = useState(false);
  const [showCalendario, setShowCalendario] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const currentUser = await DataStore.query(User, (u) => u.name.eq(user.username.toLowerCase()));

        const fetchedProjects = await DataStore.query(Project, (p) =>
          p.creatorID.eq(currentUser[0].id)
        );

        setProjects(fetchedProjects);
      } catch (error) {
        console.log('Error fetching projects:', error);
      }
    };

    fetchProjects();

    const subscription = DataStore.observe(Project).subscribe(() => {
      fetchProjects();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const handleButtonPress = () => {
    setShowFormulario(true);
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const handleCloseFormulario = () => {
    setShowFormulario(false);
  };

  const handleToggleCalendario = () => {
    setShowCalendario(!showCalendario);
  };

  const handleToggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleDeleteConfirmation = (projectId) => {
    setProjectToDelete(projectId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteProject = async () => {
    try {
      await DataStore.delete(Project, projectToDelete);
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.log('Error deleting project:', error);
    }
  };
  
  

  return (
    <ScrollView style={styles.container} ref={scrollViewRef}>
      <View style={styles.projectList}>
        {projects.map((proyecto) => (
          <ProjectCard
            key={proyecto.id}
            proyecto={proyecto}
            proyectoSeleccionado={proyectoSeleccionado}
            setProyectoSeleccionado={setProyectoSeleccionado}
            onDelete={handleDeleteConfirmation}
          />
        ))}
        <Drawer.Section
          theme={{
            colors: {
              primary: '#d03335',
              text: '#d03335',
            },
          }}
          style={styles.drawerSection}
          open={drawerOpen}
          onOpen={handleToggleDrawer}
          onClose={handleToggleDrawer}
          title="Opciones"
          bottomDivider
        >
          <Drawer.Item
            icon={({ color, size }) => (
              <Icon name="plus" size={size} color="#212022" />
            )}
            label="Agregar Proyecto"
            onPress={handleButtonPress}
            labelStyle={styles.drawerItemLabel}
          />
          <Drawer.Item
            icon={({ color, size }) => (
              <Icon name="calendar" size={size} color="#212022" />
            )}
            label="Mostrar Calendario"
            onPress={handleToggleCalendario}
            labelStyle={styles.drawerItemLabel}
          />
        </Drawer.Section>
        <Portal>
          <Dialog visible={showCalendario} onDismiss={handleToggleCalendario}>
            <Dialog.Title>Calendario</Dialog.Title>
            <Dialog.Content>
              <View style={styles.calendarioContainer}>
                <Calendario />
              </View>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleToggleCalendario}>Cerrar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog visible={showDeleteConfirmation} onDismiss={() => setShowDeleteConfirmation(false)}>
            <Dialog.Title>Confirmar Eliminación</Dialog.Title>
            <Dialog.Content>
              <Text>¿Estás seguro de que deseas eliminar este proyecto?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleDeleteProject}>Eliminar</Button>
              <Button onPress={() => setShowDeleteConfirmation(false)}>Cancelar</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>

      {showFormulario && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Formulario user={user} />
            <Button
              onPress={handleCloseFormulario}
              labelStyle={[styles.buttonText, { color: '#d03335' }]}
            >
              Cerrar
            </Button>
          </View>
        </View>
      )}
    </ScrollView>
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
  modalContainer: {
    paddingBottom: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  addButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    flexDirection: 'row',
  },
  addButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  calendarioButton: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  calendarioButtonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  calendarioContainer: {
    maxHeight: 400,
  },
  drawerSection: {
    marginTop: 10,
    backgroundColor: '#f9ead3',
  },
  menuButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  drawerItemLabel: {
    color: '#d03335',
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

export default ProjectList;