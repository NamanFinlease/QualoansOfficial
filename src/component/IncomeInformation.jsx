import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";
import { BASE_URL } from "../baseURL";
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
    <Box
    sx={{
      padding: 3,
      background: "linear-gradient(90deg, #4D4D4E, orange)",
      boxShadow: 3,
      ml: { xs: 0, sm: 10 }, // Margin left 0 on smaller screens and 30 on larger ones

      borderRadius: 3,
      width: { xs: "80%", sm: "53%", md: "60%" }, 
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
      Income Information
    </Typography>
  
   
   
    <Divider sx={{ marginBottom: 2 }} />
  
    {/* Profile Details (Stacked in a column) */}
    <Grid container direction="column" spacing={2}>

    <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong>EmployementType:</strong> {income.employementType}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong>MonthlyIncome:</strong> {income.monthlyIncome}
        </Typography>
      </Grid>
      {/* PAN Number */}
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong>Loan Amount:</strong> {income.obligations}
        </Typography>
      </Grid>
  
      {/* Aadhaar Number */}
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong> NextSalaryDate:</strong> {income.nextSalaryDate}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong> IncomeMode:</strong> {income.incomeMode}
        </Typography>
      </Grid>
      
     
    </Grid>
  </Box>
  
  
);
};

export default IncomeInformation;

