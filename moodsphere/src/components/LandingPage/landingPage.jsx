import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const handleFileUpload = (event) => {
    const file = event.target.files[0];
    // Process the uploaded file here
    console.log('Uploaded file:', file);
};

const LandingPage = () => {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/login');
     

    };
  
    return (


        <div style={{backgroundColor: 'black', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
          {/* <AppBar>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        MoodSphere
                    </Typography>
                    <Button color="inherit" onClick={handleGetStartedClick}>
                        Get Started
                    </Button>
                </Toolbar>
    </AppBar>*/}

           <div>
            <div style={{ backgroundColor: 'black', position: 'fixed', top: 0, left: 0, height: '100vh', width: '200px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <ul style={{ color: 'white', listStyle: 'none', padding: 0 }}>
                    <li>Home</li>
                    <li>About</li>
                    <li>Contact</li>
                    {/* Add more sidebar items as needed */}
                </ul>
            </div>
            </div>

            {/* Image in the center */}
            <div style={{ position: 'absolute', top: '300px', left: '50%', transform: 'translate(-50%, -50%)' }}>
                <img src="https://private-user-images.githubusercontent.com/66735328/303958941-c1416a24-87cf-4128-898f-0323aa0572cf.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTExNDA3MzgsIm5iZiI6MTcxMTE0MDQzOCwicGF0aCI6Ii82NjczNTMyOC8zMDM5NTg5NDEtYzE0MTZhMjQtODdjZi00MTI4LTg5OGYtMDMyM2FhMDU3MmNmLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAzMjIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMzIyVDIwNDcxOFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWIxNDJkMzJlNDU5YzVlOWMwMzQ5Mjg1MmVlNWM1YTIxMjNjMDZmZjE3YWNlMjQ4OTM5ZTA4ODFkZTlmNmI0ZTgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.ZHQyE66_TljrgtFzPQzVOikbufZnvyi0LWsQfYlQxvk" alt="Your Image" style={{ width: '150px', height: '150px' }} />
            </div>

            <Container maxWidth="sm" style={{ marginTop: '50px', color:'white' }}>
                <Typography variant="h4" align="center" sx={{ my: 4 }}>
                    Welcome to Your App
                </Typography>
                <Typography variant="body1" align="center" sx={{ mb: 4 }}>
                    This is your landing page content.
                </Typography>
               

                {/* Upload Button */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleFileUpload}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span" style={{ backgroundColor: 'red', color: 'white',padding: '12px 24px', fontSize: '1.2rem', borderRadius: '10px' }}>
                        Upload your Image
                    </Button>
                </label>
                </div>
               
            </Container>
        </div>
    );
};

export default LandingPage;
