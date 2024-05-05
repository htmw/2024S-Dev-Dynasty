import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Box, Typography } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SaveIcon from '@mui/icons-material/Save';

const PostCaptureModal = ({ open, image, onClose, onRecapture, onSave }) => {
    return (
        <Modal open={open} onClose={onClose}
            aria-labelledby="post-capture-modal-title"
            aria-describedby="post-capture-modal-description"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Box sx={{
                width: 400,
                bgcolor: 'background.paper',
                border: '2px solid white',
                boxShadow: 24,
                p: 2
            }}>
                <Typography id="post-capture-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
                    Captured Image
                </Typography>
                <img src={image} alt="Captured" style={{ width: '100%', height: 'auto', marginBottom: '16px' }} />
                <Button
                    onClick={onRecapture}
                    sx={{ mt: 2, bgcolor: 'error.main', '&:hover': { bgcolor: 'error.dark' } }}
                    variant="contained"
                    startIcon={<CameraAltIcon />}
                    fullWidth
                >
                    Recapture
                </Button>
                <Button
                    onClick={onSave}
                    sx={{ mt: 2, bgcolor: 'primary.main', '&:hover': { bgcolor: 'primary.dark' } }}
                    variant="contained"
                    startIcon={<SaveIcon />}
                    fullWidth
                >
                    Save
                </Button>
            </Box>
        </Modal>
    );
};

const CameraCapture = ({ open, onClose, onImageCapture }) => {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [openPostCaptureModal, setOpenPostCaptureModal] = useState(false);

    useEffect(() => {
        if (open) {
            startCamera();
        } else {
            closeCamera();
        }
    }, [open]);

    useEffect(() => {
        // This effect ensures that the camera is turned off when the component unmounts
        return () => {
            closeCamera();
        };
    }, []);

    const startCamera = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            setStream(mediaStream);
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
            closeCamera();
            onClose(); // Close modal on failure
        }
    };

    const closeCamera = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    };

    const captureImage = () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageDataUrl);
        setOpenPostCaptureModal(true);
    };

    const handleRecapture = () => {
        setOpenPostCaptureModal(false);
        setCapturedImage(null);
        open();
    };

    const handleSave = () => {
        onImageCapture(capturedImage);
        setOpenPostCaptureModal(false);
        closeCamera();
        onClose();
    };

    return (
        <>
            <Modal open={open} onClose={onClose}
                aria-labelledby="camera-modal-title"
                aria-describedby="camera-modal-description"
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Box sx={{
                    position: 'relative',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid white',
                    boxShadow: 24,
                    p: 2
                }}>
                    <video ref={videoRef} autoPlay style={{
                        width: '100%',
                        height: 'auto'
                    }} />
                    <Button
                        onClick={captureImage}
                        sx={{ mt: 2, bgcolor: 'error.main', '&:hover': { bgcolor: 'error.dark' } }}
                        variant="contained"
                        startIcon={<CameraAltIcon />}
                        fullWidth
                    >
                        Capture Image
                    </Button>
                </Box>
            </Modal>
            {capturedImage && (
                <PostCaptureModal
                    open={openPostCaptureModal}
                    image={capturedImage}
                    onClose={() => setOpenPostCaptureModal(false)}
                    onRecapture={handleRecapture}
                    onSave={handleSave}
                />
            )}
        </>
    );
};

export default CameraCapture;
