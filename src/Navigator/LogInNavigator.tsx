import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SignUpScreen } from '../screens/SignUpScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { AuthContext } from '../context/AuthContext';
import { LoadingScreen } from '../screens/LoadingScreen';
//import { useAuth } from '../hooks/useAuth';
import auth from '@react-native-firebase/auth';
//import { Navigator } from './Navigator';
import { DrawerNavigator } from './SideDrawerNavigator';

const Stack = createStackNavigator();

export const LoginNavigator = () => {
  const {status} = useContext(AuthContext);
  //const { user } = useAuth();

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user:any) => {
    console.log(user);
    setUser(user);
    if (initializing) {setInitializing(false);}
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  },);

  if (status === 'checking') {return <LoadingScreen />;}
  else {
    console.log('Usuario que dispara function: ' + user);
    return (
      <Stack.Navigator
        screenOptions={{
            headerShown: false,
        }}
      >
        {
          //(status !== 'authenticated')
          //(user)
          (user === undefined || user === null)
            ? (
              <>
                <Stack.Screen name="LoginScreen" component={LoginScreen} />
                <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              </>
            )
            : (
              <>
                {/*<Stack.Screen name="Navigator" component={Navigator} />*/}
                <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
              </>
            )
        }
      </Stack.Navigator>
    );
  }
};
