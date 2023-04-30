import '../App.css';
import ChatHistoryList from '../components/ChatHistoryList.js';
import { useRef, useState } from 'react';

import React from 'react';
import logo from "../images/logo.svg"
import ChatContent from '../components/ChatContent.js';
import FileDropZone from '../components/Upload_File.js';

function Dashboard() {
  const [uploaded, setUploaded] = useState(true);
  const [historyMsg, setHistoryMsg] = useState([]);
  const [thisName, setThisName] = useState(0);
  const [booted, setBooted] = useState(false);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, backgroundColor: '#E6E6E6', display: 'flex', flexDirection: 'column' }}>
    <div style={{ flex: 1, backgroundColor: "#E6E6E6", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <img src={logo} style={{ width: '90%', height: '100%' }} />
    </div>
    <div style={{ flex: 3, backgroundColor: 'white', overflowY: 'auto' }}>
      <ChatHistoryList
        callback={(p1, s1, p2, s2) => {setUploaded(p1); setHistoryMsg([...historyMsg, p2])}}
        cbName={thisName}
        setBoot={setBooted}
      />
    </div>
  </div>
  <div style={{ flex: 3, backgroundColor: '#F0F0F0' }}>
    {!uploaded
       ? <FileDropZone callback={(name) => {setUploaded(true); setThisName(name)}} />
       : !booted
          ? <div></div>
          : <ChatContent msg={historyMsg} name={thisName} callback={setHistoryMsg} />}
  </div>
</div>

  );
}

export default Dashboard;
