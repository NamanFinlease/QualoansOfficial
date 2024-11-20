import React from 'react';
import { Email, Phone, LocationOn, Facebook, Twitter, LinkedIn, Instagram, YouTube } from '@mui/icons-material';
import { Container, Grid, Typography, Link, Box } from '@mui/material';
import logo from '../assets/image/Group 26.png';

const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  color: '#fff',
  fontSize: '1rem',
  textDecoration: 'none',
  marginBottom: '8px',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#f0a500',
  },
};

const Footer = () => {
  return (
    <Box sx={{ 
      background: '#f9f9f9', 
      width: '100%', 
      display: 'flex', 
    }}>   
 <Box sx={{
       margin:5,
        borderRadius: 10,
        backgroundColor: '#000',
        padding: '80px 30px',
        color: '#fff',
        position: 'relative',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
      }}>
      <footer>
        <Container maxWidth="lg" style={{ position: 'relative', zIndex: 1  }}>
          <Grid container spacing={3} alignItems="center">
            {/* Left Section (Logo and Social Icons) */}
            <Grid item xs={12} md={4} container spacing={3} direction="column" justifyContent="center" alignItems="center">
              <img src={logo} alt="Logo" style={{ width: '50%', height: 'auto',mb:5 }} /> {/* Logo */}
              <Box display="flex" gap={2} justifyContent="center" mt={5}> {/* Social Media Icons */}
                <Link href="https://www.facebook.com/profile.php?id=61567546377871" sx={{ ...iconStyle, backgroundColor: '#4267B2' }}><Facebook /></Link>
                <Link href="https://x.com/speedo_loan" sx={{ ...iconStyle, backgroundColor: '#1DA1F2' }}><Twitter /></Link>
                <Link href="https://www.linkedin.com/company/speedo-loan/about/?viewAsMember=true" target="_blank" sx={{ ...iconStyle, backgroundColor: '#0077B5' }}><LinkedIn /></Link>
                <Link href="https://www.instagram.com/speedo.loan/" target="_blank" sx={{ ...iconStyle, backgroundColor: '#C13584' }}><Instagram /></Link>
                <Link href="https://www.youtube.com/@SpeedLoans" target="_blank" sx={{ ...iconStyle, backgroundColor: '#FF0000' }}><YouTube /></Link>
              </Box>
            </Grid>

            {/* Right Section (Fast Link, Resources, Contact) */}
            <Grid item xs={12} md={8} container spacing={3} direction="row" justifyContent="flex-start">
              {/* Fast Links Section */}
              <Grid item xs={12} sm={4} sx={{ paddingTop: '12px' }}>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 500, mb: 2 }}>Fast Link</Typography>
                <Box component="ul" sx={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  <li><Link href="/" sx={linkStyle}>Home</Link></li>
                  <li><Link href="about-us" sx={linkStyle}>About Us</Link></li>
                  <li><Link href="apply-now" sx={linkStyle}>Apply Now</Link></li>
                  <li><Link href="repay-now" sx={linkStyle}>Repay Now</Link></li>
                  <li><Link href="contact-us" sx={linkStyle}>Contact Us</Link></li>
                </Box>
              </Grid>

              {/* Resources Section */}
              <Grid item xs={12} sm={4} sx={{ paddingTop: '12px' }}>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 500, mb: 2 }}>Resources</Typography>
                <Box component="ul" sx={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  <li><Link href="terms-condition" sx={linkStyle}>Terms & Conditions</Link></li>
                  <li><Link href="privacy-policy" sx={linkStyle}>Privacy Policy</Link></li>
                  <li><Link href="fqa" sx={linkStyle}>FAQs</Link></li>
                </Box>
              </Grid>

              {/* Contact Us Section */}
              <Grid item xs={12} sm={4} sx={{ paddingTop: '12px' }}>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 500, mb: 2 }}>Contact Us</Typography>
                <Box component="ul" sx={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                  <li><Link href="contact-us" sx={{ ...linkStyle, display: 'flex', alignItems: 'center' }}><Email sx={{ mr: 1 }} /> info@qualoan.com</Link></li>
                  <li><Link href="contact-us" sx={{ ...linkStyle, display: 'flex', alignItems: 'center' }}><Phone sx={{ mr: 1 }} /> +91 9999999341</Link></li>
                  <li><Link href="contact-us" sx={{ ...linkStyle, display: 'flex', alignItems: 'center' }}><LocationOn sx={{ mr: 1 }} /> S-370, Panchsheel Park, New Delhi 110017, India</Link></li>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Container>

        {/* Footer Bottom */}
        <Box mt={2} py={1} style={{
          backgroundColor: 'rgba(128, 128, 128, 0.2)',
          textAlign: 'center',
          borderRadius: '0 0 10px 10px',
          boxShadow: '0 -3px 10px rgba(0, 0, 0, 0.3)',
        }}>
          <Typography variant="body2" style={{ color: '#fff', textShadow: '1px 1px 2px rgba(0, 0, 0, 0.7)' }}>
            Copyright &copy; 2024 QuaLoan. All Rights Reserved.
          </Typography>
        </Box>
      </footer>
    </Box>
    </Box>
  );
};

const iconStyle = {
  color: '#fff',
  backgroundColor: '#1DA1F2', // Default background color for icons
  borderRadius: '50%',
  padding: '8px',
  fontSize: '20px',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.1)',
  },
};

export default Footer;
