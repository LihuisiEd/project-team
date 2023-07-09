import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import TabNavigator from './Navigator/Tab.Navigator';
import Header from './Navigator/Header';

const HomeView = ({ user, signOut }) => {
  const navigation = useNavigation();

  return (
    <>
      <Header signOut={signOut} />
      <TabNavigator user={user} />
    </>

  );

};

export default HomeView;