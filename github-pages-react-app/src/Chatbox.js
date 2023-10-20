// Chatbox.js
import React from 'react';
import { ref, push } from 'firebase/database';
import DOMPurify from 'dompurify';

import { database } from './firebaseSetup';

function Chatbox({ username, message, setMessage }) {
    const handleSendMessage = () => {
        const sanitizedMessage = DOMPurify.sanitize(message);
        const messagesRef = ref(database, 'messages');
        push(messagesRef, {
            user: username,
            text: sanitizedMessage,
            timestamp: Date.now()
        });
        setMessage('');
    };

    return (
        <div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    );
}

export default Chatbox;
