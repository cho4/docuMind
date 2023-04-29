function EachChat(props) {
    
    const onChatClick = () => {
        props.callback(["got the chat"])
    }
    return (
      <div onClick={onChatClick} style={{ height: 100, backgroundColor: 'white', margin: 10, borderRadius: 5 }}>
        {/* Content for each chat goes here */}
      </div>
    );
  }

export default EachChat