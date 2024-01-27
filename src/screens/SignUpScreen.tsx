import React, {useContext, useEffect} from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Keyboard, Alert } from 'react-native';
import { WhiteLogo } from '../components/WhiteLogo';
import { styles } from '../styles/styles';
import { StackScreenProps } from '@react-navigation/stack';
import { useForm } from '../hooks/useForm';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> {}

export const SignUpScreen = ({navigation}:Props) => {
  const {signUpFirebase, errorMessage, removeError} = useContext(AuthContext); //signUp,

  const {email, password, name, onChange} = useForm({
    name : '',
    email: '',
    password:'',
  });

  /*const onRegister = () => {
    console.log({name, email, password});
    Keyboard.dismiss();
    signUp({
      nombre:name,
      correo:email,
      password,
    });
  };*/

  const onRegister = () => {
    //console.log({name, email, password});
    Keyboard.dismiss();
    signUpFirebase({
      correo:email,
      password,
    });
  };

  /*
  useEffect(() => {
    if (errorMessage.length === 0) {return;}
    else {
      Alert.alert(
        'Account not created!',
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

  return (
    <>
      <KeyboardAvoidingView
        style={{...styles.centeredView, backgroundColor:'#Ff7200'}}
        behavior={(Platform.OS === 'ios') ? 'padding' : 'height'}
      >
        <WhiteLogo />
        <Text style={styles.title}> Sign Up </Text>
        {/*<Text style={styles.title}> Email </Text>*/}
        <View style={{alignItems:'center'}}>
          <TextInput
            style={{...styles.label_input_box, marginTop:30}}
            placeholder="User Name"
            keyboardType='email-address'
            placeholderTextColor={'white'}
            onChangeText={(value) => onChange(value, 'name')}
            value={name}
            onSubmitEditing={onRegister}
          />
          <TextInput
            style={{...styles.label_input_box}}
            placeholder="Email"
            keyboardType='email-address'
            placeholderTextColor={'white'}
            onChangeText={(value) => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onRegister}
          />
          <TextInput
            style={styles.label_input_box}
            placeholder="password"
            placeholderTextColor={'white'}
            onChangeText={(value) => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onRegister}
            secureTextEntry
          />
          <TouchableOpacity
            style={{...styles.buttonTouch, marginTop:30}}
            onPress={onRegister}
          >
            <Text style={styles.textButton}>Create Account</Text>
          </TouchableOpacity>
          <Text style={{marginTop:10, color:'white'}}> Or </Text>
          <TouchableOpacity
            style={{...styles.buttonTouch, marginTop:10}}
            onPress={() => navigation.replace('LoginScreen')}
          >
            <Text style={styles.textButton}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
