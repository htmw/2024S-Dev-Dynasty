import React, { useState } from "react";
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    AppBar,
    Toolbar,
    CssBaseline,
    Link,
    Divider,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
    TextField,
    InputAdornment,
    CircularProgress
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import MoodIcon from "@mui/icons-material/Mood";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { logout } from "../../userAuth/firebase";
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import { useNavigate } from "react-router-dom";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import RecommendedSongs from "../homePage/recommendedSongs";
const Library = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogContent, setDialogContent] = useState(""); // To differentiate between Legal and Privacy
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchClicked, setSearchClicked] = useState(false);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return; // Avoid empty queries or queries with only spaces
        setLoading(true);
        setSearchClicked(true);
        try {
            const response = await axios.post('http://localhost:5000/search', { query: searchQuery });
            const data = response.data;
            if (data.matches && Array.isArray(data.matches)) {
                setSearchResults(data.matches);
            } else {
                console.error('Invalid response structure:', data);
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Search API error:', error);
            setSearchResults([]); // Ensure resetting or appropriate error handling
        }
        setLoading(false);
    };

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setSearchQuery(inputValue);
        setSearchClicked(false);  // Update the state with the new query

        // Check if the input is empty or the query no longer matches the previous criteria
        if (!inputValue.trim() || inputValue.length < 1) {
            setSearchResults([]);  // Clear the search results
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

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

    const handleClose = () => {
        setAnchorEl(null);
    };

    const userLogOut = () => {
        logout();
        navigate("/");
    };
    // AppBar styles
    const appBarStyle = {
        backgroundColor: "#121212", // Dark background
        color: "#b71c1c", // Red accent text
        boxShadow:
            "0 2px 4px -1px rgba(183, 28, 28, 0.2), 0 4px 5px 0 rgba(183, 28, 28, 0.14), 0 1px 10px 0 rgba(183, 28, 28, 0.12)", // Red-toned shadow for depth
    };

    const menuItems = [
        { text: 'Home', icon: <HomeIcon />, onClick: () => navigate('/home') },
        { text: 'Library', icon: <LibraryMusicIcon />, onClick: () => navigate('/library') },
        { text: 'Profile', icon: <AccountCircleIcon />, onClick: () => navigate('/profile') },
        { text: 'Your Playlist', icon: <FeaturedPlayListIcon />, onClick: () => navigate('/playlists') },
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
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={userLogOut}>Logout</MenuItem>
                    </Menu>

                    <Typography variant="h6" sx={{ flexGrow: 1, color: "#b71c1c" }}>
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
                        <Avatar sx={{ bgcolor: "#b71c1c" }} />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <div
                style={{
                    display: "flex",
                    height: "91.1vh",
                    backgroundColor: "#121212",
                }}
            >
                <CssBaseline />

                <Box
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        bgcolor: "black",
                        display: "flex",
                        flexDirection: "column",
                        color: "white",
                        overflowX: "hidden",
                        borderRight: "1px solid #b71c1c",
                    }}
                >
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem
                                button
                                key={index}
                                onClick={item.onClick}
                                sx={{ "&:hover": { bgcolor: "#757575" } }}
                            >
                                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.text} />
                            </ListItem>
                        ))}
                    </List>
                    <Box mt="auto" py={2}>
                        <Divider sx={{ bgcolor: "gray" }} />
                        <List dense>
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
                        </List>
                    </Box>
                </Box>
                <Dialog
                    open={openDialog}
                    onClose={handleDialogClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{
                        "& .MuiDialog-paper": {
                            backgroundColor: "#ffffff", // Changing the background color to white for a formal look
                            color: "#000000", // Text color set to black for readability
                        },
                    }}
                >
                    <DialogTitle sx={{ fontWeight: "bold" }}>
                        {dialogContent === "privacy" ? "Privacy Policy" : "Legal Notice"}
                    </DialogTitle>

                    <DialogContent>
                        <DialogContentText sx={{ color: "black" }}>
                            {dialogContent === "privacy" ? (
                                // Privacy Policy content here
                                <React.Fragment>
                                    <p>
                                        Moodsphere is committed to protecting your privacy and
                                        ensuring a secure experience for all our users. This Privacy
                                        Policy outlines our practices concerning the collection,
                                        use, and sharing of your personal information.
                                    </p>

                                    <h3>Information Collection</h3>
                                    <p>
                                        We collect information necessary for providing our services,
                                        including:
                                    </p>
                                    <ul>
                                        <li>
                                            Email addresses for account registration and communication
                                            purposes.
                                        </li>
                                        <li>
                                            Usage data to enhance our services and user experience.
                                        </li>
                                    </ul>

                                    <h3>Image Processing</h3>
                                    <p>
                                        Images uploaded for mood prediction are processed securely
                                        and deleted immediately after analysis.
                                    </p>

                                    <h3>Use of Information</h3>
                                    <p>
                                        Your data enables us to personalize the app experience and
                                        recommend music tailored to your preferences. It also helps
                                        us in improving our services.
                                    </p>

                                    <h3>Data Sharing</h3>
                                    <p>
                                        We do not share your personal information with third
                                        parties, except as required to provide our services or
                                        comply with legal obligations.
                                    </p>

                                    <h3>Data Security</h3>
                                    <p>
                                        We implement stringent security measures to protect your
                                        information. However, no system can guarantee absolute
                                        security.
                                    </p>

                                    <h3>User Rights</h3>
                                    <p>
                                        You have the right to access and manage your information
                                        within Moodsphere.
                                    </p>

                                    <p>
                                        For further inquiries or assistance, please contact our
                                        support team.
                                    </p>
                                </React.Fragment>
                            ) : (
                                // Legal Notice content here
                                <React.Fragment>
                                    <p>
                                        This legal notice contains the terms and conditions
                                        governing your use of the Moodsphere app and its services.
                                        By accessing or using Moodsphere, you agree to be bound by
                                        these terms.
                                    </p>

                                    <h3>Intellectual Property Rights</h3>
                                    <p>
                                        All content within Moodsphere, including texts, graphics,
                                        logos, icons, images, audio clips, digital downloads, and
                                        software, is the property of Moodsphere or its content
                                        suppliers and protected by international copyright and
                                        trademark laws.
                                    </p>

                                    <h3>User Conduct</h3>
                                    <p>
                                        Users are expected to use Moodsphere services responsibly
                                        and ethically. Any form of misuse, including the upload of
                                        offensive or copyrighted material, may result in termination
                                        of your access to the app.
                                    </p>

                                    <h3>Limitation of Liability</h3>
                                    <p>
                                        Moodsphere and its affiliates will not be liable for any
                                        damages arising from the use of this app beyond the scope
                                        permitted by applicable law.
                                    </p>

                                    <h3>Amendments</h3>
                                    <p>
                                        We reserve the right to amend these terms at any time. Your
                                        continued use of Moodsphere following any changes indicates
                                        your acceptance of the new terms.
                                    </p>

                                    <p>
                                        If you have any questions or concerns regarding this legal
                                        notice or any other policy, please contact our support team.
                                    </p>

                                    {/* Additional Legal Notice content */}
                                </React.Fragment>
                            )}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleDialogClose} color="primary" autoFocus>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        color: "white",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundBlendMode: "darken",
                        // Increase the last number in rgba for higher opacity
                        backgroundColor: "rgba(0, 0, 0, 0.99)", // Dark semi-transparent overlay
                        position: "relative", // Required for the pseudo-element to position correctly
                        "::before": {
                            // Pseudo-element for the background image
                            content: '""',
                            position: "relative",
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            opacity: 0.2, // Lower this for a more faded background image
                            zIndex: 1, // Place it behind the content
                        },
                        p: 3,
                    }}
                >
                    <TextField
                        fullWidth
                        value={searchQuery}
                        onChange={(e) => handleInputChange(e)}
                        onKeyPress={(event) => event.key === 'Enter' && handleSearch()}
                        variant="outlined"
                        placeholder="Search for songs or artists..."
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleSearch} aria-label="search">
                                        <SearchIcon style={{ color: 'red' }} />
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        sx={{
                            mb: 2,
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: 'red',
                                    borderRadius: '30px',
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
                                    '&::placeholder': {
                                        color: 'white',
                                    },
                                },
                            },
                        }}
                    />
                    {loading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <CircularProgress color="error" size={100} thickness={3}/>
                        </Box>
                    ) : (<>
                        {searchResults && searchResults.length > 0 ? (
                            <>
                                <Typography variant="h5" sx={{ mb: 2, color: 'red' }}>
                                    {searchResults.length +' '+'Results Found ! Tune in to your vibes'}
                                </Typography>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                    width: '1100px', // Adjust the width as necessary
                                    maxHeight: '550px', // Adjust the height as necessary
                                    border: '1px solid red',
                                    overflowY: 'hidden',
                                    '&:hover': {
                                        overflowY: 'auto',
                                    },
                                    zIndex: '2',
                                    paddingTop: '20px',
                                    marginTop: '20px',
                                    marginLeft: '50px'
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
                                        <RecommendedSongs recommendedSongs={searchResults} />
                                    </Box>
                                </Box>
                            </>)
                            : searchQuery.trim().length > 0 && (
                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    width: '1100px', // Maintain container width
                                    paddingTop: '20px',
                                    marginTop: '20px',
                                    marginLeft: '50px',
                                }}>
                                    <Typography variant="h5" sx={{ color: 'red' }}>
                                        {searchClicked ? 'No Results Found' : 'Enter a valid search criteria and hit search again.' }
                                    </Typography>
                                </Box>)}
                    </>)}
                </Box>
            </div>
        </>
    );
};

export default Library;