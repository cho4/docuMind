import './App.css';
import { useRef, useState } from 'react';

import React from 'react';
import Dashboard from './mainComponents/Dashboard';
import Authentification from './mainComponents/Authentification';
import LogginInComponent from './mainComponents/LogginInComponent';

function App() {
  const [key, setKey]= useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)

  let contentToRender = <Authentification signIn={(arg) => setKey(arg)} />
  if (key) contentToRender = <LogginInComponent setUser={(name) => setUser(name)} />
  if (user) contentToRender = <Dashboard />

  return (
    <>
   {contentToRender}
   </>
  );
}

export default App;
