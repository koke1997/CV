import React from 'react';

function MessageList(props) {
  return (
    <div>
      {props.messages && props.messages.map((message, index) => (
        <div key={index}>
          <strong>{message.username}</strong>: {message.text}
        </div>
      ))}
    </div>
  );
}

// Setting default props for the component
MessageList.defaultProps = {
  messages: []
};

export default MessageList;
