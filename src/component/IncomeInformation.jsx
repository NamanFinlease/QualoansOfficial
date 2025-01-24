import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";
import { BASE_URL } from "../baseURL";
import { sharedStyles } from "./shared/styles";
// import { getToken } from "../../tokenManager";
// Define the income Profile component
const IncomeInformation = () => {

    // const token=getToken();
    
  // State to store income data
  const [income, setIncome] = useState({
    employementType:'',
    monthlyIncome:'',
    obligations: '',
    nextSalaryDate:'',
    incomeMode:'',
    
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch income details from the backend API
  useEffect(() => {
    
    
    const fetchIncomeData = async () => {
        try {
        //   const token =
        //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2UzZmQxMDczYjMxNTQyNjU3YTI3ZSIsImlhdCI6MTczNjMyNzEyMiwiZXhwIjoxNzM4OTE5MTIyfQ.SDrVOSRa2_x5RC6JBRtdL_yzxkZQPn61dJHmLpI4oQI";
      
          const response = await fetch(`${BASE_URL}/api/user/getProfileDetails`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            //   Authorization: `Bearer ${token}`,
            },
            credentials: "include", // Ensures cookies and credentials are included in the request
          });

          // Check if the response status is OK
          if (!response.ok) {
            throw new Error("Failed to fetch income data");
          }
      
          // Parse the JSON data from the response
          const data = await response.json();
          // console.log(data);

          // console.log(data); // Log the fetched data after it's assigned
      
        //   setIncome(data); // Set the fetched data to the state
        setIncome({

            
            employementType: data?.data?.incomeDetails?.employementType,
            monthlyIncome: data?.data?.incomeDetails?.monthlyIncome,
            obligations: data?.data?.incomeDetails?.obligations,  // Fixed field for Date of Birth
            nextSalaryDate: data?.data?.incomeDetails?.nextSalaryDate,
            incomeMode: data?.data?.incomeDetails?.incomeMode,  // Corrected syntax issue
          
        });
          
        } catch (err) {
          setError(err.message); // Handle any errors
        } finally {
          setLoading(false); // Set loading to false once the API request is complete
        }
      };
      
    fetchIncomeData(); // Call the fetch function
  }, []); // Empty dependency array to fetch data only once when the component mounts

  // Show loading state while fetching data

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  // Show error if there's an issue with the API request
  if (error) {
    return <Typography variant="h6" align="center" color="error">{error}</Typography>;
  }

  // If no user data, show a message
  if (!income) {
    return <Typography variant="h6" align="center">No income data found.</Typography>;
  }

  return (
    <Box sx={sharedStyles.containerBox}>
            <Typography variant="h4" sx={sharedStyles.title}>
      Income Information
    </Typography>
  
   
   
        <Divider sx={sharedStyles.divider} />
  
    {/* Profile Details (Stacked in a column) */}
        <Grid container sx={sharedStyles.gridContainer}>

    <Grid item xs={12}>
    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>

    <Typography sx={sharedStyles.fieldLabel}>EmployementType:</Typography>
    <Typography sx={sharedStyles.fieldValue}>{income.employementType}</Typography>
       </Box>

      </Grid>
      <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>

      <Typography sx={sharedStyles.fieldLabel}>Monthly Income:</Typography>
      <Typography sx={sharedStyles.fieldValue}>{income.monthlyIncome}</Typography>
        </Box>

        
      </Grid>
      {/* PAN Number */}
      <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>

      <Typography sx={sharedStyles.fieldLabel}>Loan Amount:</Typography>
      <Typography sx={sharedStyles.fieldValue}>{income.obligations}</Typography>
        </Box>
       
      </Grid>
  
      {/* Aadhaar Number */}
      <Grid item xs={12}>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>

        <Typography sx={sharedStyles.fieldLabel}>NextSalary Date:</Typography>
        <Typography sx={sharedStyles.fieldValue}>{income.nextSalaryDate}</Typography>
          </Box>
       
      </Grid>
      <Grid item xs={12}>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>

      <Typography sx={sharedStyles.fieldLabel}>IncomeMode:</Typography>
      <Typography sx={sharedStyles.fieldValue}>{income.incomeMode}</Typography>
        </Box>

       
      </Grid>
      
     
    </Grid>
  </Box>
  
  
);
};

export default IncomeInformation;

