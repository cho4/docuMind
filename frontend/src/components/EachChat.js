import { useEffect, useState } from 'react';
import DragAndDrop from '../Upload_File.js';

function EachChat(props) {
    //prop1
    const [uploaded, setUploaded] = useState(false);
    //prop2
    const [msg, setMsg] = useState([]);
    
    const onChatClick = () => {
        props.callback(uploaded, setUploaded, msg, setMsg)
    }

    return (
      <div onClick={onChatClick} style={{ height: 100, backgroundColor: 'white', margin: 10, borderRadius: 5 }}>
        New Chat
      </div>
    );
  }

export default EachChat