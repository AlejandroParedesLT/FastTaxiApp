import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import mernAPI from '../api/mernAPI';
import { LoginData, LogInResponse, RegisterData, Usuario } from '../Interfaces/appInterfaces';
import { authReducer, AuthState } from './AuthReducer';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import auth from '@react-native-firebase/auth';

type AuthContextProps = {
    errorMessage: string;
    token: string | null;
    user: Usuario | null;
    status: 'checking' | 'authenticated' | 'not-authenticated'; // Update the type here
    signUp: (registerData: RegisterData) => void;
    signIn: (loginData: LoginData) => void;
    signInFirebase: (loginData: LoginData) => void;
    signUpFirebase: (loginData: LoginData) => void;
    logOut: () => void;
    removeError: () => void;
  };

/*    // Usar para esperar el login
{isLoading
    ? <ActivityIndicator size={30} color="grey" style={{marginTop:20}}/>
    : <MovieDetails movieFull={movieFull!} cast={cast}/>
}
*/

const authInitialState: AuthState = {
    status:'checking',
    token:null,
    user:null,
    errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any ) => {
    const [ state, dispatch ] = useReducer(authReducer, authInitialState);
    //const auth = FIREBASE_AUTH;

    useEffect(() => {
        checkToken();
    }, []);

    const checkToken = async () => {
        const token = await AsyncStorage.getItem('token');
            //.then( token => {
                //console.log({token});
            //});
        if (!token) {return dispatch({type:'notAuthenticated', payload:''})}
        else {
            const resp = await mernAPI.get('/auth');
            if (resp.status !== 200){
                return dispatch({type: 'notAuthenticated', payload:''});
            } else {
                dispatch(
                    {
                        type:'signUp',
                        payload:{
                            token:resp.data.token,
                            user:resp.data.usuario,
                        },
                    }
                );
            }
        }
    };

    const signIn = async ({correo, password}: LoginData) => {
        try {
            const resp = await mernAPI.post<LogInResponse>('/auth/login', {correo, password});
            dispatch(
                {
                    type:'signUp',
                    payload:{
                        token:resp.data.token,
                        user:resp.data.usuario,
                    },
                }
            );
            await AsyncStorage.setItem('token', resp.data.token);
        } catch (error) {
            console.log(error.response.data);
            dispatch(
                {
                    type:'addError',
                    payload: error.response.data || 'Revisar la información',
                }
            );
        }
    };

    const signInFirebase = async ({correo, password}: LoginData) => {
        auth()
            .signInWithEmailAndPassword(correo, password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                }

                console.error(error);
            });
        /*try {
            const response = await signInWithEmailAndPassword(auth,correo, password);
            console.log(response);
            //alert('Check your emails')
        } catch (error) {
            console.log(error);
        } finally {
            //  Implement SetLoading
        }*/
    };

    const signUp = async ({correo, password, nombre}: RegisterData) => {
        try {
            const resp = await mernAPI.post<LogInResponse>('/usuarios', {correo, password, nombre});
            dispatch(
                {
                    type:'signUp',
                    payload:{
                        token:resp.data.token,
                        user:resp.data.usuario,
                    },
                }
            );
            await AsyncStorage.setItem('token', resp.data.token);
        } catch (error) {
            console.log(error.response.data.errors[0].msg);
            dispatch(
                {
                    type:'addError',
                    payload: error.response.data.errors[0].msg || 'Información incorrecta',
                }
            );
        }
    };

    const signUpFirebase = async ({correo, password}: LoginData) => {
        auth()
            .createUserWithEmailAndPassword(correo, password)
            .then(() => {
                console.log('User account created & signed in!');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                console.log('That email address is already in use!');
                }

                if (error.code === 'auth/invalid-email') {
                console.log('That email address is invalid!');
                }

                console.error(error);
            });
        /*
        try {
            const response = await createUserWithEmailAndPassword(auth,correo, password);
            console.log(response);
            //alert('Check your emails')
        } catch (error:any) {
            console.log(error);
        } finally {
            //  Implement SetLoading
        }
        */
    };

    const logOut = async () => {
        await AsyncStorage.removeItem('token');
        dispatch({type:'logout'});
    };

    const removeError = () => {
        dispatch({type:'removeError'});
    };

    return (
        <AuthContext.Provider value={{
            ...state,
            signUp,
            signIn,
            signInFirebase,
            signUpFirebase,
            logOut,
            removeError,
        }}>
            { children }
        </AuthContext.Provider>
    );
};
