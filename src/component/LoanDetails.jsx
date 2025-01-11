import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Avatar, Divider } from "@mui/material";
import { BASE_URL } from "../baseURL";
import { getToken } from "../../tokenManager";

// Define loan the  component
const LoanDetails = () => {
const token = getToken();
    
  // State to store loan data
  const [loan, setLoan] = useState({
    principal: '',
    totalPayble:'',
    intrestPerMonth:'',
    tenureMonth: '',
    loanPurpose:'',
    
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch loan details from the backend API
  useEffect(() => {
    
    
    const fetchLoanData = async () => {
        try {
        //   const token =
        //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2UzZmQxMDczYjMxNTQyNjU3YTI3ZSIsImlhdCI6MTczNjMyNzEyMiwiZXhwIjoxNzM4OTE5MTIyfQ.SDrVOSRa2_x5RC6JBRtdL_yzxkZQPn61dJHmLpI4oQI";

          const response = await fetch(`${BASE_URL}/api/loanApplication/getApplicationDetails?applicationStatus=loanDetails`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
            // console.log(response);
            
          // Check if the response status is OK
          if (!response.ok) {
            throw new Error("Failed to fetch loan data");
          }
      
          // Parse the JSON data from the response
          const data = await response.json();

      
        setLoan({

           
            principal: data?.data?.principal,
            totalPayble: data?.data?.totalPayble,
            intrestPerMonth: data?.data?.intrestPerMonth,  // Fixed field for Date of Birth
            tenureMonth: data?.data?.tenureMonth,
            loanPurpose: data?.data?.loanPurpose,  // Corrected syntax issue
          });

        } catch (err) {
          setError(err.message); // Handle any errors
        } finally {
          setLoading(false); // Set loading to false once the API request is complete
        }
      };
      
      
    fetchLoanData(); // Call the fetch function
  }, []); // Empty dependency array to fetch data only once when the component mounts

  // Show loading state while fetching data

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  // Show error if there's an issue with the API request
  if (error) {
    return <Typography variant="h6" align="center" color="error">{error}</Typography>;
  }

  // If no loan data, show a message
  if (!loan) {
    return <Typography variant="h6" align="center">No user data found.</Typography>;
  }

  return (
    <Box
    sx={{
      padding: 3,
      backgroundColor: "#4D4D4E", // Updated background color
      boxShadow: 3,
      borderRadius: 3,

      width: "60%", // Decreased width (can adjust as needed)
      height: "auto", // Increased height (auto for dynamic adjustment)
      maxWidth: "400px", // Set a max width if needed
      margin: "auto", // Center the box
    }}
  >
    <Typography
      variant="h4"
      gutterBottom
      align="center"
      sx={{ mb: 3, color: "white" }} // Set text color to white
    >
      Loan Information
    </Typography>
  
    {/* Profile Picture */}
    
  
    <Divider sx={{ marginBottom: 2 }} />
  
    {/* Profile Details (Stacked in a column) */}
    <Grid container direction="column" spacing={2}>

    <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong>Principal:</strong> {loan.principal}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong>IntrestPerMonth:</strong> {loan.intrestPerMonth}
        </Typography>
      </Grid>
      {/* PAN Number */}
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong>TenureMonth:</strong> {loan.tenureMonth}
        </Typography>
      </Grid>
  
      {/* Aadhaar Number */}
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong> LoanPurpose:</strong> {loan.loanPurpose}
        </Typography>
      </Grid>

    </Grid>
  </Box>
  
  
);
};

export default LoanDetails;
