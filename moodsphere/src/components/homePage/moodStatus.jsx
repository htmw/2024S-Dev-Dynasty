import React, { useRef, useState } from 'react';
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography, AppBar, Toolbar, CssBaseline, Link, Divider, useTheme, IconButton, Avatar, Menu, MenuItem, TextField, InputAdornment } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Modal, Fade, Paper } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { useNavigate } from 'react-router-dom';
import Bubble from '../LandingPage/homebubble';
import RecommendedSongs from './recommendedSongs';
import { logout } from '../../userAuth/firebase';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
const MoodStatus = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [mood, setMood] = useState(null);
    const [predictedSongs, setPredictedSongs] = useState([]);
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null);
    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            setUploadedImage(URL.createObjectURL(file));
            setImage(formData); // formData is ready for the fetch call.
            handleCloseModal();
        } else {
            setUploadedImage(null);
            setImage(null);
        }
    };
    const handleImageRemove = () => {
        setUploadedImage(null);
        //fileInputRef.current.value = null;
        setImage(null);
        setPredictedSongs(null);
        setMood(null);
    };
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };
    const userLogOut = () => {
        logout();
        navigate('/');
    }

    const predictSongs = async () => {
        console.log(uploadedImage)
        if (!image) {
            console.error('Please upload an image first.');
            return;
        }

        try {
            console.log("image->>", image)
            const response = await fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                body: image,
            });

            if (!response.ok) {
                throw new Error('Failed to predict emotion');
            }

            const data = await response.json();
            console.log('Prediction:', data.prediction);
            console.log('Recommended Songs:', data.recommended_songs);

            setMood(data.prediction);
            setPredictedSongs(data.recommended_songs);
        } catch (err) {
            console.error('Error predicting songs:', err.message);
        }
    };

    // AppBar styles
    const appBarStyle = {
        backgroundColor: '#121212', // Dark background
        color: '#b71c1c', // Red accent text
        boxShadow: '0 2px 4px -1px rgba(183, 28, 28, 0.2), 0 4px 5px 0 rgba(183, 28, 28, 0.14), 0 1px 10px 0 rgba(183, 28, 28, 0.12)', // Red-toned shadow for depth
    };

    const menuItems = [
        { text: 'Home', icon: <HomeIcon />, onClick: () => navigate('/home') },
        { text: 'Library', icon: <LibraryMusicIcon />, onClick: () => navigate('/library') },
        { text: 'Profile', icon: <AccountCircleIcon />, onClick: () => navigate('/profile') },
    ];

    return (
        <> <div style= {{overflowX:'hidden', overflowY:'hidden'}}>
            <AppBar position="static" sx={appBarStyle}>
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        onClick={handleMenu}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={userLogOut}>Logout</MenuItem>
                    </Menu>
                    <Typography variant="h6" sx={{ flexGrow: 1, color: '#b71c1c' }}>
                        MoodSphere
                    </Typography>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <Avatar sx={{ bgcolor: '#b71c1c' }} />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div style={{ display: 'flex', height: '91.1vh', backgroundColor: '#121212' }}>
                <CssBaseline />
                <Box
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        bgcolor: 'black',
                        display: 'flex',
                        flexDirection: 'column',
                        color: 'white',
                        overflowX: 'hidden',
                        borderRight: '1px solid #b71c1c',
                    }}>
                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openModal}
                        onClose={handleCloseModal}
                        closeAfterTransition>
                        <Fade in={openModal}>
                            <Paper elevation={3} sx={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                transform: 'translate(-50%, -50%)',
                                width: 300,
                                bgcolor: '#121212', // Black background
                                color: '#b71c1c', // Red text
                                boxShadow: 24,
                                p: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                gap: 2
                            }}>
                                <Typography variant="h6" component="h2" sx={{ color: 'white' }}>
                                    Upload Your Image
                                </Typography>
                                <Button
                                    startIcon={<CameraAltIcon sx={{ color: '#b71c1c' }} />}
                                    sx={{ color: 'white' }}
                                >
                                    Camera
                                </Button>
                                <><input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileUpload}
                                />
                                </>
                                <Button
                                    startIcon={<InsertDriveFileIcon sx={{ color: '#b71c1c' }} />}
                                    onClick={() => fileInputRef.current.click()}
                                    sx={{ color: 'white' }}
                                >
                                    Browse Files
                                </Button>
                            </Paper>
                        </Fade>
                    </Modal>
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem button key={index} onClick={item.onClick} sx={{ '&:hover': { bgcolor: '#757575' } }}>
                                <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                    <Box mt="auto" py={2}>
                        <Divider sx={{ bgcolor: 'gray' }} />
                        <List dense>
                            <ListItem sx={{ py: 1, px: 2 }}>
                                <Link href="#" color="inherit" underline="hover">
                                    Legal
                                </Link>
                            </ListItem>
                        </List>
                        <Box px={2} py={1}>
                            <Link href="#" color="inherit" underline="hover">
                                Privacy Policy
                            </Link>
                        </Box>
                    </Box>
                </Box>
                <Box sx={{ position: 'relative', width: '100%' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            position: 'relative', // Adjusted to be part of the dynamic content
                            top: 0,
                            left: 0,
                            zIndex: 2,
                            backgroundColor: 'black', // Dark background
                        }}
                    >
                        <Button
                            startIcon={<CameraAltIcon />}
                            onClick={handleOpenModal}
                            sx={{ backgroundColor: '#b71c1c', color: 'white', marginRight: '10px', marginTop: '20px' , zIndex: 3}}
                        >
                            Upload Your Image
                        </Button>
                        <Button
                            startIcon={<EmojiEmotionsIcon />}
                            onClick={predictSongs}
                            sx={{ backgroundColor: '#b71c1c', color: 'white', marginTop: '20px', zIndex: 3 }}
                        >
                            Predict
                        </Button>
                    </Box>
                    <Bubble style={{ position: 'absolute', zIndex: 0 }} />
                    <Box
                        component="main"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'flex-start', // Changed to flex-start to align items from the top
                            height: '100%',
                            color: 'white',
                            // paddingTop: '100px', // Increased padding to account for buttons
                        }}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileUpload}
                        />
                        {uploadedImage && (
                            <div style={{ width: '100%', textAlign: 'center', zIndex: '2', paddingTop: '20px' }}>
                                <img
                                    style={{
                                    width: '250px', // Adjust based on your needs, ensuring it's square for a perfect circle
                                    height: '250px', // Match width for square aspect ratio
                                    objectFit: 'cover', // This will ensure the image covers the area, useful for non-square images
                                    borderRadius: '50%', // This makes the image round
                                    border: '1px solid white', // Optional: adds a white border around the circle
                                    padding: '4px', // Optional: adds space between the image content and the border
                                }}
                                    src={uploadedImage}
                                    alt="Uploaded"
                                    
                                />
                                <Button
                                    onClick={handleImageRemove}
                                    sx={{
                                        position: 'relative',
                                        color: 'red',
                                        zIndex: 3,
                                    }}
                                >
                                    <RemoveCircleIcon />
                                </Button>
                            </div>
                        )}
                        {uploadedImage && mood && (
                            <Box sx={{ width: '100%', textAlign: 'center', marginTop: '20px', zIndex: '2' }}> {/* Encapsulated in a Box for better control */}
                                <Typography variant="h5">
                                    Mood: {mood}
                                </Typography>
                            </Box>
                        )}
                        {/* Recommended songs display */}
                        {uploadedImage && predictedSongs && predictedSongs.length > 0 && (
                            <Box sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                overflow: 'hidden',
                                width: '1200px', // Adjust the width as necessary
                                maxHeight: '250px', // Adjust the height as necessary
                                border: '1px solid red',
                                overflowY: 'hidden',
                                '&:hover': {
                                    overflowY: 'auto',
                                },
                                zIndex: '2',
                                paddingTop: '20px',
                                marginTop: '20px',
                            }}>
                                <Box sx={{
                                    width: '100%',
                                    overflowX: 'auto',
                                    '&::-webkit-scrollbar': {
                                        height: '2px',
                                        backgroundColor: '#b71c1c',
                                    },
                                    '&::-webkit-scrollbar-thumb': {
                                        background: 'red',
                                        borderRadius: '3px',
                                    }
                                }}>
                                    <RecommendedSongs recommendedSongs={predictedSongs} />
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
            </div>
        </div>
        </>
    );
};

export default MoodStatus;