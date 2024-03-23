import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Bubble from './bubble';

const LandingPage = () => {
  const navigate = useNavigate();
  const handleGetStartedClick = () => {
    navigate('/login');
  };

  return (
    <>
      <CssBaseline />
      <div style={{ backgroundColor: 'black', color: 'white', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <AppBar position="fixed" style={{ backgroundColor: 'black' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'red' }}>
              Mood Sphere
            </Typography>
            <Button color="inherit" onClick={handleGetStartedClick}>
              Get Started
            </Button>
          </Toolbar>
        </AppBar>
        <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
          <Bubble />
          <Container
            style={{
              paddingTop: '560px',
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <Typography variant="h2" sx={{ marginBottom: '50px' }}>
              Discover Your Music
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '50px' }}>
              Get Songs based on your emotions in Realtime.
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
              <Button variant="contained" color="error" size="small" onClick={handleGetStartedClick} style={{ minWidth: '150px' }}>
                Get Started
              </Button>
              <Button variant="contained" color="error" size="small" onClick={handleGetStartedClick} style={{ minWidth: '150px' }}>
                Login With Google
              </Button>
              <Button variant="contained" color="error" size="small" onClick={handleGetStartedClick} style={{ minWidth: '150px' }}>
                Login With Email
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default LandingPage;