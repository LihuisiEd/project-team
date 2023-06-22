import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { DataStore } from '@aws-amplify/datastore';
import { Post, PostStatus } from './src/models';

const CreatePostForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const createPost = async () => {
    const post = new Post({
      title: title,
      content: content,
      status: PostStatus.ACTIVE,
    });
  
    await DataStore.save(post);
  
    setTitle('');
    setContent('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Número o Correo"
        value={content}
        onChangeText={setContent}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={createPost}
      >
        <Text style={styles.buttonText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#A60321',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#F29C6B',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CreatePostForm;



