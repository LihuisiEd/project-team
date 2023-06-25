import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Card } from 'react-native-elements';

const Proyectos = () => {
  const proyectos = [
    {
      id: 1,
      nombre: 'Proyecto 1',
      descripcion: 'Descripción del proyecto 1',
    },
    {
      id: 2,
      nombre: 'Proyecto 2',
      descripcion: 'Descripción del proyecto 2',
    },
    {
      id: 3,
      nombre: 'Proyecto 3',
      descripcion: 'Descripción del proyecto 3',
    },
  ];

  const [proyectoSeleccionado, setProyectoSeleccionado] = useState(null);

  const handleProyectoClick = (id) => {
    if (proyectoSeleccionado === id) {
      setProyectoSeleccionado(null);
    } else {
      setProyectoSeleccionado(id);
    }
  };

  return (
    <View>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginVertical: 10, textAlign: 'center'}}>Proyectos</Text>
      {proyectos.map((proyecto) => (
        <Card key={proyecto.id} containerStyle={{ marginBottom: 10 }}>
          <Card.Title style={{ fontSize: 16, fontWeight: 'bold' }}>{proyecto.nombre}</Card.Title>
          <Button
            title={proyectoSeleccionado === proyecto.id ? 'Ocultar Descripción' : 'Mostrar Descripción'}
            onPress={() => handleProyectoClick(proyecto.id)}
            buttonStyle={{ backgroundColor: '#8E8E8E' }}
          />
          {proyectoSeleccionado === proyecto.id && (
            <Text style={{ marginTop: 10 }}>{proyecto.descripcion}</Text>
          )}
        </Card>
      ))}
    </View>
  );
};

export default Proyectos;