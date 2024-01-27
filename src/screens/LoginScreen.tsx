import React, { useContext, useEffect, useState } from 'react';
import { Background } from '../components/Background';
import { WhiteLogo } from '../components/WhiteLogo';
import { styles } from '../styles/styles';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View, Keyboard, Alert } from 'react-native';
//import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
//import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
//import { FIREBASE_AUTH } from '../../FirebaseConfig';
import auth from '@react-native-firebase/auth';
import { LoadingScreen } from './LoadingScreen';
//import { AuthContext } from '../context/AuthContext';
//const auth = getAuth();

interface Props extends StackScreenProps<any, any> {}

export const LoginScreen = ({navigation}:Props) => {
  //const {signInFirebase, errorMessage, removeError} = useContext(AuthContext); //signIn,
  const [loading, setLoading] = useState(false);
  //const auth = FIREBASE_AUTH;

  /*const {email, password, onChange} = useForm({
    email: '',
    password:'',
  });*/
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Email and password are mandatory');
      return;
    }

    setLoading(true);

    console.log('Esperando Login: ' + loading);

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User signed in!');
        setLoading(false);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          setLoading(false);
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setLoading(false);
        }

        console.error(error);
        setLoading(false);
      });
  };

  const signUp = async () => {
    if (email === '' || password === '') {
      Alert.alert('Email and password are mandatory.');
      return;
    }
    setLoading(true);
    console.log('Esperando SignUp: ' + loading);
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Esperando SignUp: ' + loading);
        console.log('User account created & signed in!');
        setLoading(false);
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          setLoading(false);
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setLoading(false);
        }

        console.error(error);
        setLoading(false);
      });
    /*try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
      //navigation.navigate('Sign In');
    } catch (error) {
      console.log(error);
    }*/
  };

  /*
  useEffect(() => {
    if (errorMessage.length === 0) {return;}
    else {
      Alert.alert(
        'LogIn Incorrecto',
        errorMessage,
        [
          {
            text:'Ok',
            onPress: removeError,
          },
        ]

      );
    }
  }, [errorMessage, removeError]);
  */

  /*const onLogin = () => {
    //console.log({email, password});
    signIn({correo:email, password});
    Keyboard.dismiss();
  };*/

  /*
  const onLogin = () => {
    console.log("Pressed")
    signIn();
    Keyboard.dismiss();
  };
  */

  /*
  const onSignUp = () => {
    console.log("Pressed")
    signUp();
    Keyboard.dismiss();
  };*/
  if (loading) {
    return <LoadingScreen />;
  }
  else {
  return (
    <>
      <Background />
      <KeyboardAvoidingView
        style={styles.centeredView}
        behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
      >
        <WhiteLogo />
        <Text style={styles.title}> LogIn </Text>
        {/*<Text style={styles.title}> Email </Text>*/}
        <View style={{alignItems:'center'}}>
          <TextInput
            style={{...styles.label_input_box, marginTop:30}}
            placeholder="Email"
            keyboardType='email-address'
            placeholderTextColor={'white'}
            onChangeText={(value) => setEmail(value)}
            value={email}
            onSubmitEditing={onLogin}
          />
          <TextInput
            style={styles.label_input_box}
            placeholder="password"
            placeholderTextColor={'white'}
            onChangeText={(value) => setPassword(value)}
            value={password}
            onSubmitEditing={onLogin}
            secureTextEntry
          />
          <TouchableOpacity
            style={{...styles.buttonTouch, marginTop:30}}
            onPress={onLogin}
          >
            <Text style={styles.textButton}>Sign In</Text>
          </TouchableOpacity>

          <Text style={{marginTop:10, color:'white'}}> Or </Text>

          <TouchableOpacity
            style={{...styles.buttonTouch, marginTop:10}}
            //onPress={() => navigation.replace('SignUpScreen')}
            onPress={signUp}
          >
            <Text style={styles.textButton}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
    );
  }
};
