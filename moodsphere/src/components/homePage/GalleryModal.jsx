import React, { useState, useEffect } from 'react';
import { Modal, Fade, Box, Typography } from '@mui/material';
import { collection, getDocs } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
//import { ref, getDownloadURL } from 'firebase/storage';

// Firebase configuration
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

const GalleryModal = ({ open, onClose, images, handleImageClick }) => {
  //const [images, setImages] = useState([]);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     if (!open) return;

  //     const userPicRef = collection(db, `userPic/${userId}/images`);

  //     try {
  //       const snapshot = await getDocs(userPicRef);
  //       const imageList = [];

  //       snapshot.forEach(async (doc) => {
  //         const data = doc.data();
  //         const fileName = data.fileName;
  //         const imageUrl = data.imageUrl;

  //         if (imageUrl) {
  //           try {
  //             const downloadUrl = await getDownloadURL(ref(storage, imageUrl));
  //             imageList.push({
  //               id: doc.id,
  //               fileName: fileName,
  //               downloadUrl: downloadUrl
  //             });
  //             setImages(imageList);
  //           } catch (error) {
  //             console.error(`Error getting download URL for ${fileName}:`, error);
  //           }
  //         }
  //       });
  //     } catch (error) {
  //       console.error('Error fetching images from Firestore:', error);
  //     }
  //   };

  //   fetchImages();
  // }, [open, userId, db, storage]);


  // const handleImageClick = async (imageUrl) => {
  //   console.log('inside the handleImageCLICK' +  imageUrl )
  //   try {
  //     // Fetch the image data from the provided URL
  //     const response = await fetch(imageUrl);
  //     console.log('response', +JSON.stringify(response))
  //     const blob = await response.blob(); // Get the image data as a Blob
  //     console.log('blob' + JSON.stringify(blob))
  //     // Create an object URL for the Blob (local URL)
  //     const objectUrl = URL.createObjectURL(blob);
  
  //     // Prepare FormData with the image Blob
  //     const formData = new FormData();
  //     formData.append('image', blob, 'image.jpg'); // You can set any filename here
  
  //     // Set uploaded image preview (local URL)
  //     setUploadedImage(objectUrl);
  
  //     // Update image state with FormData
  //     setImage(formData);
  
  //     // Close the modal
  //     onClose();
  
  //     // Hide info text
  //     setShowInfoText(false);
  //   } catch (error) {
  //     console.error('Error handling image click:', error);
  //   }
  // };
  

  return (
    <Modal open={open} onClose={onClose}>
      <Fade in={open}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            maxWidth: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Saved Images Gallery
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {images.map((image, index) => (
              <img
                key={index}
                src={image.downloadUrl}
                alt={`Image ${index}`}
                style={{
                  width: 150,
                  height: 150,
                  objectFit: 'cover',
                  margin: 8,
                  cursor: 'pointer'
                }}
                onClick={(event) => handleImageClick(image.downloadUrl, event)} // Call handleImageClick on click
              />
            ))}
          </Box>
        </Box>
      </Fade>
    </Modal>
  );
};

export default GalleryModal;
