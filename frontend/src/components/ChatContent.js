import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Message from './Message.js';

function ChatContent(props) {
    const [message, setMessage] = useState('');

    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
      setMessageList(props.msg);
    }, [props.msg])

    const handleSubmit = (e) => {
      e.preventDefault();
      var temp = e.target.previousSibling.value;
      axios.post('http://localhost:5000/chat/', {"message": temp, 'title': props.name}).then(
        (res) => {
          console.log(res.data);
          if (res.data.success == true) {
            var outMsg = {"text": temp, "type": "sender"};
            var data = {"text": res.data.response, "type": "not sender"};
            console.log(outMsg, data);
            setMessageList((prev) => [...prev, outMsg, data]);
          } else {
            console.error('');
          }
        }
      )
      setMessage('');
    }

    const handleChange = (e) => {
      setMessage(e.target.value);
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ flex: 1, padding: 20 }}>
          <div style={{ height: 'calc(100vh - 100px)', overflow: 'auto', position: 'relative' }}>
            <div style={{ padding: 20 }}>            
              {messageList.map((element, index) => {return <Message text={element.text} type={element.type} key={index} />})} 
            </div>
          </div>
        </div>
        <div style={{ flex: '0 0 60px', backgroundColor: '#D8D8D8', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 20px' }}>
        <div style={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
            <input type="text" value={message} onChange={handleChange} placeholder="Type your message here" style={{'font-family': 'Euclid Circular A', width: '100%', padding: 10, marginRight: 10 }} />
            <button type="submit" onClick={handleSubmit} style={{ padding: '10px 20px', backgroundColor: 'lightblue', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer', position: 'absolute', right: 20, boxShadow: "opx 4px 4px rgba(0, 0, 0, 0.25)", borderRadius:"40px" }}>Send</button>
        </div>
          <button style={{ marginLeft: 10, padding: 10, backgroundColor: '#D8D8D8', color: 'lightblue', border: 'none', borderRadius: 5, cursor: 'pointer' }}>Button</button>
        </div>
      </div>
    );
}

export default ChatContent;
