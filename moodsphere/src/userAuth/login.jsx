import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { Typography, Container, TextField, Button, Link, AppBar, Toolbar, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Bubble from '../components/LandingPage/homebubble';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from './AuthProvider';
const Login = () => {
    const { loginAsGuest } = useAuth();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate("/home");
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                // Check if the error code is related to user not found or not signed up
                if (errorCode === 'auth/user-not-found') {
                    toast.error("Invalid Credentials", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                } else {
                    // Handle other kinds of errors here
                    toast.error("Invalid Credentials", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            });
    };
    const handleGuestLogin = () => {
        loginAsGuest();
        navigate("/status"); // Navigate to mood status page
    };
    return (
        <>
            <AppBar sx={{ bgcolor: 'black' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
                        Moodsphere
                    </Typography>
                    <IconButton edge="start" color="inherit" aria-label="back" onClick={() => navigate(-1)}>
                        <ArrowBackIcon /> Back
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container sx={{ position: 'relative', height: 'calc(100vh - 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', zIndex: 0 }}>
                <Bubble style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 0 }} />
                <Typography variant="h3" align="center" gutterBottom sx={{ zIndex: 1, color: 'white' }}>
                    User Login
                </Typography>
                <form onSubmit={onLogin} style={{ width: '100%', maxWidth: '400px', position: 'relative', zIndex: 1 }}>
                    <TextField
                        id="email-address"
                        name="email"
                        type="email"
                        label="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        color="error"
                        InputLabelProps={{
                            style: { color: 'red', fontWeight: 'bold' }
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'red',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#CC0000',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#CC0000', 
                                },
                                '& input': {
                                    color: 'white', 
                                    backgroundColor: 'black', 
                                    '&:-webkit-autofill': {
                                        backgroundColor: 'black !important', 
                                    },
                                },
                                '& input::placeholder': {
                                    color: 'white', 
                                },
                                '& input:-ms-input-placeholder': {
                                    color: 'white', 
                                },
                            },
                        }}
                    />
                    <TextField
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        color="error"
                        InputLabelProps={{
                            style: { color: 'red', fontWeight: 'bold' }
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'red',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#CC0000',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#CC0000', 
                                },
                                '& input': {
                                    color: 'white', 
                                    backgroundColor: 'black', 
                                    '&:-webkit-autofill': {
                                        backgroundColor: 'black !important', 
                                    },
                                },
                                '& input::placeholder': {
                                    color: 'white', 
                                },
                                '& input:-ms-input-placeholder': {
                                    color: 'white', 
                                },
                            },
                        }}
                    />
                    <Button type="submit" variant="contained" color="error" fullWidth sx={{ mt: 2 }}>
                        Login
                    </Button>
                    <Button onClick={handleGuestLogin} variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Join as Guest
                    </Button>
                    <Typography variant="body1" align="center" sx={{ color: 'white', mt: 2 }}>
                        Don't have an account? <Link component={NavLink} to="/signup" sx={{ color: 'red' }}>Sign up</Link>
                    </Typography>
                </form>
            </Container>
            <ToastContainer position="top-center" autoClose={2000} />
        </>
    );
};

export default Login;
