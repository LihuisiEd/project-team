import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Alert } from 'react-native';
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

    Alert.alert('Mensaje', '¡Hola mundo!');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Content"
        value={content}
        onChangeText={setContent}
      />
      <Button title="Create Post" onPress={createPost} />
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
});

export default CreatePostForm;
