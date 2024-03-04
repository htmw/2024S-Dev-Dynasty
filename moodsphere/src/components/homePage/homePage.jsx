import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigateTo = useNavigate();

    return (
        <div>
            <AppBar>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Welcome to Moodsphere
                    </Typography>
                    <Button color="inherit">Lets Start</Button>
                </Toolbar>
            </AppBar>
            <Container>
                <Typography variant="h4" align="center" sx={{ my: 4 }}>
                    Sample moodsphere home page
                </Typography>
                <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                    sample home screen design.
                </Typography>
                <Button variant="contained" color="primary" fullWidth>
                    Get Started
                </Button>
            </Container>
        </div>
    );
};

export default HomePage;
