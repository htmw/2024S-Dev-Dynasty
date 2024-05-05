import React, { useState, useEffect } from 'react';
import {
    Box, Card, CardContent, Typography, IconButton, Link, List, ListItem, ListItemIcon, ListItemText,
    AppBar, Collapse, Toolbar, Divider, Menu, MenuItem, Avatar, SvgIcon, Button, CssBaseline
} from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../userAuth/AuthProvider';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { logout } from '../../userAuth/firebase';
import { motion } from 'framer-motion';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

function SpotifyIcon() {
    return (
        <SvgIcon
            xmlns="http://www.w3.org/2000/svg"
            width="512"
            height="512"
            enableBackground="new 0 0 512 512"
            viewBox="0 0 512 512"
        >
            <g>
                <path
                    fill="#1AB26B"
                    d="M256 26.001C129.035 26.001 26 129.036 26 256c0 126.963 103.035 229.999 230 229.999 126.962 0 229.999-103.036 229.999-229.999 0-126.964-103.036-229.999-229.999-229.999z"
                ></path>
                <path
                    fill="#FFF"
                    d="M349.391 364.416c-3.896 0-6.306-1.206-9.924-3.34-57.87-34.869-125.2-36.355-191.697-22.723-3.617.928-8.347 2.413-11.036 2.413-8.996 0-14.653-7.143-14.653-14.655 0-9.551 5.658-14.095 12.614-15.579 75.954-16.786 153.579-15.304 219.797 24.298 5.657 3.618 8.996 6.864 8.996 15.302-.001 8.44-6.586 14.284-14.097 14.284zM374.339 303.576c-4.824 0-8.067-2.133-11.408-3.895-57.964-34.314-144.399-48.133-221.281-27.265-4.452 1.204-6.863 2.408-11.036 2.408-9.923 0-17.992-8.067-17.992-17.989 0-9.925 4.822-16.508 14.375-19.198 25.783-7.234 52.121-12.612 90.703-12.612 60.187 0 118.337 14.931 164.151 42.195 7.512 4.452 10.48 10.201 10.48 18.271-.094 10.018-7.885 18.085-17.992 18.085zM403.087 232.907c-4.822 0-7.789-1.205-11.962-3.616-66.032-39.415-184.093-48.875-260.512-27.544-3.338.927-7.512 2.41-11.965 2.41-12.241 0-21.608-9.553-21.608-21.887 0-12.612 7.792-19.754 16.138-22.165 32.645-9.553 69.184-14.097 108.971-14.097 67.703 0 138.648 14.097 190.492 44.331 7.234 4.173 11.963 9.922 11.963 20.96 0 12.613-10.201 21.608-21.517 21.608z"
                ></path>
            </g>
        </SvgIcon>
    );
}
const StyledButton = styled(Button)({
    backgroundColor: '#b71c1c', // Red background for the button
    color: 'white', // White text
    '&:hover': {
        backgroundColor: '#D32F2F', // Darker shade on hover
    },
});


function Playlist() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [playlists, setPlaylists] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState("");
    const handleDialogOpen = (content) => {
        setDialogContent(content);
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
    };
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleAvatarMenu = (event) => {
        setAvatarAnchorEl(event.currentTarget);
    };
    const handleAvatarMenuClose = () => {
        setAvatarAnchorEl(null);
    };
    const userLogOut = () => {
        logout();
        navigate('/');
    };
    const [additionalInfoOpen, setAdditionalInfoOpen] = useState({});

    useEffect(() => {
        if (user) {
            fetchPlaylists();
        }
    }, [user]);

    const fetchPlaylists = () => {
        const url = `https://msdev-cewl7upn6q-uc.a.run.app/get-playlist?user_id=${encodeURIComponent(user.uid)}`;
        fetch(url, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    setPlaylists(data.data);
                } else {
                    console.error('No playlists found:', data.message);
                    setPlaylists([]);
                }
            })
            .catch(error => {
                console.error('Error fetching playlists:', error);
                setPlaylists([]);
            });
    };
    const toggleAdditionalInfo = (index) => {
        setAdditionalInfoOpen((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const deletePlaylist = (playlistId) => {
        const url = `https://msdev-cewl7upn6q-uc.a.run.app/delete-playlist?user_id=${encodeURIComponent(user.uid)}&playlist_id=${encodeURIComponent(playlistId)}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                fetchPlaylists();  // Refresh playlists after deletion
            })
            .catch(error => console.error('Failed to delete playlist', error));
    };

    const removeSongFromPlaylist = (playlistId, songKey) => {
        const url = `https://msdev-cewl7upn6q-uc.a.run.app/remove-song-from-playlist?user_id=${encodeURIComponent(user.uid)}&playlist_id=${encodeURIComponent(playlistId)}&song_key=${encodeURIComponent(songKey)}`;
        const updatedPlaylists = playlists.map(playlist => {
            if (playlist.playlist_id === playlistId) {
                // Filter out the song to be deleted
                const filteredSongs = playlist.songs.filter(song => song.key !== songKey);
                return { ...playlist, songs: filteredSongs };
            }
            return playlist;
        });
        // Optimistically update the state before the API call
        setPlaylists(updatedPlaylists);
        fetch(url, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // Optionally, refetch playlists here if necessary
                // fetchPlaylists();
            })
            .catch(error => {
                console.error('Failed to remove song', error);
                // If the delete fails, revert the optimistic update
                fetchPlaylists();
            });
    };

    return (
        <>
            <CssBaseline />
            <AppBar position="static" sx={{ backgroundColor: '#121212', color: '#b71c1c' }}>
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleMenu}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        Playlists
                    </Typography>
                    <Avatar sx={{ bgcolor: "#b71c1c" }} onClick={handleAvatarMenu} />
                    <Menu
                        id="avatar-menu"
                        anchorEl={avatarAnchorEl}
                        open={Boolean(avatarAnchorEl)}
                        onClose={handleAvatarMenuClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                    >
                        <MenuItem onClick={userLogOut}>Logout</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <Box sx={{ display: 'flex', p: 1 }}>
                <List sx={{ width: 220, bgcolor: 'black', color: 'white', '& .MuiListItem-button:hover': { bgcolor: 'grey' } }}>
                    <ListItem button onClick={() => navigate('/home')}>
                        <ListItemIcon><HomeIcon style={{ color: 'white' }} /></ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button onClick={() => navigate('/library')}>
                        <ListItemIcon><LibraryMusicIcon style={{ color: 'white' }} /></ListItemIcon>
                        <ListItemText primary="Library" />
                    </ListItem>
                    <ListItem button onClick={() => navigate('/profile')}>
                        <ListItemIcon><AccountCircleIcon style={{ color: 'white' }} /></ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem button onClick={() => navigate('/playlists')}>
                        <ListItemIcon><FeaturedPlayListIcon style={{ color: 'white' }} /></ListItemIcon>
                        <ListItemText primary="Playlists" />
                    </ListItem>
                    <Box sx={{ paddingTop: '450px' }}>
                        <Divider sx={{ bgcolor: "gray" }} />
                        <ListItem
                            onClick={() => handleDialogOpen("privacy")}
                            sx={{ py: 1, px: 2 }}
                        >
                            <Link color="inherit" underline="hover">
                                Privacy Policy
                            </Link>
                        </ListItem>
                        <ListItem
                            onClick={() => handleDialogOpen("legal")}
                            sx={{ py: 1, px: 2 }}
                        >
                            <Link color="inherit" underline="hover">
                                Legal
                            </Link>
                        </ListItem>
                    </Box>
                    <Dialog
                        open={openDialog}
                        onClose={handleDialogClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        sx={{
                            '& .MuiDialog-paper': {
                                backgroundColor: '#ffffff', // Changing the background color to white for a formal look
                                color: '#000000', // Text color set to black for readability
                            }
                        }}
                    >
                        <DialogTitle sx={{ fontWeight: 'bold' }}>{dialogContent === "privacy" ? "Privacy Policy" : "Legal Notice"}</DialogTitle>

                        <DialogContent>
                            <DialogContentText sx={{ color: "black" }}>
                                {
                                    dialogContent === "privacy" ?
                                        // Privacy Policy content here
                                        <React.Fragment>
                                            <p>Moodsphere is committed to protecting your privacy and ensuring a secure experience for all our users. This Privacy Policy outlines our practices concerning the collection, use, and sharing of your personal information.</p>

                                            <h3>Information Collection</h3>
                                            <p>We collect information necessary for providing our services, including:</p>
                                            <ul>
                                                <li>Email addresses for account registration and communication purposes.</li>
                                                <li>Usage data to enhance our services and user experience.</li>
                                            </ul>

                                            <h3>Image Processing</h3>
                                            <p>Images uploaded for mood prediction are processed securely and deleted immediately after analysis.</p>

                                            <h3>Use of Information</h3>
                                            <p>Your data enables us to personalize the app experience and recommend music tailored to your preferences. It also helps us in improving our services.</p>

                                            <h3>Data Sharing</h3>
                                            <p>We do not share your personal information with third parties, except as required to provide our services or comply with legal obligations.</p>

                                            <h3>Data Security</h3>
                                            <p>We implement stringent security measures to protect your information. However, no system can guarantee absolute security.</p>

                                            <h3>User Rights</h3>
                                            <p>You have the right to access and manage your information within Moodsphere.</p>

                                            <p>For further inquiries or assistance, please contact our support team.</p>

                                        </React.Fragment>
                                        :
                                        // Legal Notice content here
                                        <React.Fragment>
                                            <p>This legal notice contains the terms and conditions governing your use of the Moodsphere app and its services. By accessing or using Moodsphere, you agree to be bound by these terms.</p>

                                            <h3>Intellectual Property Rights</h3>
                                            <p>All content within Moodsphere, including texts, graphics, logos, icons, images, audio clips, digital downloads, and software, is the property of Moodsphere or its content suppliers and protected by international copyright and trademark laws.</p>

                                            <h3>User Conduct</h3>
                                            <p>Users are expected to use Moodsphere services responsibly and ethically. Any form of misuse, including the upload of offensive or copyrighted material, may result in termination of your access to the app.</p>

                                            <h3>Limitation of Liability</h3>
                                            <p>Moodsphere and its affiliates will not be liable for any damages arising from the use of this app beyond the scope permitted by applicable law.</p>

                                            <h3>Amendments</h3>
                                            <p>We reserve the right to amend these terms at any time. Your continued use of Moodsphere following any changes indicates your acceptance of the new terms.</p>

                                            <p>If you have any questions or concerns regarding this legal notice or any other policy, please contact our support team.</p>

                                            {/* Additional Legal Notice content */}
                                        </React.Fragment>
                                }
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleDialogClose} color="primary" autoFocus>
                                Close
                            </Button>
                        </DialogActions>
                    </Dialog>

                </List>
                <Box sx={{ flexGrow: 1 }}>
                    {playlists.length > 0 ? (
                        <Typography variant="h6" gutterBottom sx={{ color: 'green', mt: 2 }}>
                            Welcome to your playlists
                        </Typography>
                    ) : (
                        <Typography variant="h6" gutterBottom sx={{ color: 'red', mt: 2 }}>
                            Oops, no available playlists. Start by creating some!
                        </Typography>
                    )}
                    {playlists.map((playlist, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card sx={{ bgcolor: '#141414', mb: 2, color: 'white', position: 'relative' }}>
                                <StyledButton
                                    sx={{ position: 'absolute', right: 16, top: 8, color: 'white' }}
                                    onClick={() => deletePlaylist(playlist.playlist_id)}
                                >
                                    Delete Playlist <DeleteIcon />
                                </StyledButton>
                                <CardContent>
                                    <Typography variant="h5" gutterBottom>{playlist.playlist_name}</Typography>
                                    <Divider sx={{ bgcolor: 'red', mb: 2, height: '2px' }} />
                                    {playlist.songs.map((song, idx) => (
                                        <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                                            <Typography>{song.name} - {song.artist}</Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                <IconButton component={Link} href={song.spotify} target="_blank">
                                                    <SpotifyIcon />
                                                </IconButton>
                                                <IconButton component={Link} href={song.youtube} target="_blank" color="error">
                                                    <YouTubeIcon />
                                                </IconButton>
                                                <IconButton
                                                    sx={{ color: '#b71c1c' }}
                                                    onClick={() => removeSongFromPlaylist(playlist.playlist_id, song.key)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                                <IconButton
                                                    size="large"
                                                    aria-label="additional info"
                                                    onClick={() => toggleAdditionalInfo(index)}
                                                >
                                                    <Typography variant="body2" color='white'><InfoIcon></InfoIcon></Typography>
                                                </IconButton>
                                                <Collapse in={additionalInfoOpen[index]} timeout="auto" unmountOnExit>
                                                    <CardContent style={{ marginTop: 'auto', color: 'white' }}>
                                                        <Typography variant="body2">
                                                            Released: {song.release_date}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            Mood: {song.mood}
                                                        </Typography>
                                                        <Typography variant="body2">
                                                            Length: {Math.floor(song.length / 60000)} minutes
                                                        </Typography>
                                                    </CardContent>
                                                </Collapse>

                                            </Box>
                                        </Box>
                                    ))}
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </Box>
            </Box>
        </>
    );
}

export default Playlist;