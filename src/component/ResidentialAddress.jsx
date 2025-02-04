import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Avatar, Divider } from "@mui/material";
import { BASE_URL } from "../baseURL";
import { sharedStyles } from "./shared/styles";

// Define the UserProfile component
const ResidentialAddress = () => {
  // State to store user data
  const [Residential, setResidential] = useState({
    address: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    residenceType: "",
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
          city: data?.data?.residence?.city, // Fixed field for Date of Birth
          state: data?.data?.residence?.state,
          pincode: data?.data?.residence?.pincode, // Corrected syntax issue
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

  // If no Residential data, show a message
  if (!Residential) {
    return (
      <Typography variant="h6" align="center">
        No Residential data found.
      </Typography>
    );
  }

  return (
    <Box sx={sharedStyles.containerBox}>
      <Typography variant="h4" sx={sharedStyles.title}>
        Recidencial Address
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
              <tr style={{ borderBottom: "1px solid #e0e0e0" }}>
                <td
                  style={{
                    padding: "16px",
                    fontWeight: "bold",
                    width: "40%",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  Address
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {Residential.address}
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
                  Landmark
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {Residential.landmark}
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
                  City
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {Residential.city}
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
                  State
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {Residential.state}
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
                  Residence Type
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {Residential.residenceType}
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </div>
    </Box>
  );
};

export default ResidentialAddress;
