import React, { useState } from 'react';
import axios from 'axios';


function LogginInComponent(props) {
  const [usernameAuth, setUsernameAuth] = useState('');
  const [passwordAuth, setPasswordAuth] = useState('');
  const [usernameCreate, setUsernameCreate] = useState('');
  const [passwordCreate, setPasswordCreate] = useState('');
  const [authErrorMessage, setAuthErrorMessage] = useState(null)
  const [createErrorMessage, setCreateErrorMessage] = useState(null)

  const handleUsernameAuthChange = (event) => {
    setUsernameAuth(event.target.value);
  };

  const handlePasswordAuthChange = (event) => {
    setPasswordAuth(event.target.value);
  };

  const handleUsernameCreateChange = (event) => {
    setUsernameCreate(event.target.value);
  };

  const handlePasswordCreateChange = (event) => {
    setPasswordCreate(event.target.value);
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    const url = 'http://localhost:5000/login/';

    const data = {
        password: passwordAuth,
        username: usernameAuth
    };

    axios.post(url, data)
    .then((response) => {

      if (!response.data.success) {
      setAuthErrorMessage("An error occurred!")
      } else {
        setAuthErrorMessage(null)
        props.setUser(response.data.username)
      }

    })
  .catch((error) => {
    setAuthErrorMessage("An error occurred!")
  });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    const url = 'http://localhost:5000/signup/';

    const data = {
        password: passwordCreate,
        username: usernameCreate
    };

    axios.post(url, data)
    .then((response) => {
      console.log(response)
      if (!response.data.success) {
        setCreateErrorMessage(null)
        props.setUser(response.data.username)
      
      } else {
        setCreateErrorMessage("An error occurred!")
        props.setUser(response.data.username)
      }

    })
  .catch((error) => {
    console.log("error")
    setCreateErrorMessage("An error occurred!")
  });
  };

  return (

<div style={{ display: 'flex', height: '100vh' }}>
  <div style={{ flex: '1', backgroundColor: '#E6E6E6', borderRight: '1px solid #888888', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <form onSubmit={handleSignIn} style={{ width: '50%', textAlign: 'center', margin: 'auto' }}>
      <h2 style={{ fontFamily: 'Euclid Circular A Medium, sans-serif' }}>Authorization</h2>
      <input type="text" onChange={handleUsernameAuthChange} style={{outline: 'none', fontFamily: 'Euclid Circular A Light, sans-serif', backgroundColor:"#FFFFFF", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" , width: '80%', height: '30px', borderRadius: '15px', border: '0.5px solid gray', padding: '10px', marginBottom: '20px' }} placeholder="Username" />
      <input type="password" onChange={handlePasswordAuthChange} style={{outline: 'none', fontFamily: 'Euclid Circular A Light, sans-serif', backgroundColor:"#FFFFFF", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" , width: '80%', height: '30px', borderRadius: '15px', border: '0.5px solid gray', padding: '10px', marginBottom: '20px' }} placeholder="Password" />
      <button type="submit" style={{ borderRadius: '20px', backgroundColor: '#5CC2C2', border: 'none', padding: '10px', marginLeft: '20px', fontFamily: 'Euclid Circular A Light, sans-serif', width: '120px', color: '#FFFFFF', cursor: 'pointer' }}>Sign In</button>
      {authErrorMessage && (
        <p style={{ color: 'red', marginTop: '10px' }}>{authErrorMessage}</p>
      )}
    </form>
  </div>
  <div style={{ flex: '1', backgroundColor: '#E6E6E6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <form onSubmit={handleSignUp} style={{ width: '50%', textAlign: 'center', margin: 'auto' }}>
      <h2 style={{ fontFamily: 'Euclid Circular A Medium, sans-serif' }}>Create Account</h2>
      <input onChange={handleUsernameCreateChange} type="text" style={{outline: 'none', fontFamily: 'Euclid Circular A Light, sans-serif', backgroundColor:"#FFFFFF", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" , width: '80%', height: '30px', borderRadius: '15px', border: '0.5px solid gray', padding: '10px', marginBottom: '20px' }} placeholder="Username" />
      <input onChange={handlePasswordCreateChange} type="password" style={{outline: 'none', fontFamily: 'Euclid Circular A Light, sans-serif', backgroundColor:"#FFFFFF", boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" , width: '80%', height: '30px', borderRadius: '15px', border: '0.5px solid gray', padding: '10px', marginBottom: '20px' }} placeholder="Password" />
          <button type="submit" style={{ borderRadius: '20px', backgroundColor: '#5CC2C2', border: 'none', padding: '10px', marginLeft: '20px', fontFamily: 'Euclid Circular A Light, sans-serif', width: '120px', color: '#FFFFFF', cursor: 'pointer' }}>Create</button>
          {createErrorMessage && (
        <p style={{ color: 'red', marginTop: '10px' }}>{createErrorMessage}</p>
      )}
        </form>
      </div>
    </div>

  );
}

export default LogginInComponent;
