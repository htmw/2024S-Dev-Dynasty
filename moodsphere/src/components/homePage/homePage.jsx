import React from 'react';
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography,AppBar,Toolbar, CssBaseline, Link, Divider,useTheme,IconButton,Avatar, Menu, MenuItem, TextField, InputAdornment } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import MoodIcon from '@mui/icons-material/Mood';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Bubble from '../LandingPage/homebubble';
import { logout } from '../../userAuth/firebase';

const HomePage = () => {
    const navigate = useNavigate();
    
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    }
    // AppBar styles
    const appBarStyle = {
        backgroundColor: '#121212', // Dark background
        color: '#b71c1c', // Red accent text
        boxShadow: '0 2px 4px -1px rgba(183, 28, 28, 0.2), 0 4px 5px 0 rgba(183, 28, 28, 0.14), 0 1px 10px 0 rgba(183, 28, 28, 0.12)', // Red-toned shadow for depth
    };

    // Typography styles
    const typographyStyle = {
        flexGrow: 1,
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 500,
        letterSpacing: '0.05rem',
        color: '#b71c1c'
    };

    const menuItems = [
        { text: 'Home', icon: <HomeIcon />, onClick: () => navigate('/') },
        { text: 'Search', icon: <SearchIcon />, onClick: () => navigate('/search') },
        { text: 'Library', icon: <LibraryMusicIcon />, onClick: () => navigate('/library') },
        { text: 'Profile', icon: <AccountCircleIcon />, onClick: () => navigate('/profile') },
    ];

    const actionItems = [
        { text: 'Find Artist By Genre', icon: <LibraryMusicIcon />, onClick: () => navigate('/genre') },
        { text: 'Find Artist By Artist', icon: <PersonSearchIcon />, onClick: () => navigate('/artist') },
        { text: 'Find Music By Mood', icon: <MoodIcon />, onClick: () => navigate('/mood') },
        { text: 'Mood Status', icon: <EmojiEmotionsIcon />, onClick: () => navigate('/status') },
    ];

    return (       
        <>
        
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
                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>

                    <Typography variant="h6" sx={{ flexGrow: 1, color: '#b71c1c' }}>
                        MoodSphere
                    </Typography>
                    
                    <TextField
                      variant="outlined"
                      placeholder="Search…"
                      size="small"
                      sx={{ bgcolor: 'white', borderRadius: '20px' }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                    />

                    {/* <Button color="inherit" onClick={() => navigate(-1)}>
                        Back
                    </Button> */}

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
                }}
            >
                
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
                        {/* ...additional list items... */}
                    </List>
                    <Box px={2} py={1}>
                        <Link href="#" color="inherit" underline="hover">
                            Privacy Policy
                        </Link>
                    </Box>
                    {/* Add more links or information as needed */}
                </Box>
            </Box>
              
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
        color: 'white',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'darken',
        // Increase the last number in rgba for higher opacity
        backgroundColor: 'rgba(0, 0, 0, 0.99)', // Dark semi-transparent overlay
        position: 'relative', // Required for the pseudo-element to position correctly
        '::before': { // Pseudo-element for the background image
            content: '""',
            position: 'relative',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.2, // Lower this for a more faded background image
            zIndex: -1, // Place it behind the content
        },  
                }}
            >
                 <Bubble style={{ position: 'absolute', zIndex: 0 }} />
                <Typography variant="h4" align="center" gutterBottom>Welcome to MoodSphere</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, marginTop: 15.9 }}>
                    {actionItems.map((item, index) => (
                        <Button
                            key={index}
                            startIcon={item.icon}
                            onClick={item.onClick}
                            sx={{
                                backgroundColor: '#b71c1c',
                                '&:hover': { backgroundColor: '#f44336' },
                                color: 'white',
                                padding: '10px 20px',
                                fontSize: '1rem',
                                borderRadius: '20px',
                                textTransform: 'none',
                                width: '220px', // Ensures button width matches the sidebar
                            }}
                        >
                            {item.text}
                        </Button>
                    ))}
                        
                </Box>
            </Box>
        
        </div>
        
        </>
        
    );
    
};

export default HomePage;
