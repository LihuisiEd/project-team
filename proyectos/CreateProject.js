import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const ProjectList = () => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [colaboradores, setColaboradores] = useState([
    { id: 1, nombre: 'Colaborador 1', seleccionado: false },
    { id: 2, nombre: 'Colaborador 2', seleccionado: false },
    { id: 3, nombre: 'Colaborador 3', seleccionado: false },
  ]);

  const handleColaboradorSelection = (id) => {
    const updatedColaboradores = colaboradores.map((colaborador) =>
      colaborador.id === id ? { ...colaborador, seleccionado: !colaborador.seleccionado } : colaborador
    );
    setColaboradores(updatedColaboradores);
  };

  const handleSubmit = () => {
    const selectedColaboradores = colaboradores.filter((colaborador) => colaborador.seleccionado);
    const newProject = {
      titulo,
      descripcion,
      colaboradores: selectedColaboradores,
    };
    console.log('Nuevo proyecto:', newProject);

    // Aquí puedes agregar lógica para enviar el formulario a algún servicio externo o guardar los datos

    // Reiniciar el estado del formulario
    setTitulo('');
    setDescripcion('');
    setColaboradores(colaboradores.map((colaborador) => ({ ...colaborador, seleccionado: false })));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título:</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Ingresa el título"
      />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput
        style={styles.input}
        value={descripcion}
        onChangeText={setDescripcion}
        placeholder="Ingresa la descripción"
      />

      <Text style={styles.label}>Colaboradores:</Text>
      {colaboradores.map((colaborador) => (
        <View style={styles.colaboradorContainer} key={colaborador.id}>
          <TouchableOpacity
            style={styles.colaboradorCheckbox}
            onPress={() => handleColaboradorSelection(colaborador.id)}
          >
            {colaborador.seleccionado ? <View style={styles.checkedIndicator} /> : null}
          </TouchableOpacity>
          <Text style={styles.colaboradorText}>{colaborador.nombre}</Text>
        </View>
      ))}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
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
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  colaboradorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colaboradorCheckbox: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkedIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'blue',
  },
  colaboradorText: {
    fontSize: 14,
  },
  button: {
    backgroundColor: 'blue',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProjectList;
