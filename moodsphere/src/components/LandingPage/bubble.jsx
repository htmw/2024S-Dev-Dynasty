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
    { x: containerWidth * 0.06, y: containerHeight * 0.2, size: 200 }, // Top-left corner
    { x: containerWidth * 0.9, y: containerHeight * 0.4, size: 220 }, // Top-right corner
    { x: containerWidth * 0.1, y: containerHeight * 0.8, size: maxSize }, // Bottom-left corner
    { x: containerWidth * 0.95, y: containerHeight * 0.99, size: maxSize }, // Bottom-right corner
    { x: containerWidth * 0.26, y: containerHeight * 0.2, size: 250 }, // Top-left middle
    { x: containerWidth * 0.75, y: containerHeight * 0.2, size: 250 }, // Top-right middle
    { x: containerWidth * 0.23, y: containerHeight * 0.6, size: 200 }, // Bottom-left middle
    { x: containerWidth * 0.8, y: containerHeight * 0.7, size: maxSize }, // Bottom-right middle
    { x: centerX - 170, y: centerY - 100, size: 150 }, // Top-left close
    { x: centerX + 123, y: centerY - 260, size: 200 }, // Top-right close
    { x: centerX - 100, y: centerY + 75, size: 180 }, // Bottom-left close
    { x: centerX + 185, y: centerY + 50, size: 200 }, // Bottom-right close
  ];

  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    // Simulate image loading after 1 second
    const timeout = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 2 }}
      transition={{ duration: 5 }}
    >
      <AnimatePresence>
        {isLoaded && (
          <Logo
            src={logo}
            alt="Logo"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            onAnimationComplete={() => setIsAnimationComplete(true)}
          />
        )}
      </AnimatePresence>
      {imagePositions.map(({ x, y, size }, index) => (
        <CircleImage
          key={index}
          src={images[index]}
          alt={`Music Image ${index + 1}`}
          initial={{ opacity: 1, filter: 'brightness(100%)' }}
          animate={{
            opacity: 1,
            filter: isAnimationComplete ? 'brightness(50%)' : 'brightness(100%)',
            transition: { duration: 0.5, delay: index * 0.1 },
          }}
          style={{
            left: `${x - size / 2}px`,
            top: `${y - size / 2}px`,
            width: `${size}px`,
            height: `${size}px`,
          }}
        />
      ))}
    </Container>
  );
};

export default Bubble;