import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import backgroundImage from '../assets/image/Frame 46.png'; // Adjust the path accordingly

const WhoWeAre = () => {
  const content = `Welcome to Qualoan – where we redefine lending!
  We’re passionate innovators committed to making borrowing faster and easier.With us,
   you can get a loan disbursed in your account in just  5 minutes.`;

  const words = content.split('\n'); // Split the content into words
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef(null);

  // Intersection observer to trigger animation when the component comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true); // Trigger animation when visible
          } else {
            setIsVisible(false); // Reset animation when not visible
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the component is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <Box
      ref={containerRef}
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 'auto', md: '70vh' }, // Make height responsive based on screen size
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover', // Ensure the image covers the full area
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
      }}
    >
      {/* Dark overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: { xs: '100px', md: '0' }, // Adjust overlay top for smaller screens
          left: 0,
          width: '100%',
          height: { xs: '300%', sm: '200%' }, // Adjust height for different screen sizes
        }}
      />

      {/* Content overlay */}
      <Box
        sx={{
          marginBottom: { xs: '20px', sm: '50px' }, // Responsive margin
          position: 'relative',
          textAlign: 'center',
          zIndex: 1,
          maxWidth: '90%', // Allow content to take up more width on small screens
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          color="black"
          mb={2}
          sx={{
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }, // Adjust font size based on screen size
          }}
        >
          Who Are We?
        </Typography>
        <Box sx={{ display: 'inline-block', textAlign: 'center' }}>
          {words.map((word, index) => (
            <Typography
              key={index}
              fontSize={{ xs: '16px', sm: '22px' }} // Adjust font size of words for smaller screens
              lineHeight={{xs:'25px',lg:"40px",md:'30px'}}
              fontWeight={50}
              sx={{
                fontWeight:540,
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.3s ease ${index * 0.01}s, transform 0.3s ease ${index * 0.01}s`,
                display: 'inline-block',
                margin: '0 5px',
              }}
            >
              {word}
            </Typography>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default WhoWeAre;
