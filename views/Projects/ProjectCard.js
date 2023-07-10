import React from 'react';
import { Button, Card, List } from 'react-native-paper';

const ProjectCard = ({ proyecto, proyectoSeleccionado, setProyectoSeleccionado }) => {
  const handleButtonPress = () => {
    setProyectoSeleccionado(proyectoSeleccionado === proyecto.id ? null : proyecto.id);
  };

  return (
    <Card style={{ marginBottom: 10, backgroundColor: '#25232A' }}>
  <Card.Title
    title={proyecto.projectName}
    titleStyle={{ color: 'white' }}
    left={(props) => <List.Icon {...props} icon="folder" color="white" />}
  />
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
