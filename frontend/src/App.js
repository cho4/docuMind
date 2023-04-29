import logo from './logo.svg';
import './App.css';
import ChatHistoryList from './ChatHistoryList';
import { useRef, useState } from 'react';

/*
function App() {
  const chatHistoryListRef = useRef(null);

  const handleNewChat = () => {
    chatHistoryListRef.current.addNewChat();
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "30%", height: "100%", display: "flex", flexDirection: "column" }}>
        <div style={{ backgroundColor: "#f0f0f0", height: "20%" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
            <span style={{ fontWeight: "bold", fontSize: "28px", color: "#00bfff" }}>PDF</span>
            <span style={{ fontWeight: "bold", fontSize: "28px", color: "black" }}>riend</span>
          </div>
        </div>
        <div style={{ backgroundColor: "#eaeaea", height: "60%" }} id="chat-history-list">
          <ChatHistoryList ref={chatHistoryListRef} />
        </div>
        <div style={{ backgroundColor: "#f0f0f0", height: "20%", display: "flex", justifyContent: "center", alignItems: "center" }}>
          <button style={{ height: "51.09623336791992px", width: "172px", borderRadius: "10px" }} onClick={handleNewChat}>
            New Chat
          </button>
        </div>
      </div>
      <div style={{ width: "70%", height: "100%", backgroundColor: "#eaeaea" }}></div>
    </div>
  );
}

export default App;
*/

import React from 'react';

function App() {
  const [currentChat, setCurrentChat] = useState([]);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, backgroundColor: 'lightgray', display: 'flex', flexDirection: 'column' }}>
        <div style={{ flex: 1, backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{ textAlign: 'center' }}>
            <span style={{ color: 'lightblue', fontWeight: 'bold' }}>PDF</span>riend
          </h1>
        </div>
        <div style={{ flex: 2, backgroundColor: 'white' }}>
          <ChatHistoryList callback={setCurrentChat}/>
        </div>
      </div>
      <div style={{ flex: 2, backgroundColor: 'lightblue' }}>
        {currentChat && <></>}
      </div>
    </div>
  );
}

export default App;
