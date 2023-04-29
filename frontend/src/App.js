import logo from './logo.svg';
import './App.css';
import ChatHistoryList from './ChatHistoryList';
import { useRef, useState } from 'react';

import React from 'react';
import ChatContent from './components/ChatContent';

function App() {
  const [currentChat, setCurrentChat] = useState(null);
  console.log(currentChat)

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, backgroundColor: 'lightgray', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{ textAlign: 'center' }}>
            <span style={{ color: 'lightblue', fontWeight: 'bold' }}>PDF</span>riend
          </h1>
        </div>
        <div style={{ flex: 3, backgroundColor: 'white', overflowY: 'scroll' }}>
          <ChatHistoryList callback={setCurrentChat}/>
        </div>
      </div>
      <div style={{ flex: 4, backgroundColor: 'lightblue' }}>
        {currentChat && <ChatContent />}
      </div>
    </div>
  );
}

export default App;
