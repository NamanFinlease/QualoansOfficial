import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IconButton, AppBar, Toolbar, Box, Button } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import logo from '../assets/image/Qua Black LOgo (1).png'; // Adjust the path based on your structure

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = (open) => {
    setIsSidebarOpen(open);
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: '#f9f9f9', boxShadow: 'none', zIndex: 5 }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            minHeight: '64px',
            marginTop: '10px',
            paddingX: { xs: 2, sm: 3 }, // Add padding for small screens
          }}
        >
          {/* Logo */}
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center' }}
            onClick={scrollToTop}
          >
            <img src={logo} alt="Logo" style={{ width: '40%', height: 'auto' }} />
          </Link>

          {/* Apply Now Button and Menu Icon */}
          <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    border: '2px solid',
    background: '#D9D9D9',
    padding: '5px',
    borderRadius: '10px',
    position: 'relative',
    gap: { xs: 1, sm: 2 }, // Adjust gap for smaller screens
    '@media (max-width: 600px)': {
      padding: '4px', // Reduce padding for small screens
    },
  }}
>
  {/* Sidebar for larger screens */}
  <Box
    sx={{
      display: { xs: 'none', sm: 'flex' }, // Hide on small screens
      flexDirection: 'row',
      gap: 2,
      alignItems: 'center',
    }}
  >
    {['HOME', 'ABOUT', 'REPAY', 'CONTACT', 'LOAN CALCULATOR'].map((text) => (
      <Link
        key={text}
        to={
          text === 'HOME'
            ? '/'
            : text === 'REPAY'
            ? '/repay-now'
            : text === 'CONTACT'
            ? '/contact-us'
            : text === 'ABOUT'
            ? '/about-us'
            : '/calculator'
        }
        style={{
          color: '#0b2747',
          textDecoration: 'none',
          padding: '5px 10px',
          borderRadius: '10px',
        }}
      >
        {text}
      </Link>
    ))}
  </Box>

  {/* Dropdown menu for smaller screens */}
  <Box sx={{ display: { xs: 'flex', sm: 'none' }, flexDirection: 'column', position: 'relative' }}>
    {/* Menu Button */}
    <IconButton
      onClick={() => toggleSidebar((prev) => !prev)} // Toggles the dropdown
      sx={{
        color: '#0b2747',
        borderRadius: '10px',
      }}
    >
      <MenuIcon />
    </IconButton>

    {/* Dropdown Menu */}
    {isSidebarOpen && (
      <Box
        sx={{
          position: 'absolute',
          top: '100%',
          left: -5,
          width: 'auto', // Dynamically adjusts width based on content
          minWidth: 'fit-content', // Ensures the minimum width fits the text
          background: '#D9D9D9',
          borderRadius: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          padding: '5px 1px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)', // Shadow for better effect
          zIndex: 2,
          animation: 'fadeIn 0.3s ease-in-out', // Smooth fade-in effect
        }}
      >
        {['HOME', 'ABOUT', 'REPAY', 'CONTACT', 'LOAN CALCULATOR'].map((text) => (
          <Link
            key={text}
            to={
              text === 'HOME'
                ? '/'
                : text === 'REPAY'
                ? '/repay-now'
                : text === 'CONTACT'
                ? '/contact-us'
                : text === 'ABOUT'
                ? '/about-us'
                : '/calculator'
            }
            style={{
              color: '#0b2747',
              textDecoration: 'none',
              padding: '10px 15px',
              borderRadius: '5px',
              whiteSpace: 'nowrap', // Prevents text wrapping
              transition: 'background 0.3s ease, transform 0.2s ease', // Smooth hover effect
            }}
            onMouseEnter={(e) => (e.target.style.background = '#f0f0f0')}
            onMouseLeave={(e) => (e.target.style.background = 'transparent')}
            onClick={() => toggleSidebar(false)} // Close the dropdown on click
          >
            {text}
          </Link>
        ))}
      </Box>
    )}
  </Box>

  {/* Apply Button */}
  <Button
    component={Link}
    to="/apply-now"
    variant="contained"
    color="primary"
    sx={{
      backgroundColor: 'black',
      color: 'white',
      padding: '9.9px 18px',
      borderRadius: '10px',
      fontWeight: 'bold',
      zIndex: 2,
      position: 'sticky',
      top: 10, // Set how far from the top you want the button to stick
      '&:hover': {
        backgroundColor: 'gray',
        color: 'white',
      },
      '@media (max-width: 600px)': {
        fontSize: '14px', // Adjust font size for smaller screens
        padding: '8px 12px', // Reduce padding on small screens
      },
    }}
  >
    Apply
  </Button>
</Box>


        </Toolbar>
      </AppBar>

    
    </>
  );
};

export default Header;
