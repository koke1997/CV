// MessageItem.js
import React from 'react';

function MessageItem({ message }) {
    return (
        <p><strong>{message.user}</strong>: {message.text}</p>
    );
}

export default MessageItem;
