import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { User, Companion, Project, Task } from '../src/models';
import { Button, Card, List, Drawer, IconButton, Dialog, Portal, Text } from 'react-native-paper';
import Formulario from './CreateTask';
import Icon from 'react-native-vector-icons/MaterialIcons';

const TaskScreen = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [taskSeleccionada, setTaskSeleccionada] = useState(null);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
    const subscription = DataStore.observe(Task).subscribe(() => {
      fetchTasks();
    });
    return () => subscription.unsubscribe();
  }, []);

  const fetchTasks = async () => {
    try {
      const currentUser = await DataStore.query(User, (u) => u.name.eq(user.username.toLowerCase()));
      const currentUserProjects = await DataStore.query(Project, (p) => p.creatorID.eq(currentUser[0].id));
      const currentUserProjectIDs = currentUserProjects.map((project) => project.id);

      const allTasks = await DataStore.query(Task);
      const filteredTasks = allTasks.filter((task) =>
        currentUserProjectIDs.includes(task.projectID)
      );

      setTasks(filteredTasks);
    } catch (error) {
      console.log('Error fetching tasks:', error);
    }
  };

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const fetchedProjects = await DataStore.query(Project);
      setProjects(fetchedProjects);
    } catch (error) {
      console.log('Error fetching projects:', error);
    }
  };

  const getProjectName = (projectID) => {
    const project = projects.find((p) => p.id === projectID);
    return project ? project.projectName : '';
  };

  const [showFormulario, setShowFormulario] = useState(false);

  const handleButtonPress = () => {
    setShowFormulario(true);
    scrollViewRef.current.scrollToEnd({ animated: true });
  };

  const handleCloseFormulario = () => {
    setShowFormulario(false);
  };

  const handleCreateTask = async (taskData) => {
    try {
      await DataStore.save(new Task(taskData));
      // No es necesario llamar a fetchTasks aquí, ya que se actualizará automáticamente mediante la suscripción
    } catch (error) {
      console.log('Error creating task:', error);
    }
  };

  const handleDeleteConfirmation = (taskId) => {
    setTaskToDelete(taskId);
    setShowDeleteConfirmation(true);
  };

  const handleDeleteTask = async () => {
    try {
      await DataStore.delete(Task, taskToDelete);
      setShowDeleteConfirmation(false);
    } catch (error) {
      console.log('Error deleting task:', error);
    }
  };

  return (
    <ScrollView style={styles.container} ref={scrollViewRef}>
      <View style={styles.taskList}>
        {tasks.map((task) => (
          <Card key={task.id} style={styles.card}>
            <Card.Title
              title={task.name}
              left={() => <List.Icon icon="assignment" name="tasks" />}
              right={() => (
                <IconButton
                  icon="close"
                  color="#d03335"
                  onPress={() => handleDeleteConfirmation(task.id)}
                />
              )}
            />
            {taskSeleccionada === task.id && (
              <Card.Content>
                <Text style={styles.subtitle}>Proyecto: {getProjectName(task.projectID)}</Text>
                <Text style={styles.subtitle}>Estado: {task.status}</Text>
                <Text style={styles.subtitle}>Fecha de inicio: {task.startDate}</Text>
                <Text style={styles.subtitle}>Fecha de fin: {task.endDate}</Text>
                <Text style={styles.subtitle}>Descripción: {task.description}</Text>
              </Card.Content>
            )}
            <Card.Actions>
              <Button
                mode="contained"
                onPress={() => setTaskSeleccionada(taskSeleccionada === task.id ? null : task.id)}
                style={{ backgroundColor: '#d03335', borderColor: '#d03335'}}
          labelStyle={{color: 'white'}}// Cambia el color del texto del botón
              >
                {taskSeleccionada === task.id ? 'Ocultar Descripción' : 'Mostrar Descripción'}
              </Button>
            </Card.Actions>
          </Card>
        ))}

        <TouchableOpacity onPress={handleButtonPress} style={styles.addButton}>
          <Icon name="add" size={20} color="#212022" />
          <Text style={styles.addButtonLabel}>Agregar Tarea</Text>
        </TouchableOpacity>
      </View>

      {showFormulario && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Formulario user={user} onCreateTask={handleCreateTask} />
            <Button labelStyle={{ color: 'white' }} onPress={handleCloseFormulario} >Cerrar</Button>
          </View>
        </View>
      )}
      <Portal>
        <Dialog visible={showDeleteConfirmation} onDismiss={() => setShowDeleteConfirmation(false)}>
          <Dialog.Title>Confirmar Eliminación</Dialog.Title>
          <Dialog.Content>
            <Text>¿Estás seguro de que deseas eliminar esta tarea?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleDeleteTask}>Eliminar</Button>
            <Button onPress={() => setShowDeleteConfirmation(false)}>Cancelar</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white'
  },
  taskList: {
    flex: 1,
  },
  addButton: {
    backgroundColor: '#f9ead3',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  addButtonLabel: {
    color: '#212022',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#25232A',
    borderColor: 'black',
    borderWidth: 1,
    position: 'relative',
  },
  card: {
    marginBottom: 20,
    padding: 10,
    elevation: 4,
  },
  drawerSection: {
    backgroundColor: '#212022',
  },
  drawerItemLabel: {
    color: '#f9ead3',
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  
});

export default TaskScreen;