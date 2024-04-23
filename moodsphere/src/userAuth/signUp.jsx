import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { Typography, Container, TextField, Button, Link, AppBar, Toolbar, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Bubble from '../components/LandingPage/homebubble'; 
import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');  // State for first name
    const [lastName, setLastName] = useState('');  // State for last name

    const onSubmit = async (e) => {
        e.preventDefault();
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                // Call the API to save the user's first name and last name
                axios.post('http://localhost:5000/save-user', {
                    user_id: user.uid,
                    first_name: firstName,
                    last_name: lastName,
                    email: user.email
                })
                .then(() => {
                    navigate("/login");
                })
                .catch((error) => {
                    console.error('Error saving user details:', error);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
            });
    };

    return (
        <>
            <AppBar position="static" sx={{ bgcolor: 'black' }}>
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
                    User Register
                </Typography>
                <form onSubmit={onSubmit} style={{ width: '100%', maxWidth: '400px', position: 'relative', zIndex: 1 }}>
                <TextField
                        type="text"
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
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
                        }}  // Style as necessary
                    />
                    <TextField
                        type="text"
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
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
                        }}  // Style as necessary
                    />
                    <TextField
                        type="email"
                        label="Email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
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
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                        variant="outlined"
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
                        Sign up
                    </Button>
                    <Typography variant="body1" align="center" sx={{ color: 'white', mt: 2 }}>
                        Already Have an account? <Link component={NavLink} to="/login" sx={{ color: 'red' }}>Login</Link>
                    </Typography>
                </form>
            </Container>
        </>
    );
};

export default Signup;
