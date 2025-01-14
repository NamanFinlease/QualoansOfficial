import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Avatar, Divider } from "@mui/material";
import { BASE_URL } from "../baseURL";
import { getToken } from "../../tokenManager";
// Define the UserProfile component
const EmploymentInformation = () => {
  const token=getToken();



  // State to store user data
  const [employment, setEmployment] = useState({
    workFrom:'',
    officeEmail:'',
    companyName: '',
    companyType: '',
    statedesignation: '',
    officeAddrress:'',
    landmark:'',
    city:'',
    state:'',
    pincode:'',

    
    
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch employment details from the backend API
  useEffect(() => {
    
    
    const fetchEmploymentData = async () => {
        try {
          // const token =
          //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2UzZmQxMDczYjMxNTQyNjU3YTI3ZSIsImlhdCI6MTczNjMyNzEyMiwiZXhwIjoxNzM4OTE5MTIyfQ.SDrVOSRa2_x5RC6JBRtdL_yzxkZQPn61dJHmLpI4oQI";

          const response = await fetch(`${BASE_URL}/api/loanApplication/getApplicationDetails?applicationStatus=employeeDetails`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${token}`, // Uncomment and use if you need Authorization
            },
            credentials: "include", // This sends cookies and credentials along with the request
          });
          
          // Check if the response status is OK
          if (!response.ok) {
            throw new Error("Failed to fetch employment data");
          }
      
          // Parse the JSON data from the response
          const data = await response.json();

      
        setEmployment({
            
           
            workFrom: data?.data?.workFrom,
            officeEmail: data?.data?.officeEmail,
            companyName: data?.data?.companyName,  
            companyType: data?.data?.companyType,
            designation: data?.data?.designation,  
            officeAddrress: data?.data?.officeAddrress,  
            landmark: data?.data?.landmark,  
            city: data?.data?.city,  
            state: data?.data?.state,  
            pincode: data?.data?.pincode,  


          });
          
          
        } catch (err) {
            setError(err.message); // Handle any errors
        } finally {
            setLoading(false); // Set loading to false once the API request is complete
        }
    };
    
    
    fetchEmploymentData(); // Call the fetch function
}, []); // Empty dependency array to fetch data only once when the component mounts

// Show loading state while fetching data

if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
}

// Show error if there's an issue with the API request
if (error) {
    return <Typography variant="h6" align="center" color="error">{error}</Typography>;
}

// If no employment data, show a message
if (!employment) {
    return <Typography variant="h6" align="center">No employment data found.</Typography>;
}

return (
    <Box
    sx={{
      padding: 3,
      background: "linear-gradient(90deg, #4D4D4E, orange)",
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
      sx={{ mb: 3, color: "white",bgcolor:'black' }} // Set text color to white
    >
        Employment Information
    </Typography>
  
    {/* Profile Picture */}
    
  
    <Divider sx={{ marginBottom: 2 }} />
  
    {/* Profile Details (Stacked in a column) */}
    <Grid container direction="column" spacing={2}>
   
           
    <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong>WorkFrom:</strong> {employment.workFrom}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong>OfficeEmail:</strong> {employment.officeEmail}
        </Typography>
      </Grid>
      {/* PAN Number */}
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong>CompanyName:</strong> {employment.companyName}
        </Typography>
      </Grid>
  
      {/* Aadhaar Number */}
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong> Designation:</strong> {employment.designation}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong> OfficeAddrress:</strong> {employment.officeAddrress}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong> Landmark:</strong> {employment.landmark}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong> City:</strong> {employment.city}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong> State:</strong> {employment.state}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong> Pincode:</strong> {employment.pincode}
        </Typography>
      </Grid>
      

    </Grid>
  </Box>
  
  
);
};

export default EmploymentInformation;
