import firebase from 'firebase';
import 'firebase/firestore';
import { db, storage } from '../App';
import { PostDataInDatabase, comment } from '../Modules/post';
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
    phrase: string;
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
        phrase: userState.phrase,
        categories: userState.categories
    }); 
};

//post

export const getPostDataFromDatabase = async (postId: string) => {
    let data: object | undefined | any = {};
    await db.collection('post').doc(postId).get().then((snapshot) => {
        data = snapshot.data();
    });
    await db.collection('user').doc(data.uid).get().then((snapshot) => {
        data.userData = snapshot.data();
    });
    return data;
};
export const uploadPostDataToDatabase = async (postData: PostDataInDatabase) => {
    const increment = firebase.firestore.FieldValue.increment(1);
    const {
        category,
        postId,
        uid
    } = postData;
    await db.collection('post').doc(postId).set(postData);
    await db.collection('postsByUser').doc(uid).collection('All').doc(postId).set(postData);
    await db.collection('postsByUser').doc(uid).collection(category).doc(postId).set(postData);
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
export const updatePostDataOnDatabase = async (postData: PostDataInDatabase) => {
    const {
        category,
        postId,
        uid
    } = postData;
    await db.collection('post').doc(postId).set(postData);
    await db.collection('postsByUser').doc(uid).collection('All').doc(postId).set(postData);
    await db.collection('postsByUser').doc(uid).collection(category).doc(postId).set(postData);
};

// comment

export const uploadComment = async (commentParams: comment, postId: string) => {
    await db.collection('post').doc(postId).update({
        comments: firebase.firestore.FieldValue.arrayUnion(commentParams)
    });
}

export const deleteComment = async (commentParams: comment, postId: string) => {
    await db.collection('post').doc(postId).update({
        comments: firebase.firestore.FieldValue.arrayRemove(commentParams)
    });
}


//categoryPosts & homePosts

export const getCategoryPostsFromDatabase = async (params: getCategoryPostsParams) => {
    const {
        uid,
        category
    } = params;
    let data: object | undefined | any = {};
    await db.collection('postsByUser').doc(uid).collection(category).get().then((snapshot) => {
        data = snapshot.docs.map(doc => doc.data());
    });
    await db.collection('user').doc(uid).get().then((snapshot) => {
        data.map((docData: any) => {
            let docDataTemp = docData;
            docDataTemp.userData = snapshot.data();
            return docDataTemp
        });
    })
    return data;
};

const getUserDataPromiseFromUid = (uid: string) => {
    return db.collection('user').doc(uid).get().then((snapshot) => {
        return snapshot.data();
    });
};
const getDataFromUidArray = async (data: any, uidArray: Array<string>) => {
    let result = data;
    for (let i = 0; i < uidArray.length; i++) {
        await getUserDataPromiseFromUid(uidArray[i]).then((userData: any) => {
            result.map((docData: any) => {
                if (userData.email !== docData.email) return docData;
                let docDataTemp = docData;
                docDataTemp.userData = userData;
                return docDataTemp;
            });
        });
    }
    
    return result;
};

export const getHomePostsFromDatabase = async () => {
    let data: object | undefined | any = {};
    await db.collection('post').orderBy('time', 'desc').limit(10).get().then((snapshot) => {
        data = snapshot.docs.map(doc => doc.data());
    });

    let uidArray: Array<string> = data.map((docData: any) => docData.uid);
    uidArray = Array.from(new Set(uidArray));
    data = await getDataFromUidArray(data, uidArray);
    return data;
};

/////////// Cloud Storage //////////////////////////////////////////

export const uploadImgAndUpdateDatabase = async (uid: string, file: File) => {
    const fileRef = storage.ref().child(`${uid}_${file.name}`);
    await fileRef.put(file);
    fileRef.getDownloadURL().then(async (downloadUrl) => {
        await db.collection('user').doc(uid).update({ imgUrl: downloadUrl });
    });
};

