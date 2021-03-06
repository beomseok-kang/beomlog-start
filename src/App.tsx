import firebase from 'firebase';
import React from 'react';
import LoginPage from './Pages/LoginPage';
import DialogContainer from './Container/Dialog/DialogContainer';
import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import RegisterPage from './Pages/RegisterPage';
import CategoryPage from './Pages/CategoryPage';
import PostPage from './Pages/PostPage';
import WritingPage from './Pages/WritingPage';
import UpdatePage from './Pages/UpdatePage';
import UserSettingsPage from './Pages/UserSettingsPage';
import './App.scss';
import UnfoundPage from './Pages/UnfoundPage';


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
firebase.initializeApp(firebaseConfig)
firebase.analytics();
export const db = firebase.firestore();
export const storage = firebase.storage();

function App() {

  return (
    <>
      <Switch>
        <Redirect from="/" to="/home" exact/>
        <Route path="/auth" component={LoginPage} exact/>
        <Route path="/auth/register" component={RegisterPage} exact/>
        <Route path="/home" component={HomePage} exact />
        <Route path="/category/:category" component={CategoryPage} exact/>
        <Route path="/post/:postId" component={PostPage} exact/>
        <Route path="/upload" component={WritingPage} exact/>
        <Route path="/update" component={UpdatePage} exact/>
        <Route path="/setting" component={UserSettingsPage} exact/>
        <Route render={() => <UnfoundPage />}/>
      </Switch>
      <DialogContainer />
    </>
  );
}

export default App;
