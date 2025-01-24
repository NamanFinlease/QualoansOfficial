import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Avatar, Divider } from "@mui/material";
import { BASE_URL } from "../baseURL";
import { getToken } from "../../tokenManager";
import { sharedStyles } from "./shared/styles";

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
              // Authorization: `Bearer ${token}`, // Uncomment if token is needed
            },
            credentials: 'include', // Ensures that cookies are included with the request
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
<Box sx={sharedStyles.containerBox}>
            <Typography variant="h4" sx={sharedStyles.title}>
      Loan Information
    </Typography>
  
    {/* Profile Picture */}
    
   <Divider sx={sharedStyles.divider} />
    
  
      
  
    {/* Profile Details (Stacked in a column) */}
    <Grid container sx={sharedStyles.gridContainer}>

    <Grid item xs={12}>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      
      <Typography sx={sharedStyles.fieldLabel}>Principal:</Typography>
      <Typography sx={sharedStyles.fieldValue}>{loan.principal}</Typography>
        </Box>
       
      </Grid>
      <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      
      <Typography sx={sharedStyles.fieldLabel}>IntrestPerMonth:</Typography>
      <Typography sx={sharedStyles.fieldValue}>{loan.intrestPerMonth}</Typography>
        </Box>
        
      </Grid>
      {/* PAN Number */}
      <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      
      <Typography sx={sharedStyles.fieldLabel}>Tenure Month:</Typography>
      <Typography sx={sharedStyles.fieldValue}>{loan.tenureMonth}</Typography>
        </Box>
       
      </Grid>
  
      {/* Aadhaar Number */}
      <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
      
      <Typography sx={sharedStyles.fieldLabel}>Loan Purpose:</Typography>
      <Typography sx={sharedStyles.fieldValue}>{loan.loanPurpose}</Typography>
        </Box>
       
       
      </Grid>

    </Grid>
  </Box>
  
  
);
};

export default LoanDetails;
