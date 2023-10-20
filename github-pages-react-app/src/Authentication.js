import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { auth, database } from './firebaseSetup';

function Authentication({ setIsAuthenticated }) {
    const [isRegistering, setIsRegistering] = useState(true);
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const handleRegister = async () => {
        if (username && registerEmail && registerPassword) {
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
                const user = userCredential.user;
                set(ref(database, 'users/' + user.uid), {
                    username: username,
                    email: registerEmail
                });
                setIsAuthenticated(true);
                navigate("/banking");
            } catch (error) {
                alert("Error registering user: " + error.message);
            }
        } else {
            alert("Please fill in all registration fields.");
        }
    };

    const handleLogin = async () => {
        if (registerEmail && registerPassword) {
            try {
                await signInWithEmailAndPassword(auth, registerEmail, registerPassword);
                setIsAuthenticated(true);
                navigate("/banking");
            } catch (error) {
                alert("Error logging in: " + error.message);
            }
        } else {
            alert("Please fill in all login fields.");
        }
    };

    return (
        <div>
            <div>
                <button onClick={() => setIsRegistering(true)}>Register</button>
                <button onClick={() => setIsRegistering(false)}>Login</button>
            </div>
            {isRegistering ? (
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
                    <input 
                        type="text" 
                        placeholder="Choose a username" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                    />
                    <button onClick={handleRegister}>Register</button>
                </div>
            ) : (
                <div>
                    <input 
                        type="text"
                        placeholder="Enter Email for Login"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                    />
                    <input 
                        type="password"
                        placeholder="Enter Password for Login"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                    />
                    <button onClick={handleLogin}>Login</button>
                </div>
            )}
        </div>
    );
}

export default Authentication;
