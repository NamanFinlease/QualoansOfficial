import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Divider,
  CircularProgress,
} from "@mui/material";
import { BASE_URL } from "../baseURL";
import { sharedStyles } from "./shared/styles";

// Define the UserProfile component
const UserProfile = () => {
  // State to store user data
  const [user, setUser] = useState({
    profileImage: "",
    fullName: "",
    // fathersName: "",
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
        const response = await fetch(`${BASE_URL}/getProfileDetails`, {
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
          // fathersName: data?.data?.personalDetails.fathersName,
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
    return (
      <Typography variant="h6" align="center">
        No user data found.
      </Typography>
    );
  }

  return (
    <Box sx={sharedStyles.containerBox}>
      <Typography variant="h4" sx={sharedStyles.title}>
        User Profile
      </Typography>

      {/* Profile Picture */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <Avatar
          alt={user.fullName}
          src={user.profileImage}
          sx={{
            width: 120,
            height: 120,
            border: "3px solid white",
            boxShadow: 3,
          }}
        />
      </Box>

      <Typography
        variant="h5"
        sx={{
          ...sharedStyles.fieldValue,
          textAlign: "center",
          mb: 2,
          fontWeight: "500",
        }}
      >
        {user.fullName}
      </Typography>

      <Divider sx={sharedStyles.divider} />

      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            maxHeight: "600px",
            overflowY: "auto",
            padding: 2,
            borderRadius: "8px",
            backgroundColor: "white",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "white",
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <tbody>
              {/* <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                <td
                  style={{
                    padding: "16px",
                    fontWeight: "bold",
                    width: "40%",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  Father's Name
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {user.fathersName}
                </td>
              </tr> */}
              <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                <td
                  style={{
                    padding: "16px",
                    fontWeight: "bold",
                    width: "40%",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  PAN Number
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {user.PAN}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                <td
                  style={{
                    padding: "16px",
                    fontWeight: "bold",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  Aadhaar Number
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {user.aadhaarNumber}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    padding: "16px",
                    fontWeight: "bold",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  Mobile Number
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {user.mobile}
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </div>
    </Box>
  );
};

export default UserProfile;
