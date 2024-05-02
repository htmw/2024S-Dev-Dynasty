import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Typography,
  Container,
  DialogContentText,
} from "@mui/material";
import { db } from "../../userAuth/firebase";
import { useAuth } from "../../userAuth/AuthProvider"; // Auth context
import { logout } from '../../userAuth/firebase';
import { collection, getDocs } from "firebase/firestore";
import { doc, updateDoc, setDoc } from "firebase/firestore";
// In your Profile component
import { toast } from "react-toastify";
// In your App.js or main component file
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  CssBaseline,
  Link,
  Divider,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Paper,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";

const Profile = () => {
  const { user } = useAuth(); // Ensure you have the user object
  const [profile, setProfile] = useState({ first_name: '',
  last_name: '',
  email: '',}); // Define 'profile' state here
  const [open, setOpen] = useState(false);
  const [avatarAnchorEl, setAvatarAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // Dialog open state

  useEffect(() => {
    const getUsers = async () => {
      const usersCol = collection(db, "users");
      const userSnapshot = await getDocs(usersCol);
      const userList = userSnapshot.docs.map((doc) => doc.data());

      // Assuming 'user_id' is the field in your documents that corresponds to the authenticated user's ID
      const matchedProfile = userList.find(
        (profile) => profile.user_id === user.uid
      );
      if (matchedProfile) {
        setProfile(matchedProfile); // Set the profile state to the matched user profile
      } else {
        setProfile({
          name: user.name,
          last_name: '',
          email: user.email, // Use email from the authentication object
        });
      }
    };

    if (user) {
      getUsers();
    }
  }, [user]); // Run this effect when 'user' changes

  if (!profile) {
    return <div>Loading profile...</div>;
  }

  // Access the properties correctly in your JSX

  //   const handleDialogOpen = (content) => {
  //     setDialogContent(content);
  //     setOpenDialog(true);
  //   };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };
  // Handlers for Dialog
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSave = async () => {
    if (user && user.uid) {
      const userDocRef = doc(db, "users", user.uid);
      try {
        // Use setDoc with merge:true to create the document if it doesn't exist
        await setDoc(userDocRef, {
          first_name: profile.first_name,
          last_name: profile.last_name,
          email: user.email // This assumes email should be updated as well
        }, { merge: true }); // This will create the document if it doesn't exist
        toast.success("Profile Saved Successfully", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setOpen(false); // Close the dialog
      } catch (error) {
        console.error("Error updating profile: ", error);
        toast.error("Error saving profile", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleAvatarMenu = (event) => {
    setAvatarAnchorEl(event.currentTarget);
  };
  const handleAvatarMenuClose = () => {
    setAvatarAnchorEl(null);
  };
  const userLogOut = () => {
    logout();
    navigate("/");
  };
  const appBarStyle = {
    backgroundColor: "#121212",
    color: "#b71c1c",
    boxShadow:
      "0 2px 4px -1px rgba(183, 28, 28, 0.2), 0 4px 5px 0 rgba(183, 28, 28, 0.14), 0 1px 10px 0 rgba(183, 28, 28, 0.12)",
  };

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, onClick: () => navigate("/home") },
    {
      text: "Library",
      icon: <LibraryMusicIcon />,
      onClick: () => navigate("/library"),
    },
    {
      text: "Profile",
      icon: <AccountCircleIcon />,
      onClick: () => navigate("/profile"),
    },
    {
      text: "Playlist",
      icon: <FeaturedPlayListIcon />,
      onClick: () => navigate("/playlists"),
    },
  ];
  const dialogTitleStyle = {
    backgroundColor: '#121212',
    color: 'white',
    padding: '16px 24px', // Adjust padding as needed
    borderBottom: '1px solid #b71c1c' // Add a border bottom for visual separation
  };
  
  const dialogContentStyle = {
    backgroundColor: '#1c1c1c',
    color: 'white',
    paddingTop: '24px', // Space between title and content
    paddingBottom: '24px', // Space between content and actions
    paddingLeft: '24px', // Inner padding
    paddingRight: '24px', // Inner padding
    // You can add more styling here
  };
  
  const dialogActionsStyle = {
    padding: '8px 24px', // Adjust padding as needed
    borderTop: '1px solid #b71c1c' // Add a border top for visual separation
  };
  
  const paperStyle = {
    padding: "20px",
    margin: "20px auto",
    backgroundColor: "#1c1c1c", // Dark background for the Paper
    color: "white", // Text color
    borderRadius: "10px", // Rounded corners for the Paper
  };
  const sidebarStyle = {
    width: 240,
    flexShrink: 0,
    bgcolor: "black",
    display: "flex",
    flexDirection: "column",
    color: "white",
    overflowX: "hidden",
    borderRight: "1px solid #b71c1c",
    height: "calc(100vh - 64px)", // Adjust for AppBar height; you might need to change the value depending on your AppBar height
    boxSizing: "border-box", // Ensures the border is included in the height
  };
  const textStyle = {
    marginBottom: "10px", // Space between text fields
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        position="static"
        sx={{ backgroundColor: "#121212", color: "#b71c1c" }}
      >
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
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Profile
          </Typography>
          <Avatar sx={{ bgcolor: "#b71c1c" }} onClick={handleAvatarMenu} />
          <Menu
            id="avatar-menu"
            anchorEl={avatarAnchorEl}
            open={Boolean(avatarAnchorEl)}
            onClose={handleAvatarMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={userLogOut}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: "flex", p: 1 }}>
        <List sx={sidebarStyle}>
          <ListItem button onClick={() => navigate("/home")}>
            <ListItemIcon>
              <HomeIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button onClick={() => navigate("/library")}>
            <ListItemIcon>
              <LibraryMusicIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Library" />
          </ListItem>
          <ListItem button onClick={() => navigate("/profile")}>
            <ListItemIcon>
              <AccountCircleIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={() => navigate("/playlists")}>
            <ListItemIcon>
              <FeaturedPlayListIcon style={{ color: "white" }} />
            </ListItemIcon>
            <ListItemText primary="Playlists" />
          </ListItem>
          <Box sx={{ paddingTop: "440px" }}>
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
                      ensuring a secure experience for all our users. This
                      Privacy Policy outlines our practices concerning the
                      collection, use, and sharing of your personal information.
                    </p>

                    <h3>Information Collection</h3>
                    <p>
                      We collect information necessary for providing our
                      services, including:
                    </p>
                    <ul>
                      <li>
                        Email addresses for account registration and
                        communication purposes.
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
                      recommend music tailored to your preferences. It also
                      helps us in improving our services.
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
                      offensive or copyrighted material, may result in
                      termination of your access to the app.
                    </p>

                    <h3>Limitation of Liability</h3>
                    <p>
                      Moodsphere and its affiliates will not be liable for any
                      damages arising from the use of this app beyond the scope
                      permitted by applicable law.
                    </p>

                    <h3>Amendments</h3>
                    <p>
                      We reserve the right to amend these terms at any time.
                      Your continued use of Moodsphere following any changes
                      indicates your acceptance of the new terms.
                    </p>

                    <p>
                      If you have any questions or concerns regarding this legal
                      notice or any other policy, please contact our support
                      team.
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
        </List>

        <Container>
        <Paper style={paperStyle} elevation={4}>
          <Typography variant="h4" gutterBottom>
            Profile
          </Typography>
          {/* Conditionally render first name and last name fields */}
          {user && user.providerData && user.providerData[0].providerId === 'google.com' ? (
            <Typography variant="h6" style={textStyle}>
              Email: {user?.email || 'Please Enter Your Email Address'}
            </Typography>
          ) : (
            <>
              <Typography variant="h6" style={textStyle}>
                First Name: {profile?.first_name || ""}
              </Typography>
              <Typography variant="h6" style={textStyle}>
                Last Name: {profile?.last_name || ""}
              </Typography>
              <Typography variant="h6" style={textStyle}>
              Email: {user?.email || 'Please Enter Your Email Address'}
            </Typography>
            </>
          )}
          {/* Button to edit profile */}
          <Button
  variant="contained"
  disabled={user && user.providerData && user.providerData[0].providerId === 'google.com'}
  sx={{
    backgroundColor: "red",
    color: "white", // Set the text color to white
    "&:hover": { backgroundColor: "darkred" },
    "&.Mui-disabled": { // Conditional style for disabled state
      color: "rgba(255, 255, 255, 0.5)", // Set text color to a lighter shade of white
    },
  }}
  onClick={handleClickOpen}
>
  Edit Profile
</Button>
        </Paper>
      </Container>

        <Dialog
  open={open}
  onClose={handleClose}
  PaperProps={{
    style: {
      backgroundColor: 'transparent', // To make the dialog background transparent
      boxShadow: 'none', // Remove shadow if preferred
    },
  }}
>

<DialogTitle sx={dialogTitleStyle}>Edit Profile</DialogTitle>
  <DialogContent sx={dialogContentStyle}>

            {/* Form fields to edit the profile */}
            <TextField
  autoFocus
  margin="dense"
  id="firstName"
  label="First Name"
  type="text"
  fullWidth
  variant="outlined"
  name="first_name"
  value={profile.first_name || ''}
  onChange={(e) => setProfile({ ...profile, first_name: e.target.value })}
  placeholder="Please Enter Your First Name"
  InputLabelProps={{
    style: { color: '#b71c1c' }, // Keeps the label color
  }}
  InputProps={{
    style: { color: 'white' }, // Sets the input text color to white
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#b71c1c', // Keeps the border color
      },
      '&:hover fieldset': {
        borderColor: '#f44336', // Color for hover state
      },
      '&.Mui-focused fieldset': {
        borderColor: '#b71c1c', // Color for focus state
      },
    },
  }}
/>

<TextField
  margin="dense"
  id="lastName"
  label="Last Name"
  type="text"
  fullWidth
  variant="outlined"
  name="last_name"
  value={profile.last_name || ''}
  onChange={handleChange}
  placeholder="Please Enter Your Last Name"
  InputLabelProps={{
    style: { color: '#b71c1c' }, // Keeps the label color
  }}
  InputProps={{
    style: { color: 'white' }, // Sets the input text color to white
  }}
  sx={{
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#b71c1c', // Keeps the border color
      },
      '&:hover fieldset': {
        borderColor: '#f44336', // Color for hover state
      },
      '&.Mui-focused fieldset': {
        borderColor: '#b71c1c', // Color for focus state
      },
    },
  }}
/>
          </DialogContent>
          <DialogActions sx={dialogActionsStyle}>
    <Button onClick={handleClose} sx={{ color: 'white', backgroundColor: '#b71c1c', '&:hover': { backgroundColor: '#f44336' } }}>
      Cancel
    </Button>
    <Button onClick={handleSave} sx={{ color: 'white', backgroundColor: '#b71c1c', '&:hover': { backgroundColor: '#f44336' } }}>
      Save
    </Button>
  </DialogActions>
</Dialog>

      </Box>
    </>
  );
};

export default Profile;