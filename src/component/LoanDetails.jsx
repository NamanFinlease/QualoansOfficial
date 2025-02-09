import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Avatar, Divider } from "@mui/material";
import { BASE_URL } from "../baseURL";
import { getToken } from "../../tokenManager";
import { sharedStyles } from "./shared/styles";

// Define loan the  component
const LoanDetails = () => {
  const token = getToken();

  // State to store loan data
  const [loan, setLoan] = useState({
    principle: "",
    totalPayble: "",
    roi: "",
    tenure: "",
    loanPurpose: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch loan details from the backend API
  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        //   const token =
        //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2UzZmQxMDczYjMxNTQyNjU3YTI3ZSIsImlhdCI6MTczNjMyNzEyMiwiZXhwIjoxNzM4OTE5MTIyfQ.SDrVOSRa2_x5RC6JBRtdL_yzxkZQPn61dJHmLpI4oQI";

        const response = await fetch(
          `${BASE_URL}/getApplicationDetails?applicationStatus=loanDetails`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Authorization: `Bearer ${token}`, // Uncomment if token is needed
            },
            credentials: "include", // Ensures that cookies are included with the request
          }
        );

        // console.log(response);

        // Check if the response status is OK
        if (!response.ok) {
          throw new Error("Failed to fetch loan data");
        }

        // Parse the JSON data from the response
        const data = await response.json();

        setLoan({
          principle: data?.data?.principle,
          totalPayble: data?.data?.totalPayble,
          roi: data?.data?.roi, // Fixed field for Date of Birth
          tenure: data?.data?.tenure,
          loanPurpose: data?.data?.loanPurpose, // Corrected syntax issue
        });
      } catch (err) {
        setError(err.message); // Handle any errors
      } finally {
        setLoading(false); // Set loading to false once the API request is complete
      }
    };

    fetchLoanData(); // Call the fetch function
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

  // If no loan data, show a message
  if (!loan) {
    return (
      <Typography variant="h6" align="center">
        No user data found.
      </Typography>
    );
  }

  return (
    <Box sx={sharedStyles.containerBox}>
      <Typography variant="h4" sx={sharedStyles.title}>
        Loan Information
      </Typography>

      {/* Profile Picture */}

      <Divider sx={sharedStyles.divider} />

      {/* Profile Details (Stacked in a column) */}
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
                  Principle
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {loan.principle}
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
                  Return on investment
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {loan.roi}
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
                  Tenure Month
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {loan.tenure}
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
                  Loan Purpose
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {loan.loanPurpose}
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </div>
    </Box>
  );
};

export default LoanDetails;
