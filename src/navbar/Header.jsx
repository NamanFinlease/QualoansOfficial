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
              borderRadius: isSidebarOpen ? '0px 10px 10px 0px' : '10px',
              position: 'relative',
              gap: { xs: 1, sm: 2 }, // Adjust gap for smaller screens
              '@media (max-width: 600px)': {
                padding: '4px', // Reduce padding for small screens
              },
            }}
          >
            {/* Sidebar Drawer */}
            {isSidebarOpen && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: '-150%',
                  width: '200%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  padding: '10px',
                  backgroundColor: '#D9D9D9',
                  borderRadius: '10px 0px 0px 10px',
                  zIndex: 2,
                  animation: 'slideInSidebar 1s ease-out forwards', // Sidebar animation
                  '@media (max-width: 600px)': {
                    width: '220%', // Adjust width for small screens
                    left: '-190%',
                    padding: '6.7px',
                  },
                }}
                onMouseLeave={() => toggleSidebar(false)} // Close on mouse leave
              >
                {['HOME', 'ABOUT', 'REPAY', 'CONTACT'].map((text, index) => (
                  <Link
                    key={text}
                    to={
                      text === 'HOME'
                        ? '/'
                        : text === 'REPAY'
                        ? '/repay-now'
                        : text === 'CONTACT'
                        ? '/contact-us'
                        : '/about-us'
                    }
                    style={{
                      color: '#0b2747',
                      textDecoration: 'none',
                      padding: '5px 10px',
                      borderRadius: '10px',
                      animation: `textFadeIn 0.5s ease-out ${1 + index * 0.3}s forwards`, // Text appears after box
                      opacity: 0,
                    }}
                    onClick={() => toggleSidebar(false)}
                  >
                    {text}
                  </Link>
                ))}
              </Box>
            )}

            {/* IconButton */}
            <IconButton
              onMouseEnter={() => toggleSidebar(true)}
              sx={{
                color: 'white',
                borderRadius: '10px',
                padding: '5px',
                paddingX: { xs: '10px', sm: '20px' }, // Adjust padding for small screens
                opacity: isSidebarOpen ? 0 : 1,
                transition: 'opacity 0.3s ease',
              }}
            >
              <MenuIcon />
            </IconButton>

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

      {/* Keyframe Animations */}
      <style>
        {`
          /* Sidebar Slide-in Animation */
          @keyframes slideInSidebar {
            from {
              transform: translateX(30%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }

          /* Text Fade-in Animation */
          @keyframes textFadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </>
  );
};

export default Header;
