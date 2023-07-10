import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, List, IconButton } from 'react-native-paper';

const ProjectCard = ({ proyecto, proyectoSeleccionado, setProyectoSeleccionado,onDelete  }) => {
  const handleButtonPress = () => {
    setProyectoSeleccionado(proyectoSeleccionado === proyecto.id ? null : proyecto.id);
  };

  const handleDelete = () => {
    onDelete(proyecto.id);
  };

  return (
    <Card style={{ marginBottom: 10, backgroundColor: '#25232A' }}>
  <Card.Title
    title={proyecto.projectName}
    titleStyle={{ color: 'white' }}
    left={(props) => <List.Icon {...props} icon="folder" color="white" />}
  />
  <IconButton icon="close" onPress={handleDelete} style={styles.deleteButton} />
      <Card.Content>
        {proyectoSeleccionado === proyecto.id && (
          <List.Subheader style={{ color: 'white' }}>{proyecto.description}</List.Subheader>
        )}
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={handleButtonPress}
          style={{ backgroundColor: '#d03335' }}
          labelStyle={{color: 'white'}}
        >
          {proyectoSeleccionado === proyecto.id ? 'Ocultar Descripción' : 'Mostrar Descripción'}
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default ProjectCard;

const styles = StyleSheet.create({
  // Resto de los estilos...

  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
});

