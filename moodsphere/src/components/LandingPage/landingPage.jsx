import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/login');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        MoodSphere
                    </Typography>
                    <Button color="inherit" onClick={handleGetStartedClick}>
                        Get Started
                    </Button>
                </Toolbar>
            </AppBar>
            <Container maxWidth="sm" style={{ marginTop: '50px' }}>
                <Typography variant="h4" align="center" sx={{ my: 4 }}>
                    Welcome to Your App
                </Typography>
                <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                    This is your landing page content.
                </Typography>
            </Container>
        </div>
    );
};

export default LandingPage;
