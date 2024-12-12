import React from 'react';
import { Email, Phone, LocationOn, Facebook, Twitter, LinkedIn, Instagram, YouTube } from '@mui/icons-material';
import { Container, Grid, Typography, Link, Box } from '@mui/material';
import logo from '../assets/image/White.webp';
import TwitterIcon from '../assets/image/x.jpg'; // Replace with the correct path to your image


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
  margin: 5,
  borderRadius: 10,
  backgroundColor: 'rgb(47, 47, 47)',
  padding: {
    xs: '40px 20px', // padding for extra small screens (mobile)
    sm: '60px 30px', // padding for small screens (tablet)
    md: '80px 30px', // padding for medium and larger screens (desktop)
  },
  color: '#fff',
  position: 'relative',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
}}>

      <footer>
        <Container maxWidth="lg" style={{ position: 'relative', zIndex: 1  }}>
          <Grid container spacing={3} alignItems="center">
            {/* Left Section (Logo and Social Icons) */}
            <Grid item xs={12} md={4} container spacing={3} direction="column" justifyContent="center" alignItems="center">
              <img src={logo} alt="Logo" style={{ width: '60%', height: 'auto',mb:5 }} />
              <Box display="flex" gap={2} justifyContent="center" mt={5}> {/* Social Media Icons */}
                <Link href="/" sx={{ ...iconStyle, backgroundColor: '#4267B2' }}><Facebook /></Link>
                              <Link 
                href="/" 
                sx={{ 
                  ...iconStyle, 
                  backgroundColor: '#1DA1F2',
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center',
                }}
              >
                <img 
                  src={TwitterIcon} 
                  alt="Twitter" 
                  style={{ width: '24px', height: '24px' }} // Adjust size as needed
                />
              </Link>
                <Link href="/" target="_blank" sx={{ ...iconStyle, backgroundColor: '#0077B5' }}><LinkedIn /></Link>
                <Link href="/" target="_blank" sx={{ ...iconStyle, backgroundColor: '#C13584' }}><Instagram /></Link>
                <Link href="/" target="_blank" sx={{ ...iconStyle, backgroundColor: '#FF0000' }}><YouTube /></Link>
              </Box>
            </Grid>

            {/* Right Section (Fast Link, Resources, Contact) */}
            <Grid item xs={12} md={8} container spacing={3} direction="row" justifyContent="flex-start">
              {/* Fast Links Section */}
              <Grid item xs={12} sm={4} sx={{ paddingTop: '12px' }}>
                <Typography variant="h6" sx={{ color: '#fff', fontWeight: 500, mb: 2 }}>Fast Links</Typography>
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
                  <li><Link href="contact-us" sx={{ ...linkStyle, display: 'flex', alignItems: 'center' }}><LocationOn sx={{ mr: 1,mt:{xs:-5,md:-5} }} />229, 2nd Floor, Vipul Agora Mall, MG Road, Gurugram, Haryana - 122001</Link></li>
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
            Copyright &copy; 2024 QUA Loan. All Rights Reserved.
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
