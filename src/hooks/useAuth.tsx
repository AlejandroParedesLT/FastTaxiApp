import React, {useState, useEffect} from 'react';
import { User, onAuthStateChanged } from 'firebase/auth'; //getAuth,
import { FIREBASE_AUTH } from '../../FirebaseConfig';
//import app from '../../FirebaseConfig';

//app();
//nst auth = getAuth(); //FIREBASE

export const useAuth = () => {
    const [user, setUser] = useState<User>();
    useEffect(() => {
        const unsubscribeFromAuthStateChanged = onAuthStateChanged(FIREBASE_AUTH, (usera) => {
          if (usera) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            setUser(usera);
          } else {
            // User is signed out
            setUser(undefined);
          }
        });
        return unsubscribeFromAuthStateChanged;
      }, []);
    return {
    user,
    };
};
