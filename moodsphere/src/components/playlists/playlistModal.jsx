import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, Button, List, ListItem, ListItemText, DialogActions, TextField, Divider } from '@mui/material';
import { useAuth } from '../../userAuth/AuthProvider';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';

const StyledDialogTitle = styled(DialogTitle)({
    color: 'red', // Red title
    fontWeight: 'bold',
    borderBottom: '1px solid #ccc', // Separator under the title
    marginBottom: '20px', // Space below the border
  });
  
const StyledButton = styled(Button)({
    backgroundColor: '#b71c1c', // Red background for the button
    color: 'white', // White text
    '&:hover': {
      backgroundColor: '#D32F2F', // Darker shade on hover
    },
  });

const PlaylistModal = ({ open, onClose, onAddToPlaylist, onCreateNewPlaylist, songData }) => {
  const [creatingNew, setCreatingNew] = useState(false); // State to toggle new playlist input
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    if (open && user) {
      fetchPlaylists();
    }
  }, [open, user]);
  
  const fetchPlaylists = () => {
    if (!user) return;

    const url = `https://msdev-cewl7upn6q-uc.a.run.app/get-playlist?user_id=${encodeURIComponent(user.uid)}`;

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log("data->>",data)
            setPlaylists(data.data); // Assuming data.data is an array of playlists
        } else {
            setPlaylists([]); // Handle no playlists found or an error
        }
    })
    .catch(error => {
        console.error('Error fetching playlists:', error);
        setPlaylists([]);
    });
};

const handleAddToPlaylist = (playlistId) => {
    const addSongData = { song_id: songData.id, ...songData };  // Adjust according to your song data structure

    fetch('https://msdev-cewl7upn6q-uc.a.run.app/add-song-to-playlist', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user.uid, playlist_id: playlistId, song_data: addSongData })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            toast.success('Song added successfully');
            onClose();
        } else {
            toast.error(data.error || 'Error adding song');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        toast.error('Error adding song to playlist');
    });
};
  const startCreatingPlaylist = () => {
    setCreatingNew(true);
  };

  const handleCreateNewPlaylist = () => {
    if (newPlaylistName.trim()) {
        // Collect song data from the `selectedSong` state or wherever songs are managed// This should be adapted to your data structure
        const playlistData = {
            user_id: user.uid,  // Ensure you have the user's UID
            playlist_name: newPlaylistName,
            songs: [songData]  // This can be an array of songs if adding multiple
        };

        fetch('https://msdev-cewl7upn6q-uc.a.run.app/create-playlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(playlistData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            console.log('New Playlist ID:', data.playlist_id);
            setNewPlaylistName(''); // Reset input field
            setCreatingNew(false); // Hide input field
            onClose(); // Close modal
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
};


  const handleCancelCreate = () => {
    setCreatingNew(false);
    setNewPlaylistName('');
  };

  return (
<Dialog onClose={onClose} open={open} PaperProps={{ style: { backgroundColor: 'black' } }}>
  <StyledDialogTitle>Add to Playlist</StyledDialogTitle>
  <DialogContent>
    {creatingNew ? (
      <TextField
        autoFocus
        margin="dense"
        label="New Playlist Name"
        type="text"
        fullWidth
        value={newPlaylistName}
        onChange={(e) => setNewPlaylistName(e.target.value)}
        required
        variant="outlined"
        InputLabelProps={{
          style: { color: 'red', fontWeight: 'bold' }
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'red',
            },
            '&:hover fieldset': {
              borderColor: '#D32F2F',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#D32F2F',
            },
            '& input': {
              color: 'white',
              backgroundColor: '#333', // Slightly lighter background for input
            },
          },
        }}
      />
    ) : playlists.length > 0 ? (
      <List>
        {playlists.map((playlist, index) => (
          <ListItem button key={playlist.playlist_id || index} onClick={() => handleAddToPlaylist(playlist.playlist_id)}
            sx={{
              borderBottom: '1px solid #616161', // Separator between items
              '&:hover': {
                backgroundColor: '#D32F2F', // Darker shade on hover for list items
              },
            }}>
            <ListItemText primary={playlist.playlist_name} primaryTypographyProps={{ style: { color: 'white' } }} />
          </ListItem>
        ))}
      </List>
    ) : (
      <div style={{ color: 'white' }}>No playlists, create a new playlist.</div>
    )}
  </DialogContent>
  <Divider light />
  <DialogActions>
    {creatingNew ? (
      <>
        <StyledButton onClick={handleCreateNewPlaylist}>Save</StyledButton>
        <StyledButton onClick={handleCancelCreate}>Cancel</StyledButton>
      </>
    ) : (
      <>
        <StyledButton onClick={startCreatingPlaylist}>Create New Playlist</StyledButton>
        <StyledButton onClick={onClose}>Close</StyledButton>
      </>
    )}
  </DialogActions>
</Dialog>

  );
};

export default PlaylistModal;
