import React, { useState, useRef,useEffect } from 'react';
import { Modal, Button } from '@mui/material';

const CameraCapture = ({ onImageCapture }) => {
    const videoRef = useRef(null);
    const [stream, setStream] = useState(null);
    const [openCameraModal, setOpenCameraModal] = useState(true);

    useEffect(() => {
        // Function to start the camera when the component mounts
        const startCamera = async () => {
            try {
                const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
                setStream(mediaStream);
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            } catch (error) {
                console.error('Error accessing camera:', error);
            }
        };

        // Start the camera when the component mounts
        startCamera();

        // Cleanup function to stop the camera when the component unmounts
        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => {
                    track.stop();
                });
                setStream(null);
            }
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount


    const captureImage = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

            // Convert canvas image to base64 data URL
            const imageDataUrl = canvas.toDataURL('image/jpeg');
            onImageCapture(imageDataUrl);

            // Stop the camera stream
            if (stream) {
                stream.getTracks().forEach((track) => {
                    track.stop();
                });
                setStream(null);
            }

            setOpenCameraModal(false); // Close camera modal after capturing image
        }
    };

    return (
        <Modal open={openCameraModal} onClose={() => setOpenCameraModal(false)}>
            <div>
                {stream && <video ref={videoRef} autoPlay />}
                <Button onClick={captureImage}>Capture Image</Button>
            </div>
        </Modal>
    );
};

export default CameraCapture;
