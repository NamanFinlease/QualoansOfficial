import React from "react";
import ReactDOM from "react-dom";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SweetAlert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import DocumentUploadModal from "../DocumentUploadModal";

const MySwal = withReactContent(SweetAlert);

const DocumentationStep = ({ onComplete, disabled, prefillData }) => {
  const handleDocumentationUpload = async () => {
    // Create a container element
    const container = document.createElement("div");

    // Render the React component into the container
    ReactDOM.render(
      <DocumentUploadModal prefillData={prefillData} />,
      container
    );

    // Use SweetAlert2 to display the container
    MySwal.fire({
      html: container,
      showConfirmButton: false,
      width: "800px",
      margin: "0px",
      padding: 0,
      willClose: () => {
        // Clean up React rendering when SweetAlert closes
        ReactDOM.unmountComponentAtNode(container);
      },
    });
    onComplete({ completed: true, data: prefillData });
  };

  return (
    <>
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
        onClick={!disabled ? handleDocumentationUpload : null}
      >
        <IconButton
          sx={{
            marginBottom: 1,
            backgroundColor: "#4D4D4E",
            color: "white",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
          disabled={disabled}
        >
          <AccountBalanceIcon />
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
            Documentation
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            Share your documents to verify your details
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default DocumentationStep;
