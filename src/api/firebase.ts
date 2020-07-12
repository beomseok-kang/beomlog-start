import firebase from 'firebase';
import 'firebase/firestore';
import { db } from '../App';

///////////// authentication /////////////////////////

export const signUp = async (email: string, password: string, userData: UserData) => {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
            throw new Error(error);
        });
    if(firebase.auth().currentUser?.uid) {
        await createUserData(
        firebase.auth().currentUser?.uid,
        userData
        );
    }
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

//////////////// firestore //////////////////////////////////

//userData

export type UserData = {
    email: string;
    name: string;
    imgUrl: string;
}

export const createUserData = async (uid: string | undefined, userData: UserData) => {
    await db.collection('user').doc(uid).set(userData)
}

export const getUserDataFromDatabase = async (uid: string) => {
    let data: object | undefined = {};
    await db.collection('user').doc(uid).get().then((snapshot) => {
        data = snapshot.data();
    }).catch(e => {
        console.log('some error');
    });
    return data;
}