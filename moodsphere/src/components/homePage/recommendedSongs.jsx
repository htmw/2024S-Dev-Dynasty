import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const RecommendedSongs = ({ recommendedSongs }) => {
  console.log(recommendedSongs)
  return (
    <Box sx={{ marginLeft: '20px' }}>
      <Typography variant="h6" gutterBottom>
        Recommended Songs
      </Typography>
      <List>
        {recommendedSongs.map((song, index) => (
          <ListItem key={index} disablePadding>
            <ListItemText primary={`${song.name} - ${song.artist}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default RecommendedSongs;