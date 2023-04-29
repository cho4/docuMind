import React, { useEffect, useState } from 'react';
import EachChat from './components/EachChat';
import './index.css';

function ChatHistoryList(props) {
  const [chatList, setChatList] = useState([]);
  const [thisIndex, setThisIndex] = useState(0);
  const [name, setName] = useState(props.cbName);

  useEffect(() => {
    if (name != '') {
      addName(chatList, thisIndex, name);
      setName('');
    }
  }, [name])

  const addName = (chatList, thisIndex, name) => {
    chatList[thisIndex].name = name
  }

  const addNewChat = () => {
    setChatList([...chatList, <EachChat key={chatList.length + 1} callback={props.callback} cb2={() => setThisIndex(this.key)} name={"Blank chat"}/>]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: '#E6E6E6' }}>
      <div style={{ flex: 1, overflowY: 'scroll', maxHeight: 'calc(100% - 51.09623336791992px)' }}>
        {chatList}
      </div>
      <button onClick={addNewChat} style={{backgroundColor: '#5CC2C2', 'border-radius': '25px', 'border-width': 0, height: 51.09623336791992, width: 172, left: 86, top: 888, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', margin: '0 auto', marginTop: '30px', marginBottom: '30px', 'font-family': 'Euclid Circular A','font-size': '18px', 'font-weight': '500','line-height': '23px','letter-spacing': '0em', 'text-align': 'center'}}>
          <div className='circle'></div>
          New Chat
      </button>
    </div>
  );
}


export default ChatHistoryList;
