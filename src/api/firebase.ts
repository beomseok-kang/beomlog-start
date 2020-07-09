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

type UserData = {
    email: string;
    name: string;
    imgUrl: string;
}

export const createUserData = async (uid: string | undefined, userData: UserData) => {
    await db.collection('user').doc(uid).set(userData)
}

// export const getUserData = async (uid: string) => {
//     await db.collection('user').doc(uid).get()
// }

export const getUserDataOnSnapshot = (uid: string) => {
    const doc =  db.collection('user').doc(uid);
    let snapshot: any = null;
    let observer = doc.onSnapshot(docSnapshot => {
        snapshot = docSnapshot;
    }, err => {
    console.log(`Encountered error: ${err}`);
    });
    return snapshot;
}