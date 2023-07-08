import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { User, Companion, Project, Task } from '../src/models';
import { Button, Card } from 'react-native-elements';
import Formulario from './CreateTask';

const TaskScreen = ({ user }) => {
  const [tasks, setTasks] = useState([]);
  const [taskSeleccionada, setTaskSeleccionada] = useState(null);
  const [loading, setLoading] = useState(false);

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
    <View style={styles.container}>
      <View style={styles.taskList}>
        <Text style={styles.title}>Tareas</Text>

        {tasks.map((task) => (
          <Card key={task.id} containerStyle={{ marginBottom: 10 }}>
            <Card.Title style={{ fontSize: 16, fontWeight: 'bold' }}>{task.name}</Card.Title>
            <Text style={styles.subtitle}>Proyecto: {getProjectName(task.projectID)}</Text>
            <Text style={styles.subtitle}>{task.description}</Text>
            <Text style={styles.subtitle}>Estado: {task.status}</Text>
            <Text style={styles.subtitle}>Fecha de inicio: {task.startDate}</Text>
            <Text style={styles.subtitle}>Fecha de fin: {task.endDate}</Text>
            
            <Button
              title={taskSeleccionada === task.id ? 'Ocultar Descripción' : 'Mostrar Descripción'}
              onPress={() => setTaskSeleccionada(task.id)}
              buttonStyle={{ backgroundColor: '#8E8E8E' }}
            />
            {taskSeleccionada === task.id && (
              <Text style={{ marginTop: 10 }}>{task.description}</Text>
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
    marginTop: 10,
  },
  addButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default TaskScreen;
