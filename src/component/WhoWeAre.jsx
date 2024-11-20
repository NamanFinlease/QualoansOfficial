import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

const WhoWeAre = () => {
  const content = `Welcome to Qualoan – where we transform borrowing into a breeze! Our dedicated team is here to simplify lending like never before. With us, secure a loan and have the amount credited to your account in as little as 5 minutes.`;

  const words = content.split(' '); // Split the content into words
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
        backgroundColor: "#f9f9f9",
        display: 'flex',
        padding: { xs: '20px', sm: '30px' },
        overflow: 'hidden',
      }}
    >
     
      {/* Left Section: Heading */}
      <Box
        sx={{
        
          flex: 1,
          textAlign: 'left',
          zIndex: 1,
          
          marginRight: { xs: '0', md: '40px' },
        }}
      >
        <Typography
          variant="h2"
          fontWeight="bold"
          color="black"
          mb={1}
          sx={{
            marginLeft:{xs:2,sm:10},
            fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' }, // Adjust font size based on screen size
          }}
        >
          Who Are We?
        </Typography>
      </Box>

      {/* Right Section: Content */}
      <Box
        sx={{
          flex: 2,
          textAlign: 'left',
          zIndex: 1,
          maxWidth: '600px',
        }}
      >
        <Box sx={{ display: 'inline-block', textAlign: 'left', mb: 3 }}>
          {words.map((word, index) => (
            <Typography
              key={index}
              fontSize={{ xs: '16px', sm: '22px' }} // Adjust font size of words for smaller screens
              lineHeight={{ xs: '25px', lg: '40px', md: '30px' }}
              fontWeight={50}
              sx={{
                fontWeight: 540,
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

        {/* Read More Button */}
        <Button
          variant="contained"
          href="/about-us" // Add your 'About Us' page link here
          sx={{
            backgroundColor: 'black',
            color: 'white',
            borderRadius:'80px',
            fontWeight: 'bold',
            fontSize: { xs: '14px', sm: '16px' },
            padding: { xs: "8px 16px", sm: "6px 30px" },
            '&:hover': {
              backgroundColor: '#FFAA00',
            },
            
          }}
        >
          Read More
        </Button>
      </Box>
      </Box>
  
  );
};

export default WhoWeAre;
