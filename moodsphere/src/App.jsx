import React from 'react';
import HomePage from './components/homePage/homePage';
import Artist from './components/homePage/artist';
import Signup from './userAuth/signUp';
import Login from './userAuth/login';
import LandingPage from './components/LandingPage/landingPage';
import NotFound from './userAuth/notFound'; // Assuming NotFound is placed in the components folder
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './userAuth/firebase';
import { AuthProvider } from './userAuth/AuthProvider';
import { useAuthState } from "react-firebase-hooks/auth";
import MoodStatus from './components/homePage/moodStatus';
import Playlist from './components/playlists/playlist';
import Profile from './components/Profile/Profile';
import { ToastContainer } from 'react-toastify';
import Library from './components/library/library';
import Genre from './components/homePage/genre';

function App() {
  const [user, loading] = useAuthState(auth);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <ToastContainer />
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={user ? <Navigate replace to="/home" /> : <Signup />} />
          <Route path="/login" element={user ? <Navigate replace to="/home" /> : <Login />} />
          <Route path="/home" element={user ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/artist" element={user ? <Artist /> : <Navigate to="/login" />} />
          <Route path="/genre" element={user ? <Genre /> : <Navigate to="/login" />} />
          <Route path="/playlists" element={user ? <Playlist /> : <Navigate to="/login" />} />
          <Route path="/library" element={user ? <Library /> : <Navigate to="/login" />} />
          <Route path="/status" element={<MoodStatus />} />  // Accessible without login
          <Route path="*" element={<NotFound />} />
        </Routes>    
      </Router>
    </AuthProvider>
    </div>
  );
}

export default App;
