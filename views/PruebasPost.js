import React from 'react';
import { View, Text } from 'react-native';

const PruebasPst = ({ data }) => {
  return (
    <View>
      <Text>Título: {data.titulo}</Text>
      <Text>Descripción: {data.descripcion}</Text>
      <Text>Compañeros:</Text>
      {data.companions.map((companion, index) => (
        <Text key={index}>- {companion}</Text>
      ))}
    </View>
  );
};

export default PruebasPst;
