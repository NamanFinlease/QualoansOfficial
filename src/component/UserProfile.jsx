import React, { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Grid, 
  Avatar, 
  Divider,
  CircularProgress
} from "@mui/material";
import { BASE_URL } from "../baseURL";
import { sharedStyles } from "./shared/styles";

// Define the UserProfile component
const UserProfile = () => {

  // State to store user data
  const [user, setUser] = useState({
    profileImage: "",
    fullName: "",
    PAN: "",
    aadhaarNumber: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch user details from the backend API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/user/getProfileDetails`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // This ensures cookies and other credentials are sent with the request
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();

        setUser({
          profileImage: data?.data?.profileImage,
          fullName: data?.data?.personalDetails?.fullName,
          PAN: data?.data?.PAN,
          aadhaarNumber: data?.data?.aadhaarNumber,
          mobile: data?.data?.mobile,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData(); // Call the fetch function
  }, []); // Empty dependency array to fetch data only once when the component mounts

  // Show loading state while fetching data
  if (loading) {
    return (
      <Box sx={sharedStyles.loadingContainer}>
        <CircularProgress sx={{ color: "#F26722" }} />
      </Box>
    );
  }

  // Show error if there's an issue with the API request
  if (error) {
    return (
      <Box sx={sharedStyles.loadingContainer}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  // If no user data, show a message
  if (!user) {
    return <Typography variant="h6" align="center">No user data found.</Typography>;
  }

  return (
    <Box sx={sharedStyles.containerBox}>
      <Typography variant="h4" sx={sharedStyles.title}>
        User Profile
      </Typography>

      {/* Profile Picture */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Avatar
          alt={user.fullName}
          src={user.profileImage}
          sx={{ width: 120, height: 120, border: "3px solid white" }}
        />
      </Box>

      <Typography
        variant="h5"
        sx={{
          ...sharedStyles.fieldValue,
          textAlign: "center",
          mb: 2,
          fontWeight: "500"
        }}
      >
        {user.fullName}
      </Typography>

      <Divider sx={sharedStyles.divider} />

      <Grid container sx={sharedStyles.gridContainer}>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography sx={sharedStyles.fieldLabel}>PAN Number:</Typography>
            <Typography sx={sharedStyles.fieldValue}>{user.PAN}</Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography sx={sharedStyles.fieldLabel}>Aadhaar Number:</Typography>
            <Typography sx={sharedStyles.fieldValue}>{user.aadhaarNumber}</Typography>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography sx={sharedStyles.fieldLabel}>Mobile Number:</Typography>
            <Typography sx={sharedStyles.fieldValue}>{user.mobile}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
