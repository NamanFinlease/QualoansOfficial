import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import { CheckCircle, Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // For page redirection
import Header from '../navbar/Header';

const LoanDetailsTable = () => {
  const navigate = useNavigate();

  // Dummy data for the loan details table
  const loanData = [
    {
      leadId: 'LID001',
      loanNo: 'LN001',
      loanType: 'Personal Loan',
      name: 'John Doe',
      loanAmount: '₹50000',
      roi: 1,
      disbursalDate: '2025-01-02',
      repaymentDate: '2025-02-02',
      status: 'Active',
    },
    {
      leadId: 'LID002',
      loanNo: 'LN002',
      loanType: 'Personal Loan',
      name: 'John Doe',
      loanAmount: '₹80000',
      roi: 1,
      disbursalDate: '2024-08-01',
      repaymentDate: '2024-09-01',
      status: 'Closed',
    },
  ];

  // Handle the eye icon click (redirect to another page)
  const handleEyeClick = (loanNo) => {
    navigate(`/loanstatus`); // Redirect to loan details page
  };

  return (
    <>
      <Header />
      <Box sx={{ width: '100%', padding: 3 }}>
        {/* Center the heading */}
        <Typography variant="h6" sx={{ marginBottom: 3, fontWeight: 'bold', textAlign: 'center' }}>
          Loan Repayment Details
        </Typography>

        {/* Table to show the loan details */}
        <TableContainer sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                {/* Apply background color to all header cells */}
                <TableCell sx={{ backgroundColor: '#f0f0f0' }}>Lead ID</TableCell>
                <TableCell sx={{ backgroundColor: '#f0f0f0' }}>Loan No</TableCell>
                <TableCell sx={{ backgroundColor: '#f0f0f0' }}>Loan Type</TableCell>
                <TableCell sx={{ backgroundColor: '#f0f0f0' }}>Name</TableCell>
                <TableCell sx={{ backgroundColor: '#f0f0f0' }}>Loan Amount</TableCell>
                <TableCell sx={{ backgroundColor: '#f0f0f0' }}>ROI (%)</TableCell>
                <TableCell sx={{ backgroundColor: '#f0f0f0' }}>Disbursal Date</TableCell>
                <TableCell sx={{ backgroundColor: '#f0f0f0' }}>Repayment Date</TableCell>
                <TableCell sx={{ backgroundColor: '#f0f0f0' }}>Status</TableCell>
                <TableCell sx={{ backgroundColor: '#f0f0f0' }}>Options</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loanData.map((loan, index) => (
                <TableRow key={index}>
                  {/* Apply light gray background color to table data cells */}
                  <TableCell sx={{ backgroundColor: '#f9f9f9' }}>{loan.leadId}</TableCell>
                  <TableCell sx={{ backgroundColor: '#f9f9f9' }}>{loan.loanNo}</TableCell>
                  <TableCell sx={{ backgroundColor: '#f9f9f9' }}>{loan.loanType}</TableCell>
                  <TableCell sx={{ backgroundColor: '#f9f9f9' }}>{loan.name}</TableCell>
                  <TableCell sx={{ backgroundColor: '#f9f9f9' }}>{loan.loanAmount}</TableCell>
                  <TableCell sx={{ backgroundColor: '#f9f9f9' }}>{loan.roi}</TableCell>
                  <TableCell sx={{ backgroundColor: '#f9f9f9' }}>{loan.disbursalDate}</TableCell>
                  <TableCell sx={{ backgroundColor: '#f9f9f9' }}>{loan.repaymentDate}</TableCell>
                  <TableCell sx={{ backgroundColor: '#f9f9f9' }}>{loan.status}</TableCell>
                  <TableCell sx={{ backgroundColor: '#f9f9f9' }}>
                    {/* Show Eye icon for active loans, Green tick for closed loans */}
                    {loan.status === 'Active' ? (
                      <IconButton color="primary" onClick={() => handleEyeClick(loan.loanNo)}>
                        <Visibility />
                      </IconButton>
                    ) : (
                      <IconButton color="success" disabled>
                        <CheckCircle />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default LoanDetailsTable;
