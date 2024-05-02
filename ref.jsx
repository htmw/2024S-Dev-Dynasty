import React, { useRef, useState, useEffect } from 'react';
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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import Tooltip from '@mui/material/Tooltip';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, addDoc ,} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { useAuth } from '../../userAuth/AuthProvider';
import GalleryModal from './galleryModal';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

//import { AuthProvider } from '../../userAuth/AuthProvider';
// State to store selected image data


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
    const [selectedImage, setSelectedImage] = useState([]); 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [mood, setMood] = useState(null);
    const [predictedSongs, setPredictedSongs] = useState([]);
    const [image, setImage] = useState(null);
    const [images, setImages] = useState([]);
    const fileInputRef = useRef(null);
    const [showInfoText, setShowInfoText] = useState(true);
    const { user } = useAuth(); // Access the user object
    const isGuest = user?.isGuest; // Determine if the logged in user is a guest
    const userId = user?.uid;
    const [openGallery, setOpenGallery] = useState(false);
    


    const handleOpenGallery = () => {
        setOpenGallery(true);
    };

    const handleCloseGallery = () => {
        setOpenGallery(false);
    };

    // const handleUploadFromSavedImages = () => {
    //     // Define the logic for handling upload from saved images
    //     console.log('Handle upload from saved images');
    //     // You can open a modal or navigate to another page where users can select images
    // };
    // const checkImagesCollection = async () => {
    //     const userId = user.uid;
    //     const imagesRef = collection(db, 'userPic', userId, 'images'); // Assuming 'db' is your Firestore instance

    //     try {
    //         const snapshot = await getDocs(imagesRef);
    //         if (snapshot.empty) {
    //             // Collection does not exist, create it
    //             await addDoc(collection(db, 'userPic', userId, 'images'), {});
    //             // Show popup indicating collection was created
    //             toast.info("Images collection created successfully!", {
    //                 position: "top-center",
    //                 autoClose: 2000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //             });
    //         }
    //     } catch (error) {
    //         console.error('Error checking images collection:', error);
    //         // Show popup indicating error
    //         toast.error("Error checking images collection. Please try again later.", {
    //             position: "top-center",
    //             autoClose: 2000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //         });
    //     }
    // };


    

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

                // Set uploaded image preview (optional)
                setUploadedImage(URL.createObjectURL(file));

                // Display success message
                toast.success('Image uploaded successfully to Firestore!');
            } catch (error) {
                console.error('Error uploading image to Firestore:', error);
                toast.error('Failed to upload image to Firestore. Please try again.');
            }
        } else {
            // Handle case when no file is selected
            setUploadedImage(null);
            // You can also handle other state updates or display messages here
        }
    };

    const handleImageSelect = (image) => {
        setSelectedImage(image); // Update selected image state
        handleCloseGallery(); // Close the gallery modal after selecting an image
    };




const handleUseSelectedImage = async () => {
    if (selectedImage) {
            console.log('selectedImage' + selectedImage +'' + typeof selectedImage + '' + JSON.stringify(selectedImage))
            const { fileName } = selectedImage;
            console.log(JSON.stringify(selectedImage))
            console.log(fileName)
            // Prepare FormData for image upload using selectedImage data
            const formData = new FormData();
            formData.append('image', selectedImage);
            setSelectedImage(URL.createObjectURL(selectedImage));
            // Set uploaded image preview (if needed)
            // Assuming URL.createObjectURL(selectedImage) could be used for preview

            // Set FormData for fetch call
            setImage(formData);

 } 
}
// const fetchImages = async () => {
//     const userId = user.uid;
//     const imagesRef = collection(db, `userPic/${userId}/images`);

//     try {
//         const snapshot = await getDocs(imagesRef);
//         const imageList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         setImages(imageList);
//     } catch (error) {
//         console.error('Error fetching images from Firestore:', error);
//         toast.error('Failed to fetch images. Please try again.');
//     }



//     useEffect(() => {
//         if (userId) {
//             fetchImages();
//         }
//     }, [userId]); // Only re-run effect if userId changes

    // const handleImageClick = (imageId) => {
    //     const clickedImage = images.find(image => image.id === imageId);
    //     if (clickedImage) {
    //         const file = new File([null], clickedImage.fileName, { type: 'image/*' });
    //         const event = { target: { files: [file] } };
    //         handleFileUpload(event);
    //     }
    // };
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
    const handleOpenModal = () => {
        // Check if the images collection exists and create it if necessary
        const userId = user.uid;
        const imagesRef = collection(db, 'userPic', userId, 'images');

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
        console.log(uploadedImage)
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
        { text: 'Playlist', icon: <FeaturedPlayListIcon />, onClick: () => navigate('/playlists'), disabled: isGuest },
        { text: 'Home', icon: <HomeIcon />, onClick: () => navigate('/home'), disabled: isGuest },
        { text: 'Library', icon: <LibraryMusicIcon />, onClick: () => navigate('/library'), disabled: isGuest },
        { text: 'Profile', icon: <AccountCircleIcon />, onClick: () => navigate('/profile'), disabled: isGuest },
    ];
    const displayImage = uploadedImage ? uploadedImage : selectedImage;
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
                                    images={images} // Pass your gallery images array to the modal
                                    onSelectImage={handleUseSelectedImage} // Function to handle image selection
                                    db={db}
                                />



                            </Paper>
                        </Fade>
                    </Modal>
                    <List>
                        {menuItems.map((item, index) => (
                            <Tooltip
                                key={index}
                                title={isGuest ? "This feature is not available for guest users." : ""}
                                placement="right"
                            >
                                <div> {/* Wrap the ListItem in a div because Tooltip children must be able to hold a ref */}
                                    <ListItem
                                        button
                                        onClick={() => {
                                            if (!isGuest) {
                                                item.onClick();
                                            }
                                        }}
                                        sx={{
                                            '&:hover': {
                                                bgcolor: !isGuest ? '#757575' : 'transparent',
                                            },
                                            opacity: !isGuest ? 1 : 0.5,
                                            pointerEvents: isGuest ? 'none' : 'auto',
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                                        <ListItemText primary={item.text} />
                                    </ListItem>
                                </div>
                            </Tooltip>
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
                            // paddingTop: '100px', // Increased padding to account for buttons
                        }}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileUpload}
                        />
                        {displayImage && (
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
                                    src={displayImage}
                                    alt="Uploaded"

                                />
                                <Button
                                    onClick={handleImageRemove}

                                    sx={{ backgroundColor: '#b71c1c', color: 'white', marginTop: '20px', zIndex: 3 }}

                                >

                                    {/* <RemoveCircleIcon /> */}
                                    Remove
                                </Button>
                            </div>
                        )}
                        {displayImage && mood && (
                            <Box sx={{ width: '100%', textAlign: 'center', marginTop: '20px', zIndex: '2' }}> {/* Encapsulated in a Box for better control */}
                                <Typography variant="h5">
                                    Mood: {mood}
                                </Typography>
                            </Box>
                        )}
                        {/* Recommended songs display */}
                        {displayImage && predictedSongs && predictedSongs.length > 0 && (
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
