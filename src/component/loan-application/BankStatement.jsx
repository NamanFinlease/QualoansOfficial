import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SweetAlert from "sweetalert2";
import axios from "axios";
import { BASE_URL } from "../../baseURL";

const BankStatement = ({ onComplete, disabled, prefillData }) => {
  const [bankStatement, setBankStatement] = useState(prefillData || null);
  const [stepCompleted, setStepCompleted] = useState(false);

  useEffect(() => {
    if (bankStatement) {
      setStepCompleted(true);
      onComplete({ bankStatement });
    }
  }, [bankStatement, onComplete]);

  const handleBankStatementUpload = () => {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = ".pdf,.jpg,.png"; // Accept specific formats for bank statements
    inputFile.onchange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        setBankStatement(file); // Save the uploaded file for later use
        await uploadBankStatementToServer(file);
      }
    };
    inputFile.click();
  };

  const uploadBankStatementToServer = async (file) => {
    const formData = new FormData();
    formData.append("bankStatement", file); // Key "bankStatement"

    try {
      const response = await fetch(
        `${BASE_URL}/api/loanApplication/uploadDocuments`,
        {
          method: "PATCH",
          headers: {},
          body: formData, // Include the FormData object
          credentials: "include", // Ensures that cookies are sent with the request
        }
      );

      if (response.ok) {
        const responseData = await response.json(); // Parse JSON response
        SweetAlert.fire(
          "Success",
          "Bank statement uploaded successfully!",
          "success"
        );
        setStepCompleted(true); // Mark step as completed
        onComplete({ bankStatement: file }); // Pass the data to parent onComplete
      } else {
        const errorData = await response.json(); // Parse error details
        SweetAlert.fire(
          "Error",
          errorData.message || "Unexpected error occurred.",
          "error"
        );
      }
    } catch (error) {
      SweetAlert.fire(
        "Error",
        error.message ||
          "An error occurred while uploading the bank statement.",
        "error"
      );
    }
  };

  // Render the UI for the bank statement upload step
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        padding: 3,
        border: "1px solid #ddd",
        borderRadius: 3,
        background: disabled
          ? "#ccc"
          : "linear-gradient(45deg, #4D4D4E, orange)",
        cursor: disabled ? "not-allowed" : "pointer", // Disable the cursor if disabled
        height: 180,
        width: "100%",
        maxWidth: 350,
        transition: "all 0.3s",
        boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
        "&:hover": {
          backgroundColor: disabled ? "#ccc" : "orange",
          color: disabled ? "white" : "black",
          transform: disabled ? "none" : "scale(1.03)",
        },
      }}
      onClick={!disabled ? handleBankStatementUpload : null}
    >
      <IconButton
        disabled={disabled || stepCompleted}
        sx={{
          marginBottom: 1,
          backgroundColor: "#4D4D4E",
          color: "white",
          "&:hover": {
            backgroundColor: "white",
          },
        }}
      >
        {stepCompleted ? (
          <CheckCircleIcon color="success" />
        ) : (
          <DescriptionIcon />
        )}
      </IconButton>
      <Box sx={{ textAlign: "left", width: "100%" }}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            marginBottom: 1,
            color: "white",
          }}
        >
          Fetch Bank Statement
        </Typography>
        <Typography variant="body2" sx={{ color: "white" }}>
          Share your bank statement
        </Typography>
      </Box>
    </Box>
  );
};

export default BankStatement;
