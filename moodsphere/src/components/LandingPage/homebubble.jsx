import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
// Import your music-related images
import image2 from '../../assets/image1.jpeg';
import image3 from '../../assets/image2.jpeg';
import image4 from '../../assets/image3.jpeg';
import image5 from '../../assets/image4.jpeg';
import image6 from '../../assets/image5.jpeg';
import image7 from '../../assets/image6.jpeg';
import image8 from '../../assets/image7.jpeg';
import image9 from '../../assets/image8.jpeg';
import image10 from '../../assets/image9.jpeg';
import image11 from '../../assets/image10.jpeg';
import image12 from '../../assets/image11.jpeg';
import image13 from '../../assets/image12.jpeg';
// Import your logo
import logo from '../../assets/logo.png';

const shouldShowLogo = location.pathname !== '/home';
const Container = styled(motion.div)`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: black;
  overflow: hidden;
`;

const CircleImage = styled(motion.img)`
  position: absolute;
  border-radius: 50%;
  object-fit: cover;
`;

const Logo = styled(motion.img)`
  width: 150px;
  height: 170px;
  position: absolute;
  left: 46%;
  top: 27%;
  transform: translate(-50%, -50%);
  z-index: 1;
`;

const Bubble = () => {
  const images = [
    image13,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
    image9,
    image10,
    image11,
    image12,
  ];
  const containerWidth = window.innerWidth;
  const containerHeight = window.innerHeight;
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;
  const logoSize = 80;
  const maxSize = 300;
  const minSize = 100;
  const imagePositions = [
    { x: containerWidth * 0.008, y: containerHeight * 0, size: 170 }, // Top-left corner
    { x: containerWidth * 0.008, y: containerHeight * 0.4, size: 170 }, // Top-right corner
    { x: containerWidth * 0.35, y: containerHeight * 0, size: 130 }, // Bottom-left corner
    { x: containerWidth * 0.6, y: containerHeight * 0, size: 170 }, // Bottom-right corner
    { x: containerWidth * 0.16, y: containerHeight * 0.2, size: 170 }, // Top-left middle
    { x: containerWidth * 0.73, y: containerHeight * 0.2, size: 170 }, // Top-right middle
    { x: containerWidth * 0.11, y: containerHeight * 0.7, size: 170 }, // Bottom-left middle
    // { x: containerWidth * 0.74, y: containerHeight * 0.7, size: 170 }, // Bottom-right middle
    { x: centerX - 400, y: centerY - 0, size: 170 }, // Top-left close
    { x: centerX + 251, y: centerY + 100, size: 170 }, // Top-right close
    { x: centerX - 100, y: centerY + 75, size: 170 }, // Bottom-left close
    { x: centerX + 18, y: centerY - 100, size: 170 }, // Bottom-right close
  ];

  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  useEffect(() => {
    // Instead of simulating loading, just set the state to true
    setIsLoaded(true);
    
  }, []);
  

  return (
    <Container>
      {imagePositions.map(({ x, y, size }, index) => (
        <CircleImage
          key={index}
          src={images[index]}
          alt={`Music Image ${index + 1}`}
          initial={{ opacity: 0.5, filter: 'brightness(50%)' }} // Visible but dimmed
          animate={{ opacity: 0.5 }} // Maintain the same visibility on load
          style={{
            left: `${x}px`,
            top: `${y}px`,
            width: `${size}px`,
            height: `${size}px`,
            position: 'absolute', // Ensure this is positioned absolutely
          }}
        />
      ))}
    </Container>
  );
};


export default Bubble;