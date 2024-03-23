import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';



const LandingPage = () => {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/login');
     

    };
  
    return (
        <>
        <div>
            Landing page
        </div>
        </>
    );
};

export default LandingPage;
