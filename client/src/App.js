import './App.css';
import NavBar from './components/NavBar';
import Home from './components/Home'
import About from './components/About'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import NoteState from './context/notes/NoteState'
import Login from './components/Login';
import SignUp from './components/SignUp';
import Alert from './components/Alert';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    setAlert({ message, type })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }
  return (
    <>
      <NoteState>
        <Router>
          <NavBar />
          <Alert alert={alert} />
          <Routes>
            <Route exact path='/' element={localStorage.getItem('token') ? <Home showAlert={showAlert} /> : <Login />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/login' element={<Login showAlert={showAlert} />} />
            <Route exact path='/signup' element={<SignUp showAlert={showAlert} />} />
          </Routes>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
