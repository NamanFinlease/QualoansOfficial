import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Avatar, Divider } from "@mui/material";
import { BASE_URL } from "../baseURL";
import { getToken } from "../../tokenManager";
import { sharedStyles } from "./shared/styles";
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
 <Box sx={sharedStyles.containerBox}>
            <Typography variant="h4" sx={sharedStyles.title}>
        Employment Information
    </Typography>
  
    {/* Profile Picture */}
    
  
        <Divider sx={sharedStyles.divider} />
  
    {/* Profile Details (Stacked in a column) */}
        <Grid container sx={sharedStyles.gridContainer}>
   
           
    <Grid item xs={12}>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={sharedStyles.fieldLabel}>WorkFrom:</Typography>
          <Typography sx={sharedStyles.fieldValue}>{employment.workFrom}</Typography>
             </Box>
      </Grid>
      <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={sharedStyles.fieldLabel}>Office Email:</Typography>
          <Typography sx={sharedStyles.fieldValue}>{employment.officeEmail}</Typography>
             </Box>
      </Grid>
      {/* PAN Number */}
      <Grid item xs={12}>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={sharedStyles.fieldLabel}>Company Name :</Typography>
          <Typography sx={sharedStyles.fieldValue}>{employment.companyName}</Typography>
             </Box>
        
      </Grid>
  
      {/* Aadhaar Number */}
      <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={sharedStyles.fieldLabel}>Designation:</Typography>
          <Typography sx={sharedStyles.fieldValue}>{employment.designation}</Typography>
             </Box>
       
      </Grid>
      <Grid item xs={12}>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={sharedStyles.fieldLabel}>Office Addrress:</Typography>
          <Typography sx={sharedStyles.fieldValue}>{employment.officeAddrress}</Typography>
             </Box>

      </Grid>
      <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={sharedStyles.fieldLabel}>Landmark:</Typography>
          <Typography sx={sharedStyles.fieldValue}>{employment.landmark}</Typography>
             </Box>
      </Grid>
      <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={sharedStyles.fieldLabel}>City:</Typography>
          <Typography sx={sharedStyles.fieldValue}>{employment.city}</Typography>
             </Box>
      </Grid>
      <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={sharedStyles.fieldLabel}>State:</Typography>
          <Typography sx={sharedStyles.fieldValue}>{employment.state}</Typography>
             </Box>
      
      </Grid>
      <Grid item xs={12}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography sx={sharedStyles.fieldLabel}>Pincode:</Typography>
          <Typography sx={sharedStyles.fieldValue}>{employment.pincode}</Typography>
             </Box>
        
      </Grid>
      

    </Grid>
  </Box>
  
  
);
};

export default EmploymentInformation;
