import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Box, Typography,SvgIcon, Card, CardContent, CardActions, IconButton, Link } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import PlaylistModal from '../playlists/playlistModal';
import { useAuth } from '../../userAuth/AuthProvider';
import { Collapse } from '@mui/material';
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

const RecommendedSongs = ({ recommendedSongs }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
  const [additionalInfoOpen, setAdditionalInfoOpen] = useState({});
  const { user } = useAuth();
  const handleOpenModal = (song) => {
    setSelectedSong(song);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleAddToPlaylist = (playlistId) => {
    console.log(`Adding song ${selectedSong.name} to playlist ${playlistId}`);
  };

  const handleCreateNewPlaylist = () => {
    console.log('Creating new playlist');
  };

  const toggleAdditionalInfo = (index) => {
    setAdditionalInfoOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      overflowX: 'auto',
      overflowY: 'hidden',
      width: '100%',
      height: '280px',
      '&::-webkit-scrollbar': {
        height: '12px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'darkgrey',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-track': {
        boxShadow: 'inset 0 0 5px grey',
        borderRadius: '6px', 
      },
      zIndex: '2',
    }}>
      {Array.isArray(recommendedSongs) && recommendedSongs.map((song, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          style={{ minWidth: '250px', height: '210px', margin: '10px' }}
        >
          <Card sx={{
            maxWidth: 300,
            backgroundColor: '#141414',
            color: 'white',
            '&:hover': {
              boxShadow: '0 8px 16px 0 rgba(255, 255, 255, 0.2)',
              transform: 'translateY(-4px)',
    
            },
            '& .MuiCardContent-root': {
              backgroundColor: 'inherit',
              color: 'inherit',
              
            },
            '& .MuiCardActions-root': {
              backgroundColor: 'inherit',
              color: 'inherit',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1px',
              height:'40px',     
            },
            '& .MuiIconButton-root': {
              color: 'inherit',
            }
          }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {song.name}
              </Typography>
              <Typography variant="body2" style={{ color: 'white' }}>
                {song.artist}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton
                size="large"
                aria-label="add to playlist"
                onClick={() => handleOpenModal(song)}
              >
                <PlaylistAddIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="spotify"
                component={Link}
                href={song.spotify}
                target="_blank"
              >
                <SpotifyIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="youtube"
                component={Link}
                href={song.youtube}
                target="_blank"
                color="error"
              >
                <YouTubeIcon />
              </IconButton>

              <IconButton
                size="large"
                aria-label="additional info"
                onClick={() => toggleAdditionalInfo(index)}
              >
                <Typography variant="body2"><InfoIcon></InfoIcon></Typography>
              </IconButton>
            </CardActions>
            <Collapse in={additionalInfoOpen[index]} timeout="auto" unmountOnExit>
              <CardContent style={{ marginTop: 'auto', color:'white' }}>
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
          </Card>
        </motion.div>
      ))}
      <PlaylistModal
        open={modalOpen}
        onClose={handleCloseModal}
        onAddToPlaylist={handleAddToPlaylist}
        onCreateNewPlaylist={handleCreateNewPlaylist}
        songData={selectedSong}
      />
    </Box>
  );
};

export default RecommendedSongs;