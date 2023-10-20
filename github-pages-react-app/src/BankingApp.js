// BankingApp.js
import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import Cookies from 'js-cookie';
import LottieLoader from './LottieLoader';
import Authentication from './Authentication';
import Chatbox from './Chatbox';
import MessageList from './MessageList';

const database = getDatabase();

function BankingApp() {
    const [username, setUsername] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [hasProfile, setHasProfile] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isEmailSet, setIsEmailSet] = useState(false);

    // ... Your useEffect and other logic ...

    return (
        <div>
            <LottieLoader />
            {isEmailSet && isRegistered ? (
                <div>
                    <h2>Welcome, {username}!</h2>
                    <MessageList messages={messages} />
                    <Chatbox username={username} message={message} setMessage={setMessage} />
                </div>
            ) : (
                <Authentication 
                    setUsername={setUsername} 
                    setIsRegistered={setIsRegistered} 
                    setIsEmailSet={setIsEmailSet} 
                    registerEmail={registerEmail} 
                    setRegisterEmail={setRegisterEmail} 
                    registerPassword={registerPassword} 
                    setRegisterPassword={setRegisterPassword} 
                    username={username}
                />
            )}
        </div>
    );
}

export default BankingApp;
