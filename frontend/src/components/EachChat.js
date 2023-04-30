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
        props.callback(uploaded, setUploaded, msg, setMsg);
        props.cb3(true);
    }

    return (
      <div onClick={onChatClick} style={{backgroundColor: '#C9C9C9', 'border-radius': '25px', 'border-width': 0, height: 51.09623336791992, width: 172, left: 86, top: 888, borderRadius: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'white', margin: '0 auto', marginTop: '10px', marginBottom: '10px', 'font-family': 'Euclid Circular A','font-size': '18px', 'font-weight': '500','line-height': '23px','letter-spacing': '0em', 'text-align': 'center'}}>
        New Chat
      </div>
    );
  }

export default EachChat;