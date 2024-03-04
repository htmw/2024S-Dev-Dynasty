import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import { Typography, Container, TextField, Button, Link, AppBar, Toolbar, IconButton } from '@mui/material';

const Login = () => {
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
            });
    };

    return (
        <>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Moodsphere
                    </Typography>
                    <Button edge="start" color="inherit" aria-label="back" onClick={() => navigate(-1)}>
                      Back
                    </Button>
                </Toolbar>
            </AppBar>
            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: 'calc(100vh - 64px)' }}>
                <Typography variant="h3" align="center" gutterBottom>
                    Moodsphere
                </Typography>
                <form onSubmit={onLogin} style={{ width: '100%', maxWidth: '400px' }}>
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
                        color="primary"
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
                        color="primary"
                    />
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Login
                    </Button>
                </form>
                <Typography variant="body1" align="center" gutterBottom>
                    No account yet? <Link component={NavLink} to="/signup">Sign up</Link>
                </Typography>
            </Container>
        </>
    );
};

export default Login;
