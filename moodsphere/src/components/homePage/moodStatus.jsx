import React, { useRef, useState, useEffect } from 'react';
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, 
    Typography, AppBar, Toolbar, CssBaseline, Link, Divider, useTheme, 
    useMediaQuery, IconButton, Avatar, Menu, MenuItem, TextField, Dialog ,DialogTitle ,DialogContent ,DialogContentText ,DialogActions  } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { CircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import Tooltip from '@mui/material/Tooltip';
import { useAuth } from '../../userAuth/AuthProvider'; import GalleryModal from './GalleryModal';
import { getStorage } from 'firebase/storage';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import CameraCapture from './CameraCapture';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import ReportIcon from '@mui/icons-material/Report';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB51kbIHKtjhKdC9WLoHn1n5rva-6kdPiU",
    authDomain: "moodsphere-dev-dynasty.firebaseapp.com",
    projectId: "moodsphere-dev-dynasty",
    storageBucket: "moodsphere-dev-dynasty.appspot.com",
    messagingSenderId: "31582792465",
    appId: "1:31582792465:web:ed7e040408bb81f4d4fab0",
    measurementId: "G-WBHFGXF8FQ"
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const MoodStatus = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [openReportModal, setReportOpenModal] = React.useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [mood, setMood] = useState(null);
    const [predictedSongs, setPredictedSongs] = useState([]);
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false); // Added: State for loading indicator
    const fileInputRef = useRef(null);
    const [showInfoText, setShowInfoText] = useState(true);
    const { user } = useAuth(); // Access the user object
    const isGuest = user?.isGuest; // Determine if the logged in user is a guest
    const [reportText, setReportText] = useState(""); // State to store the report text
    const [openGallery, setOpenGallery] = useState(false);
    const [openCameraModal, setOpenCameraModal] = useState(false);
    const [capturedImage, setCapturedImage] = useState(null);
    const [galleryImages, setGalleryImages] = useState([]);
    const handleOpenCameraModal = () => {
        setOpenCameraModal(true);
    };
    const handleCloseCameraModal = () => {
        setOpenCameraModal(false);
    };

    const handleImageCapture = (imageDataUrl) => {
        setCapturedImage(imageDataUrl);
        setOpenCameraModal(false);
        handleCloseModal();
        handleImageClick(imageDataUrl)
    };

    const fetchImages = async () => {
        if (!open || user.displayName.isGuest) return;
        const userPicRef = collection(db, `userPic/${user.uid}/images`);

        try {
            const snapshot = await getDocs(userPicRef);
            const imageList = [];

            snapshot.forEach(async (doc) => {
                const data = doc.data();
                const fileName = data.fileName;
                const imageUrl = data.imageUrl;

                if (imageUrl) {
                    try {
                        const downloadUrl = await getDownloadURL(ref(storage, imageUrl));
                        imageList.push({
                            id: doc.id,
                            fileName: fileName,
                            downloadUrl: downloadUrl
                        });
                        setImages(imageList);
                    } catch (error) {
                        console.error(`Error getting download URL for ${fileName}:`, error);
                    }
                }
            });
            setGalleryImages(imageList);
        } catch (error) {
            console.error('Error fetching images from Firestore:', error);
        }
    };

    const handleOpenGallery = () => {
        // Open the gallery modal
        setOpenGallery(true);

        // Fetch images from Firestore when gallery is opened
        fetchImages();
    };

    const handleCloseGallery = () => {
        setOpenGallery(false);
    };


    const handleImageClick = async (imageUrl, event) => {
        if(event) event.preventDefault(); // Prevent default behavior of click event
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const objectUrl = URL.createObjectURL(blob);

            const formData = new FormData();
            formData.append('image', blob, 'image.jpg');

            setUploadedImage(objectUrl);
            setImage(formData);
            setShowInfoText(false);

            handleCloseModal();  // Close the modal after handling image click
        } catch (error) {
            console.error('Error handling image click:', error);
        }
    };

    const handleFileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                // Prepare a reference to the Firebase Storage bucket
                const storageRef = ref(storage, `userPic/${user.uid}/images/${file.name}`);

                // Upload the file to Firebase Storage
                await uploadBytes(storageRef, file);

                // Get the download URL of the uploaded image
                const imageUrl = await getDownloadURL(storageRef);

                // Store image metadata (including URL) in Firestore
                const imagesRef = collection(db, `userPic/${user.uid}/images`);
                const docRef = await addDoc(imagesRef, {
                    fileName: file.name,
                    imageUrl: imageUrl
                });

                // Set uploaded image preview
                setUploadedImage(URL.createObjectURL(file));
                // Prepare FormData for fetch call (assuming you need this for another API call)
                const formData = new FormData();
                formData.append('image', file);
                // Set image FormData to state
                setImage(formData);

                // Close modal and update UI
                handleCloseModal();
                setShowInfoText(false);

                // Display success message
                toast.success('Image uploaded successfully to Firestore!');
            } catch (error) {
                console.error('Error uploading image to Firestore:', error);
                toast.error('Failed to upload image to Firestore. Please try again.');
            }
        } else {
            // Handle case when no file is selected
            setUploadedImage(null);
            setImage(null);
        }

    };
    const handleImageRemove = () => {
        setUploadedImage(null);
        setImage(null);
        setPredictedSongs(null);
        setMood(null);
        setShowInfoText(true);
    };
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleReportCloseModal = () => {
        setOpenModal(false);
    };
    const handleReportOpenModal = () => {
        setOpenModal(true);
    };
    const handleReportSubmit = () => {
        // You can implement report submission here
        handleReportCloseModal();
    };
    const handleOpenModal = () => {
        // Check if the images collection exists and create it if necessary
        const userId = user.uid;
        if (!userId) {
            setOpenModal(true);
            return;
        }
            const imagesRef = collection(db, 'userPic', user.uid, 'images');

            getDocs(imagesRef)
                .then((snapshot) => {
                    if (snapshot.empty) {
                        // Collection does not exist, create it
                        return addDoc(imagesRef, {})
                            .then(() => {
                                // Show popup indicating collection was created
                                toast.info("Images collection created successfully!", {
                                    position: "top-center",
                                    autoClose: 2000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                });
                            });
                    }
                })
                .catch((error) => {
                    console.error('Error checking images collection:', error);
                    // Show popup indicating error
                    toast.error("Error checking images collection. Please try again later.", {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                });

        // Open the modal for uploading images
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
        if (!image) {
            console.error('Please upload an image first.');
            toast.error("Please Upload Your Image", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        try {
            setLoading(true)
            const response = await fetch('https://msdev-cewl7upn6q-uc.a.run.app/predict', {
                method: 'POST',
                body: image,
            });

            if (!response.ok) {
                throw new Error('Failed to predict emotion');
            }

            const data = await response.json();

            setMood(data.prediction);
            setPredictedSongs(data.recommended_songs);
        } catch (err) {
            console.
                error('Error predicting songs:', err.message);
        }
        finally {
            setLoading(false); // Set loading state to false after API call completes
        }
    };

    // AppBar styles
    const appBarStyle = {
        backgroundColor: '#121212', // Dark background
        color: '#b71c1c', // Red accent text
        boxShadow: '0 2px 4px -1px rgba(183, 28, 28, 0.2), 0 4px 5px 0 rgba(183, 28, 28, 0.14), 0 1px 10px 0 rgba(183, 28, 28, 0.12)', // Red-toned shadow for depth
    };

    const menuItems = [
        { text: 'Playlist', icon: <FeaturedPlayListIcon />, onClick: () => navigate('/playlists'), disabled: isGuest },
        { text: 'Home', icon: <HomeIcon />, onClick: () => navigate('/home'), disabled: isGuest },
        { text: 'Library', icon: <LibraryMusicIcon />, onClick: () => navigate('/library'), disabled: isGuest },
        { text: 'Profile', icon: <AccountCircleIcon />, onClick: () => navigate('/profile'), disabled: isGuest },
        { text: 'Report', icon: <ReportIcon />, onClick: handleOpenModal },
    ];
    const theme = useTheme();
    const breakpoints = ["sm", "md", "lg", "xl"];
    const matches = breakpoints.map((bp) => useMediaQuery(`(min-width:${theme.breakpoints.values[bp]}px)`));

    return (
        <> <div style={{ overflowX: 'hidden', overflowY: 'hidden' }}>
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
            <Dialog open={openReportModal} onClose={handleReportCloseModal}>
                <DialogTitle>Report</DialogTitle>
                <DialogContent>
                    <DialogContentText> 
                        Please describe the issue:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="report-text"
                        label="Report"
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={reportText}
                        onChange={(e) => setReportText(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModal}>Cancel</Button>
                    <Button onClick={handleReportSubmit} color="primary">Submit</Button>
                </DialogActions>
            </Dialog>
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
                        "@media (max-width:600px)": {
                            width: 100, // Adjusted width for smaller screens
                        }
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
                                    onClick={handleOpenCameraModal}
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
                                <Button
                                    startIcon={<InsertDriveFileIcon sx={{ color: '#b71c1c' }} />}
                                    onClick={handleOpenGallery} // Call the function to check and create the collection
                                    sx={{ color: 'white' }}
                                >
                                    Upload from Saved Images
                                </Button>
                                {/* GalleryModal component */}
                                <GalleryModal
                                    open={openGallery}
                                    onClose={handleCloseGallery}
                                    userId={user?.uid}
    
                                    images={images}
                                    onImageClick={handleImageClick}
                                    handleImageClick={handleImageClick}
                                />
                            </Paper>
                        </Fade>
                    </Modal>
                    {openCameraModal && <CameraCapture
                        open={openCameraModal}
                        onClose={handleCloseCameraModal}
                        onImageCapture={handleImageCapture}
                    />}
                    <List>
                        {menuItems.map((item, index) => (
                            <ListItem
                                button
                                key={index}
                                onClick={item.onClick}
                                sx={{ "&:hover": { bgcolor: "#757575" } }}
                            >
                                {matches[0] ? (
                                    <>
                                        <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </>
                                ) : (
                                    <IconButton sx={{ color: "white" }}>{item.icon}</IconButton>
                                )}
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
                <ToastContainer />

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

                        {/* Check for showInfoText to conditionally render the info text */}
                        {showInfoText && (
                            <Typography
                                sx={{
                                    position: 'absolute',
                                    top: 70, // Adjust as needed for positioning
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '80%',
                                    textAlign: 'center',
                                    zIndex: 2,
                                    color: 'white',
                                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
                                    padding: '100px',
                                    borderRadius: '5px',
                                    fontSize: '29px',
                                }}
                            >
                                Please click on "Upload Image" and predict songs based on your mood.
                            </Typography>
                        )}

                        <Button
                            startIcon={<CameraAltIcon />}
                            onClick={handleOpenModal}
                            sx={{ backgroundColor: '#b71c1c', color: 'white', marginRight: '10px', marginTop: '20px', zIndex: 3 }}
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

                                    sx={{ backgroundColor: '#b71c1c', color: 'white', marginTop: '20px', zIndex: 3 }}
                                >
                                    Remove
                                </Button>
                            </div>
                        )}
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignContent: 'center', alignItems: 'center', mt: 2 }}> {loading && <CircularProgress color="error" size={100} thickness={3} />} </Box>
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
                                maxHeight: '500px', // Adjust the height as necessary
                                border: '1px solid red',
                                overflowY: 'hidden',
                                '&:hover': {
                                    overflowY: 'auto',
                                },
                                zIndex: '2',
                                paddingTop: '10px',
                                marginTop: '10px',
                            }}>
                                <Box sx={{
                                    width: '100%',
                                    height: '100%',
                                    overflowX: 'auto',
                                    '&::-webkit-scrollbar': {
                                        height: '5px',
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