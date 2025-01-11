import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Avatar, Divider } from "@mui/material";
import { BASE_URL } from "../baseURL";
import { getToken } from "../../tokenManager";

// Define the UserProfile component
const DisbursalBankDetails = () => {
    const token =getToken();
  // State to store user data
  const [disbursal, setDisbursal] = useState({
        bankName:'',
        accountNumber:'',
        ifscCode:'',
        accountType:''

    
    
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch disbursal details from the backend API
  useEffect(() => {
    
    
    const fetchDisbursalData = async () => {
        try {
        //   const token =
        //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2UzZmQxMDczYjMxNTQyNjU3YTI3ZSIsImlhdCI6MTczNjMyNzEyMiwiZXhwIjoxNzM4OTE5MTIyfQ.SDrVOSRa2_x5RC6JBRtdL_yzxkZQPn61dJHmLpI4oQI";

          const response = await fetch(`${BASE_URL}/api/loanApplication/getApplicationDetails?applicationStatus=disbursalBankDetails`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
            console.log("bnjnnn",response);
            
          // Check if the response status is OK
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
      
          // Parse the JSON data from the response
          const data = await response.json();

      
        setDisbursal({
           
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
        Disbursal Bank Details
    </Typography>
  
    {/* Profile Picture */}
    
  
    <Divider sx={{ marginBottom: 2 }} />
  
    {/* Profile Details (Stacked in a column) */}
    <Grid container direction="column" spacing={2}>
   
    <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong>BankName:</strong> {disbursal.bankName}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong>AccountNumber:</strong> {disbursal.accountNumber}
        </Typography>
      </Grid>
      {/* PAN Number */}
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong>IfscCode:</strong> {disbursal.ifscCode}
        </Typography>
      </Grid>
  
      {/* Aadhaar Number */}
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong> AccountType:</strong> {disbursal.accountType}
        </Typography>
      </Grid>


    </Grid>
  </Box>
  
  
);
};

export default DisbursalBankDetails;
