import React, { useState, useEffect } from 'react';
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography, AppBar, Toolbar, CssBaseline, Link, Divider, IconButton, Avatar, Menu, MenuItem, TextField, InputAdornment, CircularProgress } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import Bubble from '../LandingPage/homebubble';
import genres from './genreList.js'
import RecommendedSongs from './recommendedSongs.jsx';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';

const Genre = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredGenres, setFilteredGenres] = useState(genres);
    const [predictedSongs, setPredictedSongs] = useState([]);
    const [loading, setLoading] = useState(false); // New state for loading indicator

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    useEffect(() => {
        const results = genres.filter(genre =>
            genre.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredGenres(results);
    }, [searchQuery]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const fetchGenreInfo = async (genreName) => {
        setLoading(true); // Set loading state to true before API call
        try {
            const response = await fetch('https://msdev-cewl7upn6q-uc.a.run.app/songs-by-genre', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ genre_name: genreName }),
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data); 
            setPredictedSongs(data.songs); 
        } catch (error) {
            console.error("Failed to fetch genre info:", error);
            // Handle errors, e.g., by setting an error state or displaying a notification
        } finally {
            setLoading(false); // Set loading state to false after API call completes
        }
    };

    const appBarStyle = {
        backgroundColor: '#121212',
        color: '#b71c1c',
        boxShadow: '0 2px 4px -1px rgba(183, 28, 28, 0.2), 0 4px 5px 0 rgba(183, 28, 28, 0.14), 0 1px 10px 0 rgba(183, 28, 28, 0.12)',
    };

    const menuItems = [
        { text: 'Home', icon: <HomeIcon />, onClick: () => navigate('/home') },
        { text: 'Library', icon: <LibraryMusicIcon />, onClick: () => navigate('/library') },
        { text: 'Profile', icon: <AccountCircleIcon />, onClick: () => navigate('/profile') },
        { text: 'Playlist', icon: <FeaturedPlayListIcon />, onClick: () => navigate('/playlists') },
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
                        {menuItems.map((item, index) => (
                            <MenuItem key={index} onClick={item.onClick}>{item.text}</MenuItem>
                        ))}
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


            <div style={{ display: 'flex', flexDirection: 'row', height: '91.1vh', backgroundColor: '#121212' }}>
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
                
                {/* Width Added */}
                <Box sx={{ display: 'flex', height: 'calc(100vh - 64px)', width: 'calc(500vh - 64px)'}}>
                <Box
                    sx={{
                        width: '230px',
                        overflowY: 'scroll',
                        bgcolor: '#121212',
                        color: 'white',
                        padding: '20px',
                        boxSizing: 'border-box',
                    }}
                >
                    <Typography variant="h6" color="inherit" gutterBottom>
                        Genres
                    </Typography>
                    <Divider sx={{ bgcolor: '#b71c1c', marginBottom: '20px' }} />
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Search Genres..."
                            value={searchQuery}
                            onChange={handleSearchChange}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon sx={{ color: 'red' }} />
                                    </InputAdornment>
                                ),
                                style: {
                                    color: 'red', // Change text color to red
                                },
                            }}
                            sx={{
                                marginBottom: 2,
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': {
                                        borderColor: 'red', // Change border color to red
                                    },
                                    '&:hover fieldset': {
                                        borderColor: 'red', // Change border color on hover to red
                                    },
                                    '&.Mui-focused fieldset': {
                                        borderColor: 'red', // Change border color when focused to red
                                    }
                                },
                                '& .MuiInputLabel-root': { // Change label color to red
                                    color: 'red',
                                },
                                '& .MuiInput-underline:before': { // Change underline color when not focused
                                    borderBottomColor: 'red',
                                },
                                '& .MuiInput-underline:after': { // Change underline color when focused
                                    borderBottomColor: 'red',
                                }
                            }}
                        />
                    <List sx={{ display: 'flex', flexDirection: 'column' }}>
                        {filteredGenres.map((genre, index) => (
                            <ListItem
                                key={index}
                                sx={{ borderBottom: '1px solid #b71c1c', cursor: 'pointer' }}
                                onClick={() => fetchGenreInfo(genre)}>
                                {genre}
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box
                    sx={{
                        width: '1100px',
                        overflowY: 'scroll',
                        bgcolor: '#333',
                        color: 'white',
                        paddingLeft: '20px',
                        boxSizing: 'border-box',
                    }}
                >
                    
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', mt: 2 }}>
                        {loading && <CircularProgress color="error" size={100} thickness={3}/>}
                    </Box>
                    <RecommendedSongs recommendedSongs={predictedSongs} />
                </Box>
            </Box>
            </div>
        </>
    );
};

export default Genre;



