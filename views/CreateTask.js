import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Picker } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataStore } from '@aws-amplify/datastore';
import { User, Companion, Project, Task } from '../src/models';
import PruebasPost from './PruebasPost';

const TaskScreen = ({ user }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [datosEnviados, setDatosEnviados] = useState(null);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(null);
  const navigation = useNavigation();

  const fetchProjects = async () => {
    try {
      const currentUser = await DataStore.query(User, (u) => u.name.eq(user.username.toLowerCase()));
      const fetchedProjects = await DataStore.query(Project, (p) => p.creatorID.eq(currentUser[0].id));
      setProjects(fetchedProjects);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();

    const subscription = DataStore.observe(Project).subscribe(() => {
      fetchProjects();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [user]);

  const handleAddTask = async () => {
    try {
      const currentUser = await DataStore.query(User, (u) => u.name.eq(user.username.toLowerCase()));
      const userId = currentUser[0].id;

      const newTask = await DataStore.save(
        new Task({
            name: titulo,
            description: descripcion,
            status: selectedStatus, // Agrega el estado seleccionado
            projectID: selectedProject, // Asegúrate de tener la variable `selectedProject` para almacenar el proyecto seleccionado
            startDate: new Date(fechaInicio).toISOString(),
            endDate: new Date(fechaFin).toISOString(),
        })
      );

      console.log('Tarea agregada:', newTask);
    } catch (error) {
      console.log('Error al agregar la tarea:', error);
    }

    console.log('Fecha de inicio:', fechaInicio);
    console.log('Fecha de fin:', fechaFin);
  };

  const handleEnviarClick = () => {
    setDatosEnviados({
      titulo,
      descripcion,
      project: selectedProject?.projectName,
      status: selectedStatus,
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    });
  };

  const handleFechaInicioChange = (text) => {
    setFechaInicio(text);
  };

  const handleFechaFinChange = (text) => {
    setFechaFin(text);
  };

  const handleStatusChange = (value) => {
    setSelectedStatus(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Escribe aquí el Nombre"
      />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.textarea}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Escribe aquí la descripción"
        multiline={true}
      />

    <Text style={styles.label}>Estado:</Text>
    <Picker
    style={styles.picker}
    selectedValue={selectedStatus}
    onValueChange={handleStatusChange}
    >
    <Picker.Item label="Selecciona un estado" value={null} />
    <Picker.Item label="Completado" value="completado" />
    <Picker.Item label="No completado" value="no_completado" />
    </Picker>

      <Text style={styles.label}>Proyectos:</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedProject}
        onValueChange={(value) => setSelectedProject(value)}
        >
    <Picker.Item label="Selecciona un proyecto" value={null} />
    {projects.map((project) => (
        <Picker.Item key={project.id} label={project.projectName} value={project.id} /> // Cambia el value a project.id
    ))}
    </Picker>

      <Text style={styles.label}>Fecha de inicio:</Text>
      <TextInput
        style={styles.input}
        value={fechaInicio}
        onChangeText={handleFechaInicioChange}
        placeholder="YYYY-MM-DD"
      />

      <Text style={styles.label}>Fecha de fin:</Text>
      <TextInput
        style={styles.input}
        value={fechaFin}
        onChangeText={handleFechaFinChange}
        placeholder="YYYY-MM-DD"
      />

      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.buttonText}>Agregar Tarea</Text>
      </TouchableOpacity>

       {datosEnviados && <PruebasPost data={datosEnviados} />}
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
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: 'white'
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    backgroundColor: 'white'
  },
  textarea: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    textAlignVertical: 'top',
    backgroundColor: 'white'
  },
  picker: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#d03335',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TaskScreen;
