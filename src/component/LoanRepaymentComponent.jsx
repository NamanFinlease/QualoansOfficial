import { Box, Typography, TextField, Button } from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2';
// Import the image here
import repayaImage from '../assets/image/Qua-Repayment.jpg'; // Replace with your actual image path
import Header from '../navbar/Header';

const LoanRepaymentComponent = () => {
  const [panNumber, setPanNumber] = useState('ABCDE1234F'); // Pre-filled PAN number

  const handleOTPClick = () => {
    Swal.fire({
      title: 'Enter OTP',
      html: `
        <input type="text" maxlength="1" id="otp1" value="1" readonly style="width:30px; height:30px; text-align:center; border:1px solid #ccc; margin-right:5px;">
        <input type="text" maxlength="1" id="otp2" value="2" readonly style="width:30px; height:30px; text-align:center; border:1px solid #ccc; margin-right:5px;">
        <input type="text" maxlength="1" id="otp3" value="3" readonly style="width:30px; height:30px; text-align:center; border:1px solid #ccc; margin-right:5px;">
        <input type="text" maxlength="1" id="otp4" value="4" readonly style="width:30px; height:30px; text-align:center; border:1px solid #ccc; margin-right:5px;">
        <input type="text" maxlength="1" id="otp5" value="5" readonly style="width:30px; height:30px; text-align:center; border:1px solid #ccc; margin-right:5px;">
        <input type="text" maxlength="1" id="otp6" value="6" readonly style="width:30px; height:30px; text-align:center; border:1px solid #ccc;">
      `,
      showCancelButton: true,
      cancelButtonText: 'Resend OTP',
      confirmButtonText: 'Verify OTP',
      customClass: {
        confirmButton: 'swal-button-confirm-orange' // Add custom class to confirm button
      },
      preConfirm: () => {
        const otp = [
          document.getElementById('otp1').value,
          document.getElementById('otp2').value,
          document.getElementById('otp3').value,
          document.getElementById('otp4').value,
          document.getElementById('otp5').value,
          document.getElementById('otp6').value
        ].join('');
  
        if (otp === '123456') { // Static OTP verification
          return true;
        } else {
          Swal.showValidationMessage('Invalid OTP!');
        }
      }
    }).then(result => {
      if (result.isConfirmed) {
        Swal.fire('Verified Successfully!', '', 'success');
        handleRepayClick();
      }
    });
  };
  



  const handleRepayClick = () => {
    Swal.fire({
      title: 'Repay Loan?',
      text: 'Do you want to proceed with repayment?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Repay',
      cancelButtonText: 'Cancel'
    }).then(result => {
      if (result.isConfirmed) {
        window.location.href = '/loandetailstable'; // Redirect to another page
      }
    });
  };

  return (
    <> <Header/>
    
    <Box 
    sx={{
      backgroundColor: '#f9f9f9',
      padding: { xs: '20px', sm: '45px' }, // Adjust padding for small screens
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
    }}
  >
    {/* Image Section */}
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '30vh', md: '50vh' },
        overflow: 'hidden',
        borderRadius: '20px',
        mb: 5,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Box
        component="img"
        src={repayaImage}
        alt="Repay Loan"
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </Box>

    {/* Text and Form Section */}
    <Box
        sx={{
          width: '100%',
          maxWidth: 600,
          margin: 'auto',
          padding: 3,
          boxShadow: 3,
          backgroundColor: '#fff',
          borderRadius: 2, // Rounded corners for a cleaner look
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            marginBottom: 2, 
            fontWeight: 'bold', 
            textAlign: 'center', 
            color: '#333'
          }}
        >
          Please verify the accuracy of the below information before making any transfer.
          If you require further assistance, reach out to <strong>care@qualoan.com</strong>.
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            marginBottom: 3, 
            color: '#555', 
            textAlign: 'center' 
          }}
        >
          Please login with your PAN and OTP to repay your loan.
        </Typography>

        {/* PAN Input and OTP Button Section */}
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <TextField
            label="Enter your PAN No"
            variant="outlined"
            value={panNumber}
            disabled
            sx={{ 
              width: '100%', 
              marginBottom: 2, 
              borderRadius: 1,
              '& .MuiInputBase-root': {
                borderRadius: 1, // Rounded corners
              }
            }}
          />
          <Button 
            variant="contained" 
            onClick={handleOTPClick}
            sx={{
              width: '100%', 
              backgroundColor: '#4D4D4E', 
              color: '#fff',
              '&:hover': {
                backgroundColor: 'orange', // Darker blue on hover
              },
              padding: '12px',
              borderRadius: 1, // Rounded corners
            }}
          >
            Get OTP
          </Button>
        </Box>
</Box>
  </Box>
  </>
  );
};

export default LoanRepaymentComponent;
