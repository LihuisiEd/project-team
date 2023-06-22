import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { DataStore, Predicates } from '@aws-amplify/datastore';
import { Post } from './src/models';
import { FontAwesome } from '@expo/vector-icons';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = await DataStore.query(Post);
      setPosts(fetchedPosts);
    };

    fetchPosts();

    const subscription = DataStore.observe(Post).subscribe(() => {
      fetchPosts();
    });

    return () => subscription.unsubscribe();
  }, []);

  const deletePost = async (postId) => {
    await DataStore.delete(Post, postId);
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Compañeros</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postItem}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text>{item.content}</Text>
            <TouchableOpacity onPress={() => deletePost(item.id)} style={styles.deleteButton}>
              <FontAwesome name="trash" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postItem: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  postTitle: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  deleteButton: {
    marginLeft: 'auto',
  },
});

export default PostList;
