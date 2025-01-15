import React from 'react';
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import repayaImage from '../assets/image/Repay Now qua (1).webp'; // Adjust path as per your project structure
import Header from '../navbar/Header';

const PaymentOptions = () => {
  const navigate = useNavigate();

  // Payment data structured as field-value pairs
  const paymentDetails = [
    { field: 'Loan Number', value: 'LN001' },
    { field: 'Total Payable Amount (₹)', value: '₹65,000' },
    { field: 'Payment Gateway 1', value: 'Easebuzz' },
  ];

  // Handle navigation to the payment page
  const handlePayNow = () => {
    navigate('/payment-page');
  };

  return (
    <>
    <Header/>
    <Box
      sx={{
        background: '#f9f9f9',
        minHeight: '100vh',
        padding: { xs: '20px', sm: '45px' },
      }}
    >
      {/* Image Section */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: { xs: '20vh', md: '40vh' },
          overflow: 'hidden',
          borderRadius: '12px',
          mb: 4,
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

      {/* Content Section with Table and Button */}
      <Box
        sx={{
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        {/* Heading */}
        <Typography
          variant="h6"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#4D4D4E',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: 2,
          }}
        >
          Payment Option | Company Code - VFL
        </Typography>

        {/* Table for Payment Fields and Values */}
        <TableContainer component={Paper} sx={{ marginBottom: 3, borderRadius: '8px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', backgroundColor: 'gray' }}>
                  Field
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', color: '#ffffff', backgroundColor: 'gray' }}>
                  Value
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paymentDetails.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: '#f0f0f0',
                    '&:hover': {
                      transform: 'scale(0.98)',
                      backgroundColor: '#eaeaea',
                      transition: 'transform 0.2s',
                    },
                  }}
                >
                  <TableCell sx={{ color: '#555' }}>{item.field}</TableCell>
                  <TableCell sx={{ color: '#757575', fontWeight: 'bold' }}>{item.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pay Now Button */}
        <Box sx={{ textAlign: 'center', marginTop: 2 }}>
          <Button
            variant="contained"
            onClick={handlePayNow}
            sx={{
              backgroundColor: '#4D4D4E',
              color: 'white',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: 2,
              '&:hover': {
                backgroundColor: 'orange',
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

export default PaymentOptions;
