import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Avatar, Divider } from "@mui/material";
import { BASE_URL } from "../baseURL";
import { getToken } from "../../tokenManager";
// Define the UserProfile component
const BaasicInformation = () => {
  const token=getToken();
    
  // State to store user data
  const [user, setUser] = useState({
    
    fullName:'',
    gender:'',
    dob:'',
    personalEmail:'',
    spouseName:'',
    mobile:'',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user details from the backend API
  useEffect(() => {
    
    
    const fetchUserData = async () => {
        try {
        //   const token =
        //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2UzZmQxMDczYjMxNTQyNjU3YTI3ZSIsImlhdCI6MTczNjMyNzEyMiwiZXhwIjoxNzM4OTE5MTIyfQ.SDrVOSRa2_x5RC6JBRtdL_yzxkZQPn61dJHmLpI4oQI";
      
          const response = await fetch(`${BASE_URL}/api/user/getProfileDetails`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          // Check if the response status is OK
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
      
          // Parse the JSON data from the response
          const data = await response.json();
          console.log(data);

          console.log(data); // Log the fetched data after it's assigned
      
        //   setUser(data); // Set the fetched data to the state
        setUser({
            fullName: data?.data?.personalDetails?.fullName,
            gender: data?.data?.personalDetails?.gender,
            dob: data?.data?.personalDetails?.dob,  // Fixed field for Date of Birth
            personalEmail: data?.data?.personalDetails?.personalEmail,
            spouseName: data?.data?.personalDetails?.spouseName,  // Corrected syntax issue
            mobile: data?.data?.personalDetails?.mobile,
          });
          
        } catch (err) {
          setError(err.message); // Handle any errors
        } finally {
          setLoading(false); // Set loading to false once the API request is complete
        }
      };
      
    fetchUserData(); // Call the fetch function
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
  if (!user) {
    return <Typography variant="h6" align="center">No user data found.</Typography>;
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
      Basic Information
    </Typography>
  
    {/* Profile Picture */}
    
  
    <Divider sx={{ marginBottom: 2 }} />
  
    {/* Profile Details (Stacked in a column) */}
    <Grid container direction="column" spacing={2}>

    <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong>Name:</strong> {user.fullName}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong>Gender:</strong> {user.gender}
        </Typography>
      </Grid>
      {/* PAN Number */}
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong>DOB:</strong> {user.dob}
        </Typography>
      </Grid>
  
      {/* Aadhaar Number */}
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong> PersonalEmail:</strong> {user.personalEmail}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong> SpouseName:</strong> {user.spouseName}
        </Typography>
      </Grid>
      
      {/* Mobile Number */}
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong>Mobile Number:</strong> {user.mobile}
        </Typography>
      </Grid>
    </Grid>
  </Box>
  
  
);
};

export default BaasicInformation;
