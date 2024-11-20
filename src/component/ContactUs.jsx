import React from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import Swal from 'sweetalert2';
import aboutImage from '../assets/image/contact us qua (1).webp';

const AboutUs = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    Swal.fire({
      icon: 'success',
      title: 'Thank You!',
      text: 'We will get in touch with you soon.',
      confirmButtonText: 'OK',
    });
  };

  return (
    <Box
      sx={{
      
        background: '#f9f9f9',
        minHeight: '100vh',
        padding: '40px',
      }}
    >
      {/* Banner Section */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '20vh', md: '60vh' },
          overflow: 'hidden',
          borderRadius: '20px',
          mb: 5,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Box
          component="img"
          src={aboutImage}
          alt="About Us Banner"
          sx={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>

      {/* Content Section */}
      <Box
        sx={{
          marginTop:{xs:2,md:10},
          background: ' #f9f9f9',
          minHeight: '100vh',
          padding: '0px',
        }}
      >
        <Grid container spacing={4}>
          {/* Left Section */}
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: '#444',
                mb: 2,
                fontSize: { xs: '24px', md: '36px' },
              }}
            >
              We are always ready to help you and answer your questions
            </Typography>
            <Typography
              sx={{
                color: '#555',
                fontSize: '18px',
                mb: 3,
              }}
            >
              Your satisfaction is our priority, and we strive to offer prompt and reliable support at all times.
            </Typography>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '18px',
                color: '#FF5722',
                mb: 1,
              }}
            >
              Call Center
            </Typography>
            <Typography sx={{ mb: 1 }}>+91 9999999341</Typography>
           
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '18px',
                color: '#FF5722',
                mb: 1,
              }}
            >
              Email
            </Typography>
            <Typography sx={{ mb: 3 }}>info@qualoan.com</Typography>
            <Typography
              sx={{
                fontWeight: 'bold',
                fontSize: '18px',
                color: '#FF5722',
                mb: 1,
              }}
            >
              Location
            </Typography>
            <Typography>S-370, Panchsheel Park,</Typography>
            <Typography>New Delhi 110017, India</Typography>
          </Grid>

          {/* Right Section: Form */}
          <Grid item xs={12} md={6}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '30px',
                borderRadius: '15px',
                boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.15)',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  mb: 3,
                  textAlign: 'center',
                  color: '#333',
                }}
              >
                Get in Touch
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Full Name"
                    variant="standard"
                    fullWidth
                    required
                    InputProps={{
                      disableUnderline: false,
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontSize: '16px',
                        borderBottom: '2px solid #000',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Email"
                    type="email"
                    variant="standard"
                    fullWidth
                    required
                    InputProps={{
                      disableUnderline: false,
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontSize: '16px',
                        borderBottom: '2px solid #000',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Phone Number"
                    type="tel"
                    variant="standard"
                    fullWidth
                    required
                    InputProps={{
                      disableUnderline: false,
                    }}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontSize: '16px',
                        borderBottom: '2px solid #000',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Message"
                    variant="standard"
                    fullWidth
                    multiline
                    rows={4}
                    sx={{
                      '& .MuiInputBase-input': {
                        fontSize: '16px',
                        borderBottom: '2px solid #000',
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                      backgroundColor: '#444',
                      color: '#fff',
                      padding: '10px',
                      '&:hover': {
                        backgroundColor: '#FF5722',
                      },
                    }}
                  >
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Google Map Section */}
      <Box
        sx={{
          paddingX:1,
          display: 'flex',
          mb: { xs: -5, md: 0}, // Add margin-bottom for small screens only
          mt:{xs:5,md:-1}
        }}
      >
        <Box
          component="iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.246459582324!2d-122.08574968468185!3d37.42206527982659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5c44d6b41d3%3A0x30a9d6a89a2384e!2sGoogleplex!5e0!3m2!1sen!2sus!4v1614693744843!5m2!1sen!2sus"
          allowFullScreen
          loading="lazy"
          sx={{
            
            width: '100%',
            height: { xs: '200px', md: '300px' },
            border: 0,
            borderRadius: '30px',
          }}
        />
      </Box>
    </Box>
  );
};

export default AboutUs;
