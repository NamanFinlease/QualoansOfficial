import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Avatar, Divider } from "@mui/material";
import { BASE_URL } from "../baseURL";
import { getToken } from "../../tokenManager";

// Define the UserProfile component
const RecidencialAddress = () => {

      const token = getToken();
    
  // State to store user data
  const [recidential, setRecidential] = useState({
    
    address:'',
    landmark:'',
    city:'',
    state:'',
    pincode:'',
    residenceType:'',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recidential details from the backend API
  useEffect(() => {
    
    
    const fetchRecidentialData = async () => {
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
            throw new Error("Failed to fetch recidential data");
          }
      
          // Parse the JSON data from the response
          const data = await response.json();

      
        //   setRecidential(data); // Set the fetched data to the state
        setRecidential({

      
            address: data?.data?.residence?.address,
            landmark: data?.data?.residence?.landmark,
            city: data?.data?.residence?.city,  // Fixed field for Date of Birth
            state: data?.data?.residence?.state,
            pincode: data?.data?.residence?.pincode,  // Corrected syntax issue
            residenceType: data?.data?.residence?.residenceType,
          });
          
        } catch (err) {
          setError(err.message); // Handle any errors
        } finally {
          setLoading(false); // Set loading to false once the API request is complete
        }
      };
      
    fetchRecidentialData(); // Call the fetch function
  }, []); // Empty dependency array to fetch data only once when the component mounts

  // Show loading state while fetching data

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  // Show error if there's an issue with the API request
  if (error) {
    return <Typography variant="h6" align="center" color="error">{error}</Typography>;
  }

  // If no recidential data, show a message
  if (!recidential) {
    return <Typography variant="h6" align="center">No recidential data found.</Typography>;
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
      Recidencial Address
    </Typography>
  
   
  
    <Divider sx={{ marginBottom: 2 }} />
  
    {/* Profile Details (Stacked in a column) */}
    <Grid container direction="column" spacing={2}>

    <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong>Address:</strong> {recidential.address}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong>Landmark:</strong> {recidential.landmark}
        </Typography>
      </Grid>
      {/* PAN Number */}
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong>City:</strong> {recidential.city}
        </Typography>
      </Grid>
  
      {/* Aadhaar Number */}
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong> State:</strong> {recidential.state}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ color: "white" }}>
          <strong> ResidenceType:</strong> {recidential.residenceType}
        </Typography>
      </Grid>
      
     
    </Grid>
  </Box>
  
  
);
};

export default RecidencialAddress;

