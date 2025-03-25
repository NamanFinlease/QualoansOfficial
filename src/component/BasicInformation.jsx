import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Divider,
  TextField,
  CircularProgress,
} from "@mui/material";

import dayjs from "dayjs"; // ✅ Import dayjs for handling dates
import { BASE_URL } from "../baseURL";
import { sharedStyles } from "./shared/styles";

const BasicInformation = () => {
  //   const token=getToken();

  // State to store user data
  const [user, setUser] = useState({
    fullName: "",
    mothersName: "",
    fathersName: "",
    gender: "",
    dob: "",
    personalEmail: "",
    maritalStatus: "",
    spouseName: "",
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
          credentials: "include", // Ensures cookies and credentials are included in the request
        });

        // Check if the response status is OK
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        // Parse the JSON data from the response
        const data = await response.json();

        //   setUser(data); // Set the fetched data to the state
        setUser({
          fullName: data?.data?.personalDetails?.fullName,
          gender: data?.data?.personalDetails?.gender,
          mothersName: data?.data?.personalDetails?.mothersName,
          fathersName: data?.data?.personalDetails?.fathersName,

          dob: data?.data?.personalDetails?.dob, // Fixed field for Date of Birth
          personalEmail: data?.data?.personalDetails?.personalEmail,
          maritalStatus: data?.data?.personalDetails?.maritalStatus,
          spouseName: data?.data?.personalDetails?.spouseName, // Corrected syntax issue
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
    return (
      <Typography variant="h6" align="center">
        Loading...
      </Typography>
    );
  }

  // Show error if there's an issue with the API request
  if (error) {
    return (
      <Typography variant="h6" align="center" color="error">
        {error}
      </Typography>
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
        Basic Information
      </Typography>

      {/* Profile Picture */}

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
              <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                <td
                  style={{
                    padding: "16px",
                    fontWeight: "bold",
                    width: "40%",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  Full Name
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {user.fullName}
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
                  Mother's Name
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {user.mothersName}
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
              </tr>
              <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                <td
                  style={{
                    padding: "16px",
                    fontWeight: "bold",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  Gender
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {user.gender}
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
                  Date of Birth
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {user.dob ? dayjs(user.dob).format("DD/MM/YYYY") : "N/A"}
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
                  Personal Email
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {user.personalEmail}
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
                  Marital Status
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {user.maritalStatus}
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
                  Spouse Name
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {user.spouseName}
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </div>
    </Box>
  );
};

export default BasicInformation;
