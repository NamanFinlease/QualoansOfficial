import React from 'react';
import { Box, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { orange } from '@mui/material/colors';
import Header from '../navbar/Header';

const LoanStatus = () => {
  const navigate = useNavigate();

  // Dummy loan status data
  const loanData = {
    loanNo: 'LN001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    pan: 'ABCDE1234F',
    disbursalDate: '2024-01-02',
    repaymentDate: '2025-02-02',
    repaymentAmount: '₹50,000',
    realInterest: '₹15,000',
    penalInterest: '₹0',
    totalPayableAmount: '₹65,000',
    mobile: '1234567890',
    loanAmount: '₹50000',
    roi: 1,
    tenure: 30 ,
    penaltyTenure: 0,
    paidAmount: '₹0',
    payableAmount: '₹65,000',
  };

  const handlePayNow = () => {
    navigate('/payment-option');
  };

  const loanDataEntries = Object.entries(loanData);

  return (
    <>
    <Header/>
    <Box sx={{padding:4,maxWidth:900, margin:'0 auto', border:'1px solid #ddd', borderRadius: 2, bgcolor:'#4D4D4D'}}  >

      {/* Heading */}
      <Typography
        variant="h5"
        color="white"
        sx={{
          backgroundColor: orange[500],
          padding: '10px 0',
          textAlign: 'center',
          borderRadius: 2,
          fontWeight: 'bold',
          marginBottom: 2,
        }}
      >
        Loan Status
      </Typography>

    <Box sx={{ padding: 4, maxWidth: 750, margin: '0 auto', border: '1px solid #ddd', borderRadius: 2, boxShadow: 2 , bgcolor:'white'}}>
      

      {/* Loan Data Display with Hover Effect */}
      <Box sx={{ marginBottom: 3 }}>
        <Grid container spacing={2}>
          {loanDataEntries.map((entry, index) => (
            <Grid
              container
              item
              xs={12}
              sm={6}
              key={index}
              sx={{
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'scale(1.05)',
                  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                },
              }}
            >
              <Grid item xs={6}>
                <Typography variant="body1" sx={{ fontWeight: 'bold', color: 'gray' }}>
                  {entry[0].replace(/([A-Z])/g, ' $1').toUpperCase()}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '14px',
                    color: '#333',
                    backgroundColor: '#f5f5f5',
                    padding: '4px 8px',
                    borderRadius: '4px',
                  }}
                >
                  {entry[1]}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Pay Now Button */}
      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          onClick={handlePayNow}
          sx={{
            bgcolor: 'orange',
            padding: '10px 20px',
            fontSize: '14px',
            borderRadius: 2,
            maxWidth: 180,
            '&:hover': {
              backgroundColor: '#4D4D4E',
            },
          }}
        >
          Pay Now
        </Button>
      </Box>
    </Box>
    
    </Box>
    </>

  );
};

export default LoanStatus;
