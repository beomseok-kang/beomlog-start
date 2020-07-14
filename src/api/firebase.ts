import firebase from 'firebase';
import 'firebase/firestore';
import { db } from '../App';
import { Post } from '../Modules/post';
import { category } from '../Container/Home/HeaderContainer';
import { UserState } from '../Modules/user';

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
    categories: category[];
}

export const createUserData = async (uid: string | undefined, userData: UserData) => {
    await db.collection('user').doc(uid).set(userData);
};

export const getUserDataFromDatabase = async (uid: string) => {
    let data: object | undefined = {};
    await db.collection('user').doc(uid).get().then((snapshot) => {
        data = snapshot.data();
    }).catch(e => {
        console.log(e);
    });
    return data;
};

export const updateUserDataOnDatabase = async (userState: UserState) => {
    await db.collection('user').doc(userState.uid).set({
        name: userState.name,
        email: userState.email,
        imgUrl: userState.imgUrl,
        categories: userState.categories
    }); 
};

//post

export const getPostDataFromDatabase = async (postId: string) => {
    let data: object | undefined = {};
    await db.collection('post').doc(postId).get().then((snapshot) => {
        data = snapshot.data();
    });
    return data;
};
export const uploadPostDataToDatabase = async (post: Post) => {
    const {
        category,
        editorData,
        postId,
        time,
        title,
        userData,
        uid
    } = post;
    await db.collection('post').doc(postId).set(post);
    const postDataToPostsByUser = {
        [postId]: {
            category,
            editorData,
            postId,
            time,
            title,
            userData
        }
    };
    await db.collection('postsByUser').doc(uid).set({
        All: {
            ...postDataToPostsByUser
        },
        [category]: {
            ...postDataToPostsByUser
        }
    }, {merge: true});
    await db.collection('user').doc(uid).update({
        categories: {
            ...userData.categories,
            All: {
                category: 'All',
                numOfPosts: (userData.categories['All'].numOfPosts + 1)
            },
            [category]: {
                category: category,
                numOfPosts: (userData.categories[category].numOfPosts + 1)
            }
        }
    })
};
export const deletePostDataFromDatabase = async (postId: string) => {
    await db.collection('post').doc(postId).delete();
};
export const updatePostDataOnDatabase = async (post:Post) => {
    await db.collection('post').doc(post.postId).set(post);
};