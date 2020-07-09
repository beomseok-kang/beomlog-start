import firebase from 'firebase';
import 'firebase/firestore';
// import { useDispatch } from 'react-redux';


// ///////////// dispatch / redux //////////////////////////

// const 
// const dispatch = useDispatch();

///////////// initialize app //////////////////////////

const firebaseConfig = {
    apiKey: "AIzaSyA9k7r-SspAyi_JU1LQ3e8aIFLqZ93oay8",
    authDomain: "beomlog-4157c.firebaseapp.com",
    databaseURL: "https://beomlog-4157c.firebaseio.com",
    projectId: "beomlog-4157c",
    storageBucket: "beomlog-4157c.appspot.com",
    messagingSenderId: "130805323864",
    appId: "1:130805323864:web:bbcec3822a13a38139922d",
    measurementId: "G-KT4F1VCYFG"
};

export const useFb = () => {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
};

///////////// authentication /////////////////////////

export const signUp = async (email: string, password: string) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
            throw new Error(error);
        });
    console.log(firebase.auth().currentUser);
    return firebase.auth().currentUser;
};

export const signIn = async (email: string, password: string) => {
    await firebase.auth().signInWithEmailAndPassword(email, password)
        .catch(function(error) {
            throw new Error(error);
        });
    console.log(firebase.auth().currentUser);
    return firebase.auth().currentUser;
};

export const signOut = async () => {
    await firebase.auth().signOut().catch(function(error) {
        throw new Error(error);
    });
    console.log('signed out');
}