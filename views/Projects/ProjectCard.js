import React from 'react';
import { Button, Card, List } from 'react-native-paper';

const ProjectCard = ({ proyecto, proyectoSeleccionado, setProyectoSeleccionado }) => {
  const handleButtonPress = () => {
    setProyectoSeleccionado(proyectoSeleccionado === proyecto.id ? null : proyecto.id);
  };

  return (
    <Card style={{ marginBottom: 10 }}>
      <Card.Title
        title={proyecto.projectName}
        left={(props) => <List.Icon {...props} icon="folder" />}
      />
      <Card.Content>
        {proyectoSeleccionado === proyecto.id && (
          <List.Subheader>{proyecto.description}</List.Subheader>
        )}
      </Card.Content>
      <Card.Actions>
        <Button
          mode="contained"
          onPress={handleButtonPress}
        >
          {proyectoSeleccionado === proyecto.id ? 'Ocultar Descripción' : 'Mostrar Descripción'}
        </Button>
      </Card.Actions>
    </Card>
  );
};

export default ProjectCard;
