import React, { useState } from 'react';
import Message from './Message';
import MessageForm from './MessageForm';

function ChatContent() {
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('Message sent:', message);
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

        <MessageForm />

        </div>

      </div>
    );
}

export default ChatContent;
