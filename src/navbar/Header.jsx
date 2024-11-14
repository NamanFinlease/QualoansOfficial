import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IconButton,
  AppBar,
  Toolbar,
  Menu,
  MenuItem,
  Box,
  Typography,
  Button,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PaymentIcon from '@mui/icons-material/Payment';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import logo from '../assets/image/Qua Black LOgo (1).png'; // Adjust the path based on your structure
import { useMediaQuery } from '@mui/material';
import { Facebook, Twitter, Instagram, LinkedIn } from '@mui/icons-material';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
      <AppBar position="static" sx={{ backgroundColor: '#f9f9f9' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', minHeight: '64px', marginTop: '30px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center' }} onClick={scrollToTop}>
            <img src={logo} alt="Logo" style={{ width: '51%', height: 'auto' }} />
          </Link>

          <IconButton
            edge="end"
            color="inherit"
            onClick={handleMenuOpen}
            sx={{
              backgroundColor: 'black',
              color: 'white',
              padding: '5px',
              borderRadius: '10px',
              width: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'fixed',
              top: '34px',
              right: '20px',
              zIndex: 1000,
              '&:hover': {
                backgroundColor: 'gray',
              },
            }}
          >
            {open ? <CloseIcon sx={{ fontSize: '20px' }} /> : <MenuIcon sx={{ fontSize: '20px' }} />}
            <Typography variant="h6" sx={{ ml: 1 }}>Menu</Typography>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Box sx={{ background: '#D9D9D9', width: '300px', p: 2 }}>
          <MenuItem onClick={() => { handleMenuClose(); scrollToTop(); }}>
            <Link to="/" style={{ color: '#0b2747', display: 'flex', alignItems: 'center', textDecoration: 'none', width: '100%' }}>
              <HomeIcon sx={{ mr: 1 }} /> HOME
            </Link>
          </MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); scrollToTop(); }}>
            <Link to="/about-us" style={{ color: '#0b2747', display: 'flex', alignItems: 'center', textDecoration: 'none', width: '100%' }}>
              <InfoIcon sx={{ mr: 1 }} /> ABOUT US
            </Link>
          </MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); scrollToTop(); }}>
            <Link to="/repay-now" style={{ color: '#0b2747', display: 'flex', alignItems: 'center', textDecoration: 'none', width: '100%' }}>
              <PaymentIcon sx={{ mr: 1 }} /> REPAY NOW
            </Link>
          </MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); scrollToTop(); }}>
            <Link to="/contact-us" style={{ color: '#0b2747', display: 'flex', alignItems: 'center', textDecoration: 'none', width: '100%' }}>
              <ContactMailIcon sx={{ mr: 1 }} /> CONTACT US
            </Link>
          </MenuItem>

          <Box sx={{ width: '100%', borderTop: '1px solid black', my: 2 }} />

          <Box sx={{ p: 2 }}>
            <Link to="/apply-now" style={{ textDecoration: 'none', width: '100%' }} onClick={scrollToTop}>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#333', color: 'white', borderRadius: '5px', '&:hover': { backgroundColor: '#555' } }}
                fullWidth
                onClick={handleMenuClose}
              >
                <AssignmentIcon sx={{ mr: 1 }} /> APPLY NOW
              </Button>
            </Link>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 2 }}>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook sx={{ color: '#0b2747', cursor: 'pointer' }} />
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter sx={{ color: '#0b2747', cursor: 'pointer' }} />
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <Instagram sx={{ color: '#0b2747', cursor: 'pointer' }} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              <LinkedIn sx={{ color: '#0b2747', cursor: 'pointer' }} />
            </a>
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default Header;
