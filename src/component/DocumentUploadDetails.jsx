import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Avatar,
  Divider,
  CircularProgress,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { BASE_URL } from "../baseURL";

const DocumentUploadDetails = () => {
  // State to manage document upload status
  const [documentStatus, setDocumentStatus] = useState({
    bankStatement: false,
    salarySlip: false,
    sanctionLetter: false,
    others: false,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocumentStatus = async () => {
      try {
        // const token =
        // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3N2UzZmQxMDczYjMxNTQyNjU3YTI3ZSIsImlhdCI6MTczNjMyNzEyMiwiZXhwIjoxNzM4OTE5MTIyfQ.SDrVOSRa2_x5RC6JBRtdL_yzxkZQPn61dJHmLpI4oQI";
        const response = await fetch(
            `${BASE_URL}/api/loanApplication/getDocumentStatus`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`,
              },
              credentials: 'include', // Ensures cookies and credentials are included in the request
            }
          );
          
        
        if (!response.ok) {
          throw new Error("Failed to fetch document data");
        }

        const data = await response.json();
        
        setDocumentStatus({
          bankStatement: data?.multipleDocumentsStatus
          ?.bankStatement || false,
          salarySlip: data?.multipleDocumentsStatus
          ?.salarySlip || false,
          sanctionLetter: data?.multipleDocumentsStatus
          ?.sanctionLetter || false,
          others: data?.multipleDocumentsStatus
          ?.others || false,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentStatus();
  }, []);

  if (loading) {
    return <Typography variant="h6" align="center">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="h6" align="center" color="error">{error}</Typography>;
  }

  return (
    <Box
    sx={{
      padding: 3,
      background: "linear-gradient(90deg, #4D4D4E, orange)",
      boxShadow: 3,
      ml: { xs: 0, sm: 10 }, // Margin left 0 on smaller screens and 30 on larger ones

      borderRadius: 3,
      width: { xs: "80%", sm: "53%", md: "60%" }, 
      height: "auto", // Increased height (auto for dynamic adjustment)
      maxWidth: "400px", // Set a max width if needed
      margin: "auto", // Center the box
    }}
  >
    <Typography
      variant="h4"
      gutterBottom
      align="center"
      sx={{ mb: 3, color: "white" }} // Set text color to white
    >      
      Document Upload Status
      </Typography>

      <Divider sx={{ marginBottom: 2 }} />

      <Grid container direction="column" spacing={2}>
        {/* Bank Statement */}
        <Grid item>
          <Typography sx={{ color: "white" }}>
            Bank Statement:{" "}
            {documentStatus.bankStatement ? (
              <CheckCircleIcon sx={{ color: "green" }} />
            ) : (
              "Pending"
            )}
          </Typography>
        </Grid>

        {/* Salary Slip */}
        <Grid item>
          <Typography sx={{ color: "white" }}>
            Salary Slip:{" "}
            {documentStatus.salarySlip ? (
              <CheckCircleIcon sx={{ color: "green" }} />
            ) : (
              "Pending"
            )}
          </Typography>
        </Grid>

        {/* Sanction Letter */}
        <Grid item>
          <Typography sx={{ color: "white" }}>
            Sanction Letter:{" "}
            {documentStatus.sanctionLetter ? (
              <CheckCircleIcon sx={{ color: "green" }} />
            ) : (
              "Pending"
            )}
          </Typography>
        </Grid>

        {/* Other Documents */}
        <Grid item>
          <Typography sx={{ color: "white" }}>
            Other Documents:{" "}
            {documentStatus.others ? (
              <CheckCircleIcon sx={{ color: "green" }} />
            ) : (
              "Pending"
            )}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DocumentUploadDetails;
