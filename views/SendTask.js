import React from 'react';
import { View, Text } from 'react-native';

const SendTask = ({ route }) => {
  const { data } = route.params;

  return (
    <View>
      <Text>Título: {data.titulo}</Text>
      <Text>Descripción: {data.descripcion}</Text>
      <Text>Proyecto: {data.project}</Text>
      <Text>Fecha de inicio: {data.fechaInicio}</Text>
      <Text>Fecha de fin: {data.fechaFin}</Text>
      <Text>Estado: {data.estado}</Text>
    </View>
  );
};

export default SendTask;
