import logo from './logo.svg';
import './App.css';
import ChatHistoryList from './ChatHistoryList.js';
import { useRef, useState } from 'react';

import React from 'react';
import ChatContent from './components/ChatContent.js';
import FileDropZone from './Upload_File.js';

function App() {
  const [uploaded, setUploaded] = useState(false);
  const [historyMsg, setHistoryMsg] = useState([]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, backgroundColor: 'lightgray', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{ textAlign: 'center' }}>
            <span style={{ color: 'lightblue', fontWeight: 'bold' }}>PDF</span>riend
          </h1>
        </div>
        <div style={{ flex: 3, backgroundColor: 'white', overflowY: 'scroll' }}>
          <ChatHistoryList callback={(p1, s1, p2, s2) => {setUploaded(p1); setHistoryMsg(p2)}}/>
        </div>
      </div>
      <div style={{ flex: 4, backgroundColor: 'lightblue' }}>
        {!uploaded ? <FileDropZone callback={setUploaded} /> : <ChatContent prop1={historyMsg} callback={setHistoryMsg} />}
      </div>
    </div>
  );
}

export default App;
