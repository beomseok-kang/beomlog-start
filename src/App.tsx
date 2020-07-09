import firebase from 'firebase';
import React from 'react';
import LoginPage from './Pages/LoginPage';
import DialogContainer from './Container/Dialog/DialogContainer';
import { Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import RegisterPage from './Pages/RegisterPage';


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
firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const db = firebase.firestore();

function App() {
  return (
    <>
      <Route path="/auth" component={LoginPage} exact/>
      <Route path="/auth/register" component={RegisterPage} exact/>
      <Route path="/home" component={HomePage} />
      <DialogContainer />
    </>
  );
}

export default App;
