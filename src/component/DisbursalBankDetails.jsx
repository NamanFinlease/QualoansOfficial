import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Avatar, Divider } from "@mui/material";
import { BASE_URL } from "../baseURL";
import { getToken } from "../../tokenManager";
import { sharedStyles } from "./shared/styles";

// Define the UserProfile component
const DisbursalBankDetails = () => {
    const token =getToken();
  // State to store user data
  const [disbursal, setDisbursal] = useState({
        bankName:'',
        accountNumber:'',
        ifscCode:'',
        accountType:'',
        branchName:'',
        beneficiaryName:''
    
    
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch disbursal details from the backend API
  useEffect(() => {
    
    
    const fetchDisbursalData = async () => {
        try {
        //   const token =
        //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2UzZmQxMDczYjMxNTQyNjU3YTI3ZSIsImlhdCI6MTczNjMyNzEyMiwiZXhwIjoxNzM4OTE5MTIyfQ.SDrVOSRa2_x5RC6JBRtdL_yzxkZQPn61dJHmLpI4oQI";

        const response = await fetch(
            `${BASE_URL}/api/loanApplication/getApplicationDetails?applicationStatus=disbursalBankDetails`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`, // Uncomment and use token if required
              },
              credentials: 'include', // Ensures cookies and credentials are included in the request
            }
          );
          
            console.log("bnjnnn",response);
            
          // Check if the response status is OK
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
      
          // Parse the JSON data from the response
          const data = await response.json();

      
        setDisbursal({
            beneficiaryName:data?.data?.beneficiaryName,
            branchName:data?.data?.branchName,
            bankName: data?.data?.bankName,
            accountNumber: data?.data?.accountNumber,
            ifscCode: data?.data?.ifscCode,  
            accountType: data?.data?.accountType,
            
          });
          
          
        } catch (err) {
            setError(err.message); // Handle any errors
        } finally {
            setLoading(false); // Set loading to false once the API request is complete
        }
    };
    
    
    fetchDisbursalData(); // Call the fetch function
}, []); // Empty dependency array to fetch data only once when the component mounts

// Show loading state while fetching data

if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
}

// Show error if there's an issue with the API request
if (error) {
    return <Typography variant="h6" align="center" color="error">{error}</Typography>;
}

// If no disbursal data, show a message
if (!disbursal) {
    return <Typography variant="h6" align="center">No disbursal data found.</Typography>;
}

return (
     <Box sx={sharedStyles.containerBox}>
     <Typography variant="h4" sx={sharedStyles.title}>  
                Bank Details
    </Typography>
  
    {/* Profile Picture */}
    
  
        <Divider sx={sharedStyles.divider} />
  
    {/* Profile Details (Stacked in a column) */}
        <Grid container sx={sharedStyles.gridContainer}>
    <Grid item xs={12}>

              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography sx={sharedStyles.fieldLabel}>beneficiaryName:</Typography>
                <Typography sx={sharedStyles.fieldValue}> {disbursal.beneficiaryName}</Typography>
                   </Box>
        
      </Grid>
    <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography sx={sharedStyles.fieldLabel}>Bank Name:</Typography>
                <Typography sx={sharedStyles.fieldValue}> {disbursal.bankName}</Typography>
                   </Box>
        
      </Grid>
      <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography sx={sharedStyles.fieldLabel}>Account Number:</Typography>
                <Typography sx={sharedStyles.fieldValue}> {disbursal.accountNumber}</Typography>
                   </Box>
       
      </Grid>
      {/* PAN Number */}
      <Grid item xs={12}>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography sx={sharedStyles.fieldLabel}>ifsc Code:</Typography>
                <Typography sx={sharedStyles.fieldValue}> {disbursal.ifscCode}</Typography>
                   </Box>
       
       
      </Grid>
      <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography sx={sharedStyles.fieldLabel}>Branch Name:</Typography>
                <Typography sx={sharedStyles.fieldValue}> {disbursal.branchName}</Typography>
                   </Box>
        
      </Grid>
  
      {/* Aadhaar Number */}
      <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography sx={sharedStyles.fieldLabel}>accountType:</Typography>
                <Typography sx={sharedStyles.fieldValue}> {disbursal.accountType}</Typography>
                   </Box>
       
      </Grid>


    </Grid>
  </Box>
  
  
);
};

export default DisbursalBankDetails;
