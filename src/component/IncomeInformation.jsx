import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";
import { BASE_URL } from "../baseURL";
import { sharedStyles } from "./shared/styles";
import moment from "moment";

// import { getToken } from "../../tokenManager";
// Define the income Profile component
const IncomeInformation = () => {
  // const token=getToken();

  // State to store income data
  const [income, setIncome] = useState({
    employementType: "",
    monthlyIncome: "",
    obligations: "",
    nextSalaryDate: "",
    incomeMode: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch income details from the backend API
  useEffect(() => {
    const fetchIncomeData = async () => {
      try {
        
        const response = await fetch(`${BASE_URL}/getProfileDetails`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            //   Authorization: `Bearer ${token}`,
          },
          credentials: "include", // Ensures cookies and credentials are included in the request
        });

        // Check if the response status is OK
        if (!response.ok) {
          throw new Error("Failed to fetch income data");
        }

        // Parse the JSON data from the response
        const data = await response.json();
       
        setIncome({
          employementType: data?.data?.incomeDetails?.employementType,
          monthlyIncome: data?.data?.incomeDetails?.monthlyIncome,
          obligations: data?.data?.incomeDetails?.obligations, // Fixed field for Date of Birth
          nextSalaryDate: data?.data?.incomeDetails?.nextSalaryDate,
          incomeMode: data?.data?.incomeDetails?.incomeMode, // Corrected syntax issue
        });
      } catch (err) {
        setError(err.message); // Handle any errors
      } finally {
        setLoading(false); // Set loading to false once the API request is complete
      }
    };

    fetchIncomeData(); // Call the fetch function
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
  if (!income) {
    return (
      <Typography variant="h6" align="center">
        No income data found.
      </Typography>
    );
  }

  return (
    <Box sx={sharedStyles.containerBox}>
      <Typography variant="h4" sx={sharedStyles.title}>
        Income Information
      </Typography>

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
                  Employment Type
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {income.employementType}
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
                  Monthly Income
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {income.monthlyIncome}
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
                  Loan Amount
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {income.obligations}
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
                  Next Salary Date
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {moment(income.nextSalaryDate).format("DD-MM-YYYY")}
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
                  Income Mode
                </td>
                <td
                  style={{
                    padding: "16px",
                    color: "#F26722",
                    fontWeight: "bold",
                  }}
                >
                  {income.incomeMode}
                </td>
              </tr>
            </tbody>
          </table>
        </Box>
      </div>
    </Box>
  );
};

export default IncomeInformation;
