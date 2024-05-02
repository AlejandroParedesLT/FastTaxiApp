/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import { Button,  Text, View } from 'react-native';
//import {  request, PERMISSIONS, PermissionStatus } from 'react-native-permissions';
//import { PERMISSIONS } from 'react-native-permissions/dist/typescript/permissions';
//import { PermissionStatus } from 'react-native-permissions/dist/typescript/types';
import { styles } from '../styles/styles';
import { PermissionsContext } from '../context/PermissionsContext';

export const PermissionsScreen = () => {
  const {permissions, askLocationPermission} = useContext(PermissionsContext);
  return (
    <View style={styles.container}>
      <Text>Permissions Screen</Text>
      <Button title="Permiso" onPress={askLocationPermission}/>
      <Text>{JSON.stringify(permissions, null, 5)}</Text>
    </View>
  );
};

