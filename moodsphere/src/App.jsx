import React, {useState, useEffect} from 'react';
import HomePage from './components/homePage/homePage.jsx';
import Signup from './userAuth/signUp.jsx';
import Login from './userAuth/login.jsx';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage/landingPage.jsx';
function App() {

  return (
    <Router>                         
            <Routes>
              <Route path="/" element={<LandingPage/>}/>
               <Route path="/signup" element={<Signup/>}/>
               <Route path="/login" element={<Login/>}/>
               <Route path="/home" element={<HomePage/>}/>
            </Routes>
    </Router>
  );
}
 
export default App;