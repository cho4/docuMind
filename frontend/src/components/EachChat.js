import { useEffect, useState } from 'react';
import DragAndDrop from './Upload_File.js';
import axios from 'axios';

function EachChat(props) {
    //prop1
    const [uploaded, setUploaded] = useState(false);
    //prop2
    const [msg, setMsg] = useState([]);

    const [title, setTitle] = useState('');
    
    useEffect(() => {
      axios.post('localhost:5000/access_messages/', {"title": title}).then(
        (response) => {
          if (response.data.success == true) {
            setMsg([...msg, ...response.data.chat]);
            props.cb2();
          } else {
            alert("Failed in retrieving data");
          }
        }
      ).catch((e) => {console.error(e)});
    })
    const onChatClick = () => {
        props.callback(uploaded, setUploaded, msg, setMsg)
    }

    return (
      <div onClick={onChatClick} style={{ height: 100, backgroundColor: 'white', margin: 10, borderRadius: 5 }}>
        New Chat
      </div>
    );
  }

export default EachChat;