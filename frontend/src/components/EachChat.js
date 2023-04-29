import { useEffect, useState } from 'react';
import DragAndDrop from '../Upload_File.js';

function EachChat(props) {
    const [uploaded, setUploaded] = useState(false);
    
    const onChatClick = () => {
        props.callback(["got the chat"])
    }

    return (
      <div onClick={onChatClick} style={{ height: 100, backgroundColor: 'white', margin: 10, borderRadius: 5 }}>
        New Chat
      </div>
    );
  }

export default EachChat