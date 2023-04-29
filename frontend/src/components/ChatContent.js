import axios from 'axios';
import React, { useState } from 'react';
import Message from './Message';

function ChatContent() {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      axios.post('/chat', {"messgae": e.target[0]}).then(
        (res) => {
          if (res.data.success == true) {
            setMessage(res.data);
          } else {
            console.error(error);
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
              <Message text={"Hi, how's it going?"} type={"sender"} />
              <Message text={"Not too bad, you?"} type={"not sender"} />
              <Message text={"I'm doing pretty well. Thanks for asking.Sure thing. Module 2 is about blah blah blah blah blah blah blah blah blah. It discusses about blah blah  Finally, it concludes by explaining what blah blah blah is."} type={"sender"} />
              <Message text={"I'm doing pretty well. Thanks for asking.Sure thing. Module 2 is about blah blah blah blah blah blah blah blah blah. It discusses about blah blah  Finally, it concludes by explaining what blah blah blah is."} type={"sender"} />
              <Message text={"I'm doing pretty well. Thanks for asking.Sure thing. Module 2 is about blah blah blah blah blah blah blah blah blah. It discusses about blah blah  Finally, it concludes by explaining what blah blah blah is."} type={"sender"} />
              <Message text={"I'm doing pretty well. Thanks for asking.Sure thing. Module 2 is about blah blah blah blah blah blah blah blah blah. It discusses about blah blah  Finally, it concludes by explaining what blah blah blah is."} type={"sender"} />

              <Message text={"I'm doing pretty well. Thanks for asking.Sure thing. Module 2 is about blah blah blah blah blah blah blah blah blah. It discusses about blah blah  Finally, it concludes by explaining what blah blah blah is."} type={"sender"} />
              <Message text={"I have some more questions about this. Can we discuss it tomorrow?"} type={"sender"} />
              <Message text={"Sure, let's set up a meeting tomorrow."} type={"not sender"} />
              <Message text={"Great. What time works for you?"} type={"sender"} />
              <Message text={"How about 10am?"} type={"not sender"} />
              <Message text={"Sounds good. See you then!"} type={"sender"} />
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
