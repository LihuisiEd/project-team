import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native';
import Formulario from './CreateProject';
import Calendario from './Calendario';
const ProjectList = () => {
  const projects = [

    {
        title: 'Proyecto 1',
        description: 'Descripción del proyecto 1',
        participants: ['Participante 1', 'Participante 2'],
      },
      {
        title: 'Proyecto 1',
        description: 'Descripción del proyecto 1',
        participants: ['Participante 1', 'Participante 2'],
      },
      {
        title: 'Proyecto 1',
        description: 'Descripción del proyecto 1',
        participants: ['Participante 1', 'Participante 2'],
      },
      {
        title: 'Proyecto 1',
        description: 'Descripción del proyecto 1',
        participants: ['Participante 1', 'Participante 2'],
      },
      

    
  
  ];

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
        {projects.map((project, index) => (
          <View style={styles.projectContainer} key={index}>
            <Text>Titulo: {project.title}</Text>
            <Text>Descripción: {project.description}</Text>
            <Text>Participantes: {project.participants.join(', ')}</Text>
          </View>
        ))}

        <TouchableOpacity onPress={handleButtonPress} style={styles.addButton}>
          <Text style={styles.addButtonLabel}>Agregar Crear Proyecto</Text>
        </TouchableOpacity>

        <Calendario/>
      </View>

      {showFormulario && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Formulario />
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
    marginTop: 400, // Ajusta el valor según el espacio deseado entre el borde y el contenido
    marginBottom:300,
    borderColor: 'black', // Agrega el color del borde deseado
    borderWidth: 1, // Ajusta el ancho del borde según tus necesidades
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
  //
});

export default ProjectList;