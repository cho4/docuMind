import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Message from './Message';

function ChatContent(props) {
    const [message, setMessage] = useState('');

    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
      setMessageList(props.msg);
    }, [props.msg])

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('/chat', {"message": e.target[0], 'title': props.name}).then(
        (res) => {
          if (res.data.success == true) {
            setMessageList([...messageList, res.data.response]);
          } else {
            console.error('');
          }
        },
        (error) => {console.error(error);}
      )
      setMessage('');
    }

    const handleChange = (e) => {
      setMessage(e.target.value);
    }

    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ flex: 1, padding: 20 }}>
          <div style={{ height: 'calc(100vh - 100px)', overflow: 'scroll', position: 'relative' }}>
            <div style={{ padding: 20 }}>            
              {messageList.map((element) => {<Message text={element.text} type={element.type} />})} 
            </div>
          </div>
        </div>
        <div style={{ flex: '0 0 80px', backgroundColor: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 20px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexGrow: 1, alignItems: 'center' }}>
            <input type="text" value={message} onChange={handleChange} placeholder="Type your message here" style={{ width: '100%', padding: 10, marginRight: 10 }} />
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: 'lightblue', color: 'white', border: 'none', borderRadius: 5, cursor: 'pointer', position: 'absolute', right: 20 }}>Send</button>
        </form>
          <button style={{ marginLeft: 10, padding: 10, backgroundColor: 'white', color: 'lightblue', border: 'none', borderRadius: 5, cursor: 'pointer' }}>Button</button>
        </div>
      </div>
    );
}

export default ChatContent;
