import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Avatar, Divider } from "@mui/material";
import { BASE_URL } from "../baseURL";
import { sharedStyles } from "./shared/styles";

// Define the UserProfile component
const ResidentialAddress = () => {
  // State to store user data
  const [Residential, setResidential] = useState({
    
    address:'',
    landmark:'',
    city:'',
    state:'',
    pincode:'',
    residenceType:'',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Residential details from the backend API
  useEffect(() => {
    
    
    const fetchResidentialData = async () => {
        try {
        const response = await fetch(`${BASE_URL}/api/user/getProfileDetails`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Ensures cookies and credentials are included in the request
          });
          
          // Check if the response status is OK
          if (!response.ok) {
            throw new Error("Failed to fetch Residential data");
          }
      
          // Parse the JSON data from the response
          const data = await response.json();

      
        //   setResidential(data); // Set the fetched data to the state
        setResidential({

      
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
      
    fetchResidentialData(); // Call the fetch function
  }, []); // Empty dependency array to fetch data only once when the component mounts

  // Show loading state while fetching data

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  // Show error if there's an issue with the API request
  if (error) {
    return <Typography variant="h6" align="center" color="error">{error}</Typography>;
  }

  // If no Residential data, show a message
  if (!Residential) {
    return <Typography variant="h6" align="center">No Residential data found.</Typography>;
  }

  return (
 <Box sx={sharedStyles.containerBox}>
            <Typography variant="h4" sx={sharedStyles.title}>
      Recidencial Address
    </Typography>

  
         <Divider sx={sharedStyles.divider} />
     
           <Grid container sx={sharedStyles.gridContainer}>
             <Grid item xs={12}>
               <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                 <Typography sx={sharedStyles.fieldLabel}>Address :</Typography>
                 <Typography sx={sharedStyles.fieldValue}>{Residential.address}</Typography>
               </Box>
             </Grid>
     
             <Grid item xs={12}>
               <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                 <Typography sx={sharedStyles.fieldLabel}>Landmark:</Typography>
                 <Typography sx={sharedStyles.fieldValue}>{Residential.landmark}</Typography>
               </Box>
             </Grid>
     
             <Grid item xs={12}>
               <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                 <Typography sx={sharedStyles.fieldLabel}>City:</Typography>
                 <Typography sx={sharedStyles.fieldValue}>{Residential.city}</Typography>
               </Box>
             </Grid>
   
             <Grid item xs={12}>
               <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                 <Typography sx={sharedStyles.fieldLabel}>State:</Typography>
                 <Typography sx={sharedStyles.fieldValue}>{Residential.state}</Typography>
               </Box>
             </Grid>
   
             <Grid item xs={12}>
               <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                 <Typography sx={sharedStyles.fieldLabel}>ResidenceType:</Typography>
                 <Typography sx={sharedStyles.fieldValue}>{Residential.residenceType}</Typography>
               </Box>
             </Grid>
   
    </Grid>
  </Box>
  
  
);
};

export default ResidentialAddress;

