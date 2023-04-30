import React, { useState } from 'react';
import logo from "../images/logo.svg"
import "../fonts.css"
import axios from 'axios';

function Authentification(props) {
    const [value, setValue] = useState('');
    const [isKeyValid, setIsKeyValid] = useState(false)
    const [errorMessage, setErrorMessage] = useState();

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = 'http://localhost:5000/key/';

  const data = {
    key: value
  };

  axios.post(url, data)
    .then((response) => {

      if (!response.data.is_valid) {
        setIsKeyValid(false)
      setErrorMessage("Invalid Key")
      } else {
        setErrorMessage(null)
    setIsKeyValid(true)
      }

  })
  .catch((error) => {
    console.log(error)
    setIsKeyValid(false)
    setErrorMessage("Invalid Key")
  });
  }

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  const handleSignIn = () => {
    props.signIn(value)
  }


  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px', flexDirection: 'column' }}>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '50px 0', height: '140px' }}>
    <img src={logo} alt="Logo" height="500px" />
  </div>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
  <p style={{ textAlign: 'center', marginBottom: '10px', fontFamily: 'Euclid Circular A Light, sans-serif', fontWeight: 'normal' }}>Say goodbye to endless scrolling and searching.</p>
    <p style={{ textAlign: 'center', marginBottom: '10px', fontFamily: 'Euclid Circular A Light, sans-serif', fontWeight: 'normal' }}>pageTalk delivers the answers found in your PDFs that you need, when you need them.</p>
    <p style={{ textAlign: 'center', marginTop: '0', fontFamily: 'Euclid Circular A Light, sans-serif', fontWeight: 'normal' }}>Powered by GPT-3.5.</p>
  </div>
  <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '50px' }}>
  {errorMessage && <p style={{ color: 'red', marginRight: '5px' }}>{errorMessage}</p>}
  <input type="text" value={value} onChange={handleChange} style={{fontFamily: 'Euclid Circular A Light, sans-serif', backgroundColor: errorMessage ? '#FFE6E6' : '#FFFFFF', boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" , width: '40%', height: '30px', borderRadius: '15px', border: '0.5px solid gray', padding: '10px' }} placeholder="Enter your openai API key here" />
  <button type="submit" style={{ borderRadius: '20px', backgroundColor: '#E6E6E6', border: 'none', padding: '10px', marginLeft: '20px', fontFamily: 'Euclid Circular A Light, sans-serif', width: '120px' }}>Submit</button>
</form>

  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px', marginBottom: '40px' }}>
    <button onClick={handleSignIn} disabled={!isKeyValid} style={{ fontFamily: 'Euclid Circular A Light, sans-serif',borderRadius: '20px', width: '200px', height: '40px', border: 'none', backgroundColor: '#5CC2C2', marginRight: '40px', fontSize: '16px'}}>Sign In</button>
    <button style={{fontFamily: 'Euclid Circular A Light, sans-serif',borderRadius: '20px', width: '200px', height: '40px', border: 'none', backgroundColor: '#D9D9D9', fontSize: '16px'}}>Guest</button>
  </div>
</div>



  );
}

export default Authentification;
