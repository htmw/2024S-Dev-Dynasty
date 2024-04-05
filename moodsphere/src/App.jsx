import React from 'react';
import HomePage from './components/homePage/homePage.jsx';
import Artist from './components/homePage/artist.jsx';
import Signup from './userAuth/signUp.jsx';
import Login from './userAuth/login.jsx';
import LandingPage from './components/LandingPage/landingPage.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './userAuth/firebase.js';
import { AuthProvider } from './userAuth/AuthProvider'
import { useAuthState } from "react-firebase-hooks/auth";
import MoodStatus from './components/homePage/moodStatus.jsx';
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
            <>
              <Route path="/home" element={<HomePage/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/artist" element={<Artist/>}/>
              <Route path="/status" element={<MoodStatus/>}/>
            </>
          ): (
            <Route path="*" element={<div style="color:white"> Not Found or You do not have permission.</div>} />
          )}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
