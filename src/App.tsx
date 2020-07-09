import React from 'react';
import LoginPage from './Pages/LoginPage';
import DialogContainer from './Container/Dialog/DialogContainer';
import { useFb } from './api/firebase';
import { Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';

useFb();

function App() {
  return (
    <>
      <Route path="/auth" component={LoginPage} exact/>
      <Route path="/home" component={HomePage} />
      <DialogContainer />
    </>
  );
}

export default App;
