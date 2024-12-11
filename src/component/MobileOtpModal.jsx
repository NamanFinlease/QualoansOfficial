import React, { useState, useRef, useEffect } from 'react';
import { Box, TextField, Button, Typography, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import { BASE_URL } from '../baseURL';

const MobileOtpModal = ({ open,mobile, onClose,setIsMobileVerified }) => {
  const [aadhaarModal, setAadhaarModal] = useState(false)

  const { id } = useParams();
  const [otp, setOtp] = useState(Array(6).fill(''));
  const [timeLeft, setTimeLeft] = useState(30); // 30 seconds countdown for resend
  const [resendMSGTime, setResendMSGTime] = useState(0); 
  const inputRefs = useRef([]);

  // Handle OTP input
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (value.match(/^[0-9]$/)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input box
      if (index < 5) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === '') {
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  // Handle key press for deleting or backspace
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResend = async() => {
    try {
      const response = await axios.post(`${BASE_URL}/api/verify/mobile/get-otp`, {
        mobile: mobile,
        fName: "",
        lName:"" ,
      });

      if (response.data.success) {
        setTimeLeft(30)
        setResendMSGTime(30)
      } else {
        throw new Error(response.data.message || 'Failed to send OTP');
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message || 'Failed to send OTP. Please try again later.',
      });
    }
  };


  // Countdown logic for Resend OTP
  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    }
   
  }, [timeLeft]);
  useEffect(() => {
    
    if (resendMSGTime > 0) {
      const timer = setTimeout(() => setResendMSGTime(resendMSGTime - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendMSGTime]);


  // Handle form submit
  const handleSubmit =async () => {
    const data = otp.join('');
   
      try {
        const response = await axios.post(`${BASE_URL}/api/verify/mobile/verify-otp`, {
          otp:data,
          mobile
        });
  
        if (response.data.success) {
          onClose()
          setIsMobileVerified(true)
          Swal.fire({
            icon: 'success',
            title: 'OTP Verified Successfully',
          })
        } else {
          throw new Error(response.data.message || 'Failed to verify OTP');
        }
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.message || 'Failed to verify OTP. Please try again later.',
        });
      }
  };



  return (
    <Dialog open={open} >
      <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold' }}>OTP Verification</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
          <Typography variant="body1" align="center" color="#000000">
            Enter the 6-digit OTP sent to your mobile number.
          </Typography>

          {/* OTP Input Fields */}
          <Box display="flex" justifyContent="center" gap={2} mb={3}>
            {otp.map((digit, index) => (
              <TextField
                key={index}
                variant="outlined"
                inputProps={{
                  maxLength: 1,
                  style: {
                    textAlign: 'center',
                    fontSize: '20px',
                    padding: '10px',
                    color:'#525150',
                  },
                }}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                inputRef={(el) => (inputRefs.current[index] = el)}
                sx={{
                  width: 50,
                  height: 50,
                  backgroundColor: '#f3f3f3',
                  borderRadius: '8px',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    borderColor: '#1976D2',
                    '&:hover': {
                      borderColor: '#43a047',
                    },
                  },
                  '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#1976D2',
                    boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.1)',
                  },
                }}
              />
            ))}
          </Box>

          <Typography variant="body2" color="#19b338" align="center">
            {resendMSGTime > 0 && `OTP  sent successfully.`}
          </Typography>
          <Typography variant="body2" color="#000000" align="center">
            {timeLeft > 0
              ? `Resend OTP in ${timeLeft}s`
              : <Button onClick={handleResend} sx={{ color: '#1976D2', fontWeight: 'bold' }}>Resend OTP</Button>}
          </Typography>

        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" color="primary" sx={{ fontWeight: 'bold' }}>
          Submit
        </Button>
        {/* <Button onClick={onClose} sx={{ fontWeight: 'bold' }}>Close</Button> */}
      </DialogActions>
    </Dialog>
  );
};

export default MobileOtpModal;
