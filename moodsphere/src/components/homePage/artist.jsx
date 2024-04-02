import React from 'react';
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography, AppBar, Toolbar, CssBaseline, Link, Divider, IconButton, Avatar, Menu, MenuItem, TextField, InputAdornment } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import Bubble from '../LandingPage/homebubble';


const Artist = () => {
   const navigate = useNavigate();


   const [anchorEl, setAnchorEl] = React.useState(null);


   const handleMenu = (event) => {
       setAnchorEl(event.currentTarget);
   };


   const handleClose = () => {
       setAnchorEl(null);
   };


   const appBarStyle = {
       backgroundColor: '#121212',
       color: '#b71c1c',
       boxShadow: '0 2px 4px -1px rgba(183, 28, 28, 0.2), 0 4px 5px 0 rgba(183, 28, 28, 0.14), 0 1px 10px 0 rgba(183, 28, 28, 0.12)',
   };


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
                       </List>
                       <Box px={2} py={1}>
                           <Link href="#" color="inherit" underline="hover">
                               Privacy Policy
                           </Link>
                       </Box>
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
                       backgroundColor: 'rgba(0, 0, 0, 0.99)',
                       position: 'relative',
                       '::before': {
                           content: '""',
                           position: 'relative',
                           top: 0,
                           left: 0,
                           right: 0,
                           bottom: 0,
                           backgroundSize: 'cover',
                           backgroundPosition: 'center',
                           opacity: 0.2,
                           zIndex: -1,
                       },
                   }}
               >
                   <Bubble style={{ position: 'absolute', zIndex: 0 }} />
                   <Typography variant="h4" align="center" gutterBottom>Welcome to MoodSphere</Typography>

                   <Box sx={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>
                       <Button variant="contained" color="primary" sx={{ m: 1, color: 'black', bgcolor: 'white', '&:hover': { bgcolor: '#b71c1c' } }}>All</Button>
                       <Button variant="contained" color="primary" sx={{ m: 1, color: 'black', bgcolor: 'white', '&:hover': { bgcolor: '#b71c1c' }  }}>Album</Button>
                       <Button variant="contained" color="primary" sx={{ m: 1, color: 'black', bgcolor: 'white', '&:hover': { bgcolor: '#b71c1c' } }}>Artist</Button>
                       <Button variant="contained" color="primary" sx={{ m: 1, color: 'black', bgcolor: 'white', '&:hover': { bgcolor: '#b71c1c' } }}>Top Hits</Button>
                       <Button variant="contained" color="primary" sx={{ m: 1, color: 'black', bgcolor: 'white', '&:hover': { bgcolor: '#b71c1c' } }}>Language</Button>
                       <Button variant="contained" color="primary" sx={{ m: 1, color: 'black', bgcolor: 'white', '&:hover': { bgcolor: '#b71c1c' } }}>Arjit Singh</Button>
                       <Button variant="contained" color="primary" sx={{ m: 1, color: 'black', bgcolor: 'white', '&:hover': { bgcolor: '#b71c1c' } }}>Taylor Swift</Button>
                       <Button variant="contained" color="primary" sx={{ m: 1, color: 'black', bgcolor: 'white', '&:hover': { bgcolor: '#b71c1c' } }}>Shawn Mendes</Button>
                       <Button variant="contained" color="primary" sx={{ m: 1, color: 'black', bgcolor: 'white', '&:hover': { bgcolor: '#b71c1c' } }}>Ed Sheran</Button>
                       <Button variant="contained" color="primary" sx={{ m: 1, color: 'black', bgcolor: 'white', '&:hover': { bgcolor: '#b71c1c' } }}>Drake</Button>
                       <Button variant="contained" color="primary" sx={{ m: 1, color: 'black', bgcolor: 'white', '&:hover': { bgcolor: '#b71c1c' } }}>Sonu Nigam</Button>
                   </Box>
               </Box>
           </div>
       </>
   );
};


export default Artist;
``



