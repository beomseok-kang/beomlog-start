import firebase from 'firebase';
import 'firebase/firestore';
import { db } from '../App';
import { Post } from '../Modules/post';
import { UserState } from '../Modules/user';
import { getCategoryPostsParams } from '../Modules/categoryPosts';

type category = {
    category: string;
    numOfPosts: number;
};

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
    categories: {
        [category: string]: category
    }
}

export const createUserData = async (uid: string | undefined, userData: UserData) => {
    await db.collection('user').doc(uid).set(userData);
};

export const getUserDataFromDatabase = async (uid: string) => {
    let data: object | undefined = undefined;
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
    const increment = firebase.firestore.FieldValue.increment(1);
    const {
        category,
        postId,
        uid
    } = post;
    await db.collection('post').doc(postId).set(post);
    await db.collection('postsByUser').doc(uid).collection('All').doc(postId).set(post);
    await db.collection('postsByUser').doc(uid).collection(category).doc(postId).set(post);
    await db.collection('user').doc(uid).update({
        "categories.All.numOfPosts": increment,
        [`categories.${category}.numOfPosts`]: increment
    });
};

type deletePostInputType = {
    uid: string;
    postId: string;
    category: string;
};
export const deletePostDataFromDatabase = async ({category, postId, uid}: deletePostInputType) => {
    const decrement = firebase.firestore.FieldValue.increment(-1);
    await db.collection('post').doc(postId).delete();
    await db.collection('postsByUser').doc(uid).collection('All').doc(postId).delete();
    await db.collection('postsByUser').doc(uid).collection(category).doc(postId).delete();
    await db.collection('user').doc(uid).update({
        "categories.All.numOfPosts": decrement,
        [`categories.${category}.numOfPosts`]: decrement
    });
};
export const updatePostDataOnDatabase = async (post:Post) => {
    const {
        category,
        postId,
        uid
    } = post;
    await db.collection('post').doc(post.postId).set(post);
    await db.collection('postsByUser').doc(uid).collection('All').doc(postId).set(post);
    await db.collection('postsByUser').doc(uid).collection(category).doc(postId).set(post);
};

//categoryPosts & homePosts

export const getCategoryPostsFromDatabase = async (params: getCategoryPostsParams) => {
    const {
        uid,
        category
    } = params;
    let data: object | undefined = {};
    await db.collection('postsByUser').doc(uid).collection(category).get().then((snapshot) => {
        data = snapshot.docs.map(doc => doc.data());
    });
    return data;
};
export const getHomePostsFromDatabase = async () => {
    let data: object | undefined = {};
    await db.collection('post').orderBy('time', 'desc').limit(10).get().then((snapshot) => {
        data = snapshot.docs.map(doc => doc.data());
    });
    return data;
};