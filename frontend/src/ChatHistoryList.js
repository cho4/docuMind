import React, { useState } from 'react';
import EachChat from './components/EachChat';

function ChatHistoryList(props) {

  const [chatList, setChatList] = useState([]);

  const addNewChat = () => {
    setChatList([...chatList, <EachChat key={chatList.length + 1} callback={props.callback} />]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'lightgray' }}>
      <div style={{ flex: 1, overflowY: 'scroll' }}>
        {chatList}
      </div>
      <div style={{ height: 51.09623336791992, width: 172, left: 86, top: 888, borderRadius: 10, backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <button onClick={addNewChat}>New Chat</button>
      </div>
    </div>
  );
}


export default ChatHistoryList;
