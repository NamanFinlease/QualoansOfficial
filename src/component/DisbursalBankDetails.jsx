import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Avatar, Divider } from "@mui/material";
import { BASE_URL } from "../baseURL";
import { sharedStyles } from "./shared/styles";

// Define the UserProfile component
const DisbursalBankDetails = () => {
  // State to store user data
  const [disbursal, setDisbursal] = useState({
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    accountType: "",
    branchName: "",
    beneficiaryName: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch disbursal details from the backend API
  useEffect(() => {
    const fetchDisbursalData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/api/loanApplication/getApplicationDetails?applicationStatus=disbursalBankDetails`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${token}`, // Uncomment and use token if required
            },
            credentials: "include", // Ensures cookies and credentials are included in the request
          }
        );

        // Check if the response status is OK
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        // Parse the JSON data from the response
        const data = await response.json();

        setDisbursal({
          beneficiaryName: data?.data?.beneficiaryName,
          branchName: data?.data?.branchName,
          bankName: data?.data?.bankName,
          accountNumber: data?.data?.accountNumber,
          ifscCode: data?.data?.ifscCode,
          accountType: data?.data?.accountType,
        });
      } catch (err) {
        setError(err.message); // Handle any errors
      } finally {
        setLoading(false); // Set loading to false once the API request is complete
      }
    };

    fetchDisbursalData(); // Call the fetch function
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

  // If no disbursal data, show a message
  if (!disbursal) {
    return (
      <Typography variant="h6" align="center">
        No disbursal data found.
      </Typography>
    );
  }

  return (
    <Box sx={sharedStyles.containerBox}>
      <Typography variant="h4" sx={sharedStyles.title}>
        Bank Details
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
                  Beneficiary Name
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {disbursal.beneficiaryName}
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
                  Bank Name
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {disbursal.bankName}
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
                  Account Number
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {disbursal.accountNumber}
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
                  IFSC Code
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {disbursal.ifscCode}
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
                  Branch Name
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {disbursal.branchName}
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
                  Account Type
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {disbursal.accountType}
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </div>
    </Box>
  );
};

export default DisbursalBankDetails;
