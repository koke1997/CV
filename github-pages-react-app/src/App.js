import React, { useState, useEffect } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getDatabase, ref, onValue, push, set } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import Cookies from 'js-cookie';
import DOMPurify from 'dompurify';



//security


const firebaseConfig = {
    apiKey: "AIzaSyAPTmwqiqC5lTKD4j4LqY7fWj15zMXiTfs",
    authDomain: "quickstart-1574936872651.firebaseapp.com",
    databaseURL: "https://quickstart-1574936872651-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "quickstart-1574936872651",
    storageBucket: "quickstart-1574936872651.appspot.com",
    messagingSenderId: "114721513330",
    appId: "1:114721513330:web:6c89ea1cba46e2319dc7eb",
    measurementId: "G-LN24KTP8EW"
};

// Initialize Firebase if not already initialized
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const database = getDatabase();
const auth = getAuth();

function App() {
  const [username, setUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isEmailSet, setIsEmailSet] = useState(false); // New state variable
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const savedUsername = Cookies.get('username');
    if (savedUsername) {
      setUsername(savedUsername);
      setIsRegistered(true);
    }

    const messagesRef = ref(database, 'messages');
    onValue(messagesRef, (snapshot) => {
      const newMessages = [];
      snapshot.forEach((child) => {
        newMessages.push(child.val());
      });
      setMessages(newMessages);
    });
  }, [database]);

  const handleRegister = async () => {
    try {
      if (username && registerEmail && registerPassword) { // Ensure all fields are filled
        const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
        const user = userCredential.user;

        // Store the username in Firebase Realtime Database
        set(ref(database, 'users/' + user.uid), {
          username: username,
          email: registerEmail
        });

        // Set the user as registered and email as set
        setIsRegistered(true);
        setIsEmailSet(true);
      } else {
        console.error("Please fill in all registration fields.");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  // Removed handleSaveProfile function since we want only registered users

  const handleSendMessage = () => {
    const sanitizedMessage = DOMPurify.sanitize(message);
    const messagesRef = ref(database, 'messages');
    push(messagesRef, {
      user: username,
      text: sanitizedMessage,
      timestamp: Date.now()  // Using JavaScript's Date.now() for simplicity
    });
    setMessage('');
  };

  return (
    <div className="App">
      {isEmailSet && isRegistered ? (
        <div>
          <h2>Welcome, {username}!</h2>
          <div>
            {messages.map((msg, index) => (
              <p key={index}><strong>{msg.user}</strong>: {msg.text}</p>
            ))}
          </div>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      ) : (
        <div>
          <div>
            <input 
              type="text"
              placeholder="Enter Email for Registration"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
            />
            <input 
              type="password"
              placeholder="Enter Password for Registration"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
          </div>
          <div>
            <input 
              type="text" 
              placeholder="Choose a username (will be saved after registration)" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
