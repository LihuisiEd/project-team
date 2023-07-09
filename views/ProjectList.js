import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Button, Dialog, Portal, Drawer, IconButton } from 'react-native-paper';
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.projectList}>
        {projects.map((proyecto) => (
          <ProjectCard
            key={proyecto.id}
            proyecto={proyecto}
            proyectoSeleccionado={proyectoSeleccionado}
            setProyectoSeleccionado={setProyectoSeleccionado}
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
      </View>

      {showFormulario && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Formulario user={user} />
            <Button onPress={handleCloseFormulario}>Cerrar</Button>
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
    marginTop: 400,
    marginBottom: 300,
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
});

export default ProjectList;