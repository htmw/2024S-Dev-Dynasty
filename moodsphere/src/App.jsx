import React from 'react';
import HomePage from './components/homePage/homePage.jsx';
import Signup from './userAuth/signUp.jsx';
import Login from './userAuth/login.jsx';
import LandingPage from './components/LandingPage/landingPage.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './userAuth/firebase.js';
import { AuthProvider } from './userAuth/AuthProvider'
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>                         
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          {user ? (
            <Route path="/home" element={<HomePage/>}/>
          ) : (
            <Route path="*" element={<div> Not Found or You do not have permission.</div>} />
          )}
          <Route path="/signup" element={<Signup/>}/>
          <Route path="/login" element={<Login/>}/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
