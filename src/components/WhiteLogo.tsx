/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Image } from 'react-native';

export const WhiteLogo = () => {
  return (
    <View style={{alignItems:'center'}}>
        {<Image
            style = {{ tintColor: 'white', width: 200, height: 100,}}
            source = {require('../Assets/car.png')}
        />}
    </View>
  );
};
