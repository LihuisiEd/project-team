import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { User, Companion, Project, Task } from '../src/models';
import { Button, Card, List } from 'react-native-paper';
import Formulario from './CreateTask';

const TaskScreen = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [taskSeleccionada, setTaskSeleccionada] = useState(null);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef(null);

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

  return (
    <ScrollView style={styles.container} ref={scrollViewRef}>
      <View style={styles.taskList}>
        <Text style={styles.title}>Tareas</Text>

        {tasks.map((task) => (
          <Card key={task.id} style={styles.card}>
            <Card.Title title={task.name} />
            <Card.Content>
              <Text style={styles.subtitle}>Proyecto: {getProjectName(task.projectID)}</Text>
              <Text style={styles.subtitle}>{task.description}</Text>
              <Text style={styles.subtitle}>Estado: {task.status}</Text>
              <Text style={styles.subtitle}>Fecha de inicio: {task.startDate}</Text>
              <Text style={styles.subtitle}>Fecha de fin: {task.endDate}</Text>
            </Card.Content>
            <Card.Actions>
              <Button
                onPress={() => setTaskSeleccionada(taskSeleccionada === task.id ? null : task.id)}
              >
                {taskSeleccionada === task.id ? 'Ocultar Descripción' : 'Mostrar Descripción'}
              </Button>
            </Card.Actions>
            {taskSeleccionada === task.id && (
              <Card.Content>
                <Text style={{ marginTop: 10 }}>{task.description}</Text>
              </Card.Content>
            )}
          </Card>
        ))}

        <TouchableOpacity onPress={handleButtonPress} style={styles.addButton}>
          <Text style={styles.addButtonLabel}>Agregar Tarea</Text>
        </TouchableOpacity>
      </View>

      {showFormulario && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Formulario user={user} onCreateTask={handleCreateTask} />
            <Button title="Cerrar" onPress={handleCloseFormulario} />
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  taskList: {
    flex: 1,
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
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 1,
  },
  card: {
    marginBottom: 20,
    padding: 10,
    elevation: 4,
  },
});

export default TaskScreen;