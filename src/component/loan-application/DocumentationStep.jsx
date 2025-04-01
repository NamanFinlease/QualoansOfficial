import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Box, Grid, Typography, IconButton } from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SweetAlert from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import DocumentUploadModal from "../DocumentUploadModal";
import { BASE_URL } from "../../baseURL";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(SweetAlert);

const DocumentationStep = ({
  onComplete,
  disabled,
  prefillData,
  isUploaded,
}) => {
  const navigate = useNavigate();
  const [stepCompleted, setStepCompleted] = useState(false); // Add this line to define stepCompleted state

  const handleDocumentationUpload = async () => {
    navigate("/upload-document");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 2,
          borderColor:
            // completed ? "green" :
            disabled ? "#1c1c1c" : "#F26722",
          borderRadius: 3,
          margin: 1,
          width: "25%",
          minWidth: 200,
          cursor: disabled ? "not-allowed" : "pointer",
          textAlign: "left",
          background:
            //  completed
            //   ? "linear-gradient(45deg, #28a745, #218838)" // Green gradient when step is complete
            //   :
            disabled ? "#d9d9d9" : "rgb(72, 145, 193)",
          color:
            //  completed ||
            !disabled ? "white" : "#1c1c1c",
          "@media (max-width: 600px)": {
            width: "80%",
            margin: "auto",
          },
        }}
        onClick={!disabled ? handleDocumentationUpload : null}
      >
        <IconButton
          sx={{
            marginBottom: 1,
            color: "white",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
          disabled={disabled}
        >
          {stepCompleted || isUploaded ? (
            <CheckCircleIcon sx={{ color: "green" }} />
          ) : (
            <AccountBalanceIcon />
          )}
        </IconButton>
        <Box sx={{ textAlign: "left", width: "100%" }}>
          <Typography
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
