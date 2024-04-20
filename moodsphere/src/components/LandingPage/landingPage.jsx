import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Bubble from './bubble';
import { signInWithGoogle } from '../../userAuth/firebase';
import GoogleIcon from '@mui/icons-material/Google';
import EmailIcon from '@mui/icons-material/Email';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useAuth } from '../../userAuth/AuthProvider';
import PersonIcon from '@mui/icons-material/Person'; 

const LandingPage = () => {
  const navigate = useNavigate();
  const { loginAsGuest } = useAuth();

  const handleGetStartedClick = () => {
    navigate('/signup');
  };

  const googlePopup = () => { 
    signInWithGoogle().then((result) => {
      console.log(result);
      navigate('/home');
    }).catch((error) => {
      console.log(error);
    });
  };

  const loginWithEmail = () => {
    navigate('/login');
  };
const guestLogin = () => {
    loginAsGuest();  // Set the user as a guest
    navigate('/status');  // Navigate to a specific page allowed for guests
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
              paddingTop: '560px', // Ensure paddingTop value is not quoted
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
                <PlayArrowIcon /> Get Started
              </Button>
              <Button variant="contained" color="error" size="small" onClick={googlePopup} style={{ minWidth: '150px' }}>
                <GoogleIcon sx={{ marginRight: '10px' }} /> Login/Sign Up With Google
              </Button>
              <Button variant="contained" color="error" size="small" onClick={loginWithEmail} style={{ minWidth: '150px' }}>
                <EmailIcon sx={{ marginRight: '10px' }} /> Login With Email
              </Button>
              <Button variant="contained" color="error" size="small" onClick={guestLogin} style={{ minWidth: '150px' }}>
                <PersonIcon sx={{ marginRight: '10px' }} /> Login as Guest
              </Button>
            </div>
          </Container>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
