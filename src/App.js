import './App.css';
import React, {  useState } from 'react';
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
  

  const showAlert = (message, type,auto =true) => {
    setAlert({ message: message, type: type });
    if(auto){setTimeout(() => {
      setAlert({message : "", type : ""});  
    }, 1500);}
  };
  
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
