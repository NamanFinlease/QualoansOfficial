import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import backgroundImage from '../assets/image/Frame 463.png';

const FrontPage = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        overflowX: 'hidden',
        width: '100%',
        height: '110%',
        backgroundColor: '#f9f9f9',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        padding: theme.spacing(1),
        
        // Responsive height adjustments for different screen sizes
        [theme.breakpoints.down('xs')]: { // Extra small screens (below 600px)
          height: '50vh',
        },
        [theme.breakpoints.between('xs', 'sm')]: { // Small screens (600px - 768px)
          height: '100vh',
        },
        [theme.breakpoints.between('sm', 'md')]: { // Medium screens (768px - 1024px)
          height: '110vh',
        },
        [theme.breakpoints.between('md', 'lg')]: { // Large screens (1024px - 1200px)
          height: '110vh',
        },
        [theme.breakpoints.up('lg')]: { // Extra-large screens (above 1200px)
          height: '135vh',
        },
      }}
    >
      {/* Centered Content */}
      <Box sx={{ mt: -70, [theme.breakpoints.down('sm')]: { mt: -60 } }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            color: 'black',
            [theme.breakpoints.down('sm')]: {
              fontSize: '1.5rem',
            },
            [theme.breakpoints.between('sm', 'md')]: {
              fontSize: '2rem',
            },
            [theme.breakpoints.up('md')]: {
              fontSize: '2.5rem',
            },
          }}
        >
          Quick urgent assured <br /> loan in just
        </Typography>
        <Typography
          variant="h2"
          sx={{
            mb: 1,
            fontWeight: 'bold',
            color: '#FFAA00',
            [theme.breakpoints.down('sm')]: {
              fontSize: '1.5rem',
            },
            [theme.breakpoints.between('sm', 'md')]: {
              fontSize: '2rem',
            },
            [theme.breakpoints.up('md')]: {
              fontSize: '2.5rem',
            },
          }}
        >
          5 minutes
        </Typography>
      </Box>

      {/* Buttons in a smaller container */}
              <Box
          sx={{
            display: 'flex',
            gap: 2,
            padding: theme.spacing(1),
            border: '2px solid black',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            flexDirection: { xs: 'row', sm: 'row' }, // Row on small screens
            justifyContent: 'center',
            alignItems: 'center', // Center align both items vertically
            [theme.breakpoints.down('sm')]: {
              width: 'auto',
              gap: 1,
              marginTop: theme.spacing(3),
              padding: theme.spacing(1),
              borderWidth: '1px',
            },
            [theme.breakpoints.between('sm', 'md')]: {
              padding: theme.spacing(1.5),
              gap: 1.5,
            },
          }}
        >
          <Button
            variant="contained"
            href="/apply-now"
            sx={{
              backgroundColor: 'black',
              color: 'white',
              fontWeight: 'bold',
              fontSize: { xs: '14px', sm: '16px' }, // Adjust font size
              padding: { xs: '8px 16px', sm: '10px 20px' }, // Adjust padding
              animation: 'blinking 1.5s infinite',
              '&:hover': {
                backgroundColor: '#FFAA00',
              },
              '@keyframes blinking': {
                '0%': { backgroundColor: 'black', color: 'white' },
                '50%': { backgroundColor: '#FFAA00', color: 'black' },
                '100%': { backgroundColor: 'black', color: 'white' },
              },
              [theme.breakpoints.down('sm')]: {
                width: 'auto',
              },
            }}
          >
            Apply Now
          </Button>

          <Typography
            component="a"
            href="/contact-us"
            sx={{
              fontSize: { xs: '14px', sm: '18px' },
              color: 'black',
              fontWeight: 'bold',
              textDecoration: 'none',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              '&:hover': {
                color: '#FFAA00',
              },
              [theme.breakpoints.down('sm')]: {
                marginTop: 0, // Remove extra spacing on small screens
              },
            }}
          >
            Contact Us
          </Typography>
        </Box>

    </Box>
  );
};

export default FrontPage;
