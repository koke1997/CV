import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import BankingApp from './BankingApp';
import Authentication from './Authentication';
import Chatbox from './Chatbox';
import MessageList from './MessageList';

function MainApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
      if (isAuthenticated) {
          navigate("/banking");
      }
  }, [isAuthenticated, navigate]);

  return (
      <>
          <Routes>
              <Route path="/" element={!isAuthenticated ? <Authentication setIsAuthenticated={setIsAuthenticated} /> : null} />
              <Route path="/banking" element={
                  <>
                      <BankingApp />
                      <MessageList />
                      <Chatbox />
                      <button onClick={() => setIsAuthenticated(false)}>Log Out</button>
                  </>
              } />
          </Routes>
      </>
  );
}

function App() {
  return (
      <Router basename={process.env.PUBLIC_URL}>
          <MainApp />
      </Router>
  );
}

export default App;
