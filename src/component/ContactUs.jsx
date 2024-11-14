import React from 'react';
import { TextField, Button, Grid, Typography, Box } from '@mui/material';
import Swal from 'sweetalert2'; // Import SweetAlert
// import './ContactUs.css'; 
import aboutImage from '../assets/image/contact us qua (1).webp';
import backgroundImg from '../assets/image/Frame 446.png'; // Import the background image

const ContactUs = () => {
 
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission
    console.log('Form submitted!'); // Check if this log appears

    // Show SweetAlert notification
    Swal.fire({
      icon: 'success',
      title: 'Thank You!',
      text: 'Thank you for connecting!',
      confirmButtonText: 'OK'
    });

    // You can also perform additional actions here, like sending the form data to your server
  };

  return (
    <>
 <Box 
        sx={{ 
          background:'#f9f9f9',

          backgroundImage: `url(${backgroundImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh', // Adjust height as needed
          padding: '30px',
        }}
      >
    
      {/* Image Section */}
      <Box 
        sx={{ 
          position: 'relative',
          width: '100%',
          height: { xs: '20vh', sm: '30vh', md: '40vh', lg: '90vh' },          
          overflow: 'hidden',
          mb: 2,
        }}
      >
        <Box
          component="img"
          src={aboutImage}
          alt="Contact Us"
          sx={{

            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            padding:{xs:'0px',md:"20px"},
            border:'2px ',
            borderRadius:'50px'
          }}
        />
      </Box>

        {/* Contact Information Section */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h2"
            sx={{
              marginTop: '40px',
              color: '#333',
              fontWeight: 'bold',
              '&:hover': { color: '#FFA726' },
              fontSize: { xs: '24px', sm: '30px', md: '36px', lg: '48px' }
            }}
          >
            Do You Still Have <br /> Some Queries?
          </Typography>

          <Grid container spacing={2} justifyContent="center" mt={6}>
            {/* Email Box */}
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  padding: '20px',
                  width: '290px',
                  height: '300px',
                  background: '#A77AE2',
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '12px',
                  textAlign: 'center',
                  mx: { xs: 'auto', md: '180px' },
                  mb: { xs: 2, sm: 0 },
                }}
              >
                <i className="fas fa-envelope" style={{ fontSize: '24px', marginBottom: '8px' }}></i>
                <Typography sx={{ fontSize: '24px', fontWeight: '500' }}>Email</Typography>
                <p>info@QUAloan.com</p>
              </Box>
            </Grid>

            {/* Phone Box */}
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  padding: '20px',
                  width: '290px',
                  height: '300px',
                  background: '#EB685A',
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '12px',
                  textAlign: 'center',
                  mx: { xs: 'auto', md: '50px' },
                  mb: { xs: 2, sm: 0 },
                }}
              >
                <i className="fas fa-phone-alt" style={{ fontSize: '24px', marginBottom: '8px', transform: 'rotate(90deg)' }}></i>
                <Typography sx={{ fontSize: '24px', fontWeight: '500' }}>Phone</Typography>
                <p>+91 9999999341</p>
              </Box>
            </Grid>

            {/* Address Box */}
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  padding: '20px',
                  width: '290px',
                  height: '300px',
                  background: '#AFD97E',
                  color: '#fff',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: '12px',
                  textAlign: 'center',
                  mx: { xs: 'auto', md: '-80px' },
                }}
              >
                <i className="fas fa-map-marker-alt" style={{ fontSize: '24px', marginBottom: '8px' }}></i>
                <Typography sx={{ fontSize: '24px', fontWeight: '500' }}>Address</Typography>
                <p>S-370, Panchsheel Park,
                New Delhi 110017, India</p>
              </Box>
            </Grid>
          </Grid>
        </Box>

        

            {/* Contact Us Form */}
            <Grid container spacing={2} mt={5} mb={5}>
                        <Grid item xs={12} textAlign="center">
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold',marginTop:'50px' }}>
                Or Write To Us
              </Typography>
            </Grid>


            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Box 
                component="form" 
                onSubmit={handleSubmit} 
                sx={{
                  background: 'rgba(217, 217, 217, 0.5)', // Light gray with 50% transparency
                  width: '110%', 
                  padding: '50px', 
                  borderRadius: '30px',
                  border: '2px solid white',
                  mt: 3,
                  maxWidth: '500px',
                  marginBottom:'40px',

                }}

              >
                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={12}>
                    <TextField 
                      label="Full Name" 
                      variant="outlined" 
                      fullWidth 
                      required 
                      InputProps={{
                        sx: { 
                          borderRadius: '15px',
                          height: '50px', // Set the desired height here
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      label="Email" 
                      variant="outlined" 
                      fullWidth 
                      required 
                      type="email" 
                      InputProps={{
                        sx: { 
                          borderRadius: '15px',
                          height: '50px', // Set the desired height here
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      label="Phone Number" 
                      variant="outlined" 
                      fullWidth 
                      required 
                      type="tel" 
                      InputProps={{
                        sx: { 
                          borderRadius: '15px',
                          height: '50px', // Set the desired height here
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      label="City" 
                      variant="outlined" 
                      fullWidth 
                      required 
                      InputProps={{
                        sx: { 
                          borderRadius: '15px',
                          height: '50px', // Set the desired height here
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField 
                      label="Message" 
                      variant="outlined" 
                      fullWidth 
                      multiline 
                      rows={4} 
                      required 
                      InputProps={{
                        sx: { 
                          borderRadius: '15px',
                        },
                      }}
                      
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button 
                      variant="contained" 
                      type="submit" 
                      fullWidth
                      sx={{ 
                        padding: '10px',
                        borderRadius: '15px', 
                        backgroundColor: '#444444', // Light black color
                        '&:hover': { backgroundColor: 'orange' }, 
                      }}
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} sx={{ marginTop:"27px", justifyContent: 'center', alignItems: 'center' }}>
          <Box
            component="iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.246459582324!2d-122.08574968468185!3d37.42206527982659!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb5c44d6b41d3%3A0x30a9d6a89a2384e!2sGoogleplex!5e0!3m2!1sen!2sus!4v1614693744843!5m2!1sen!2sus"
            sx={{
              width: '90%',
              maxWidth: '500px',
              height: { xs: '50vh', md: '98vh' },
              border: 0,
              borderRadius: '40px',
            }}
            allowFullScreen
            loading="lazy"
          />
        </Grid>

            </Grid>


      </Box>
    </>
  );
};

export default ContactUs;
