import React from 'react';
//import Icon from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';
import { Map } from '../components/Map';
import { styles } from '../styles/styles';
import { useNavigation, useRoute } from '@react-navigation/core';

export const MapScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  return (
    <View style={styles.container2}>
      {/*<Icon name="star-outline" size={30} color={'blue'}/>*/}
      <Map navigation={navigation} route={route}/>
    </View>
  );
};
