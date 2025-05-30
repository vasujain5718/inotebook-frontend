import './App.css';
import React, { useEffect, useState } from 'react';
import {
  Route,
  Routes,
  BrowserRouter as Router,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/notestate';
import UnoteState from './context/notes/unotestate';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
function App() {
  const [alert, setAlert] = useState({message : "", type : ""});
  const [showWakeMessage, setShowWakeMessage] = useState(true);
  useEffect(() => {
    // Show the message for 5 seconds on first load
    const timer = setTimeout(() => setShowWakeMessage(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const showAlert = (message, type) => {
    setAlert({ message: message, type: type });
    setTimeout(() => {
      setAlert({message : "", type : ""});  
    }, 1500);
  };
  if (showWakeMessage) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        fontSize: "1.5rem",
        background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)"
      }}>
        <div>
          <strong>Starting backend services...</strong>
          <div style={{marginTop: "10px", fontSize: "1rem", color: "#555"}}>
            Please wait a moment while we prepare your workspace.
          </div>
        </div>
      </div>
    );
  }
  return (
    <div style={{ background: "linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)", minHeight: "100vh" }}>
    <NoteState showAlert={showAlert}>
      <UnoteState showAlert={showAlert}>
    <Router>
    <Navbar showAlert={showAlert} />
    <div style={{"height" : "80px"}}>
      {alert.message!=="" && <Alert message={alert.message} type={alert.type} />}
      </div>
      <div className="container">
      <Routes>
      <Route path="/" element={<Home showAlert={showAlert}></Home>} />
      <Route path="/about" element={<About showAlert={showAlert}></About>} />
      <Route path="/login" element={<Login showAlert={showAlert}></Login>} />
      <Route path="/signup" element={<Signup showAlert={showAlert}></Signup>}/>

      </Routes>
    </div>
    </Router>
    </UnoteState>
    </NoteState>
    </div>
  );
}

export default App;
