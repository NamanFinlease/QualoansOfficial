import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Avatar, Divider } from "@mui/material";
import { BASE_URL } from "../baseURL";

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
        ml: { xs: 0, sm: 10 }, // Margin left 0 on smaller screens and 30 on larger ones

        borderRadius: 3,
        width: { xs: "100%", sm: "53%", md: "60%" }, // Responsive width for different screens
        maxWidth: "400px", // Max width for larger screens
        margin: "auto", // Center the box
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        sx={{ mb: 3, color: "white" }}
      >
        User Profile
      </Typography>

      {/* Profile Picture */}
      <Grid container justifyContent="center" sx={{ mb: 3 }}>
        <Avatar
          alt="Profile Picture"
          src={user.profileImage}
          sx={{ width: 120, height: 120 }}
        />
      </Grid>

      {/* Name */}
      <Typography
        variant="h5"
        align="center"
        sx={{ fontWeight: "bold", mb: 2, color: "white" }}
      >
        {user.fullName}
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      {/* Profile Details (Stacked in a column) */}
      <Grid container direction="column" spacing={2}>
        {/* PAN Number */}
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ color: "white" }}>
            <strong>PAN Number:</strong> {user.PAN}
          </Typography>
        </Grid>

        {/* Aadhaar Number */}
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ color: "white" }}>
            <strong>Aadhaar Number:</strong> {user.aadhaarNumber}
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

export default UserProfile;
