import React, { useState } from 'react';
import MoodStatus from './moodStatus.jsx';
import GalleryModal from './GalleryModal.jsx';
import CameraCapture from './CameraCapture';

const ParentComponent = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [image, setImage] = useState(null);
  const [images, setImages] = useState(null);
  const [showInfoText, setShowInfoText] = useState(true);
  const [openModal, setOpenModal] = useState(false);

  const handleCloseModal = () => {            
    setOpenModal(false);
    console.log('Closing modal...');
};
    
  // const handleImageClick = async (imageUrl, event) => {
  //   event.preventDefault(); // Prevent default behavior of click event
  //   console.log('inside the handleImageCLICK: ', imageUrl);
  
  //   try {
  //     const response = await fetch(imageUrl);
  //     const blob = await response.blob();
  //     const objectUrl = URL.createObjectURL(blob);
  
  //     const formData = new FormData();
  //     formData.append('image', blob, 'image.jpg');
  
  //     setUploadedImage(objectUrl);
  //     setImage(formData);
  //     setShowInfoText(false);
  
  //     handleCloseModal(); // Close the modal after handling image click
  //   } catch (error) {
  //     console.error('Error handling image click:', error);
  //   }
  // };

  const handleImageCapture = async (imageUrl) => {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);

        const formData = new FormData();
        formData.append('image', blob, 'image.jpg');

        setUploadedImage(objectUrl);
        setImage(formData);
        setShowInfoText(false);

        handleCloseModal(); // Close the modal after handling image click
    } catch (error) {
        console.error('Error handling captured image:', error);
    }
};


  return (
    <>
      <MoodStatus
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}
        setImage={setImage}
        setImages={setImages}
        setShowInfoText={setShowInfoText}
        onClose={handleCloseModal}
      />
      <GalleryModal
        uploadedImage={uploadedImage}
        setUploadedImage={setUploadedImage}  
        setImage={setImage}
        setImages={setImages}
        setShowInfoText={setShowInfoText}
        handleImageClick={handleImageClick}
        images={images}
        open={openGallery}
        onClose={handleCloseGallery}
        userId={user?.uid}
        onImageClick={handleImageClick}
                                    
      />
       <CameraCapture onImageCapture={handleImageCapture} />
    </>
  );
};

export default ParentComponent;
