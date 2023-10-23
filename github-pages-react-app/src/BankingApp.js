import React, { useState } from 'react';
import Chatbox from './Chatbox';
import MessageList from './MessageList';

function BankingApp() {
    const [balance, setBalance] = useState(0);
    const [showChat, setShowChat] = useState(false);

    const handleDeposit = (amount) => {
        setBalance(prevBalance => prevBalance + amount);
    };

    const handleWithdraw = (amount) => {
        if (balance >= amount) {
            setBalance(prevBalance => prevBalance - amount);
        } else {
            alert("Insufficient funds!");
        }
    };

    return (
        <div>
            <h2>Banking Dashboard</h2>
            <div className="dashboard">
                <div onClick={() => alert(`Current balance: $${balance}`)}>
                    <img src="./animation_lo38vzuw.json" alt="View Balance" />
                    <p>Balance</p>
                </div>
                <div onClick={() => handleDeposit(10)}>
                    <img src="./animation_lo39f3vc.json" alt="Deposit" />
                    <p>Deposit</p>
                </div>
                <div onClick={() => handleWithdraw(10)}>
                    <img src="./animation_lo39gzt4.json" alt="Withdraw" />
                    <p>Withdraw</p>
                </div>
                <div onClick={() => setShowChat(true)}>
                    <img src="./animation_lo39ib1e.json" alt="Chat" />
                    <p>Chat</p>
                </div>
            </div>
            {showChat && (
                <>
                    <MessageList />
                    <Chatbox />
                    <button onClick={() => setShowChat(false)}>Close Chat</button>
                </>
            )}
        </div>
    );
}

export default BankingApp;
