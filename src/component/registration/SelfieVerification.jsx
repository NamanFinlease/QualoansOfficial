import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import InfoIcon from "@mui/icons-material/Info";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const SelfieVerification = ({ onComplete, disabled }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selfie, setSelfie] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSelfieCapture = () => {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "image/*";
    inputFile.capture = "environment";

    inputFile.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setSelfie(file);
        uploadSelfieToBackend(file);
      }
    };

    inputFile.click();
  };


const uploadSelfieToBackend = async (fileData) => {
  const formData = new FormData();
  formData.append("profilePicture", fileData);

  try {
    setIsUploading(true);
    const response = await axios.patch(
      "http://localhost:8081/api/user/uploadProfile",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      }
    );

    setIsUploading(false);

    if (response.status === 200) {
      // First SweetAlert: Selfie uploaded successfully
      Swal.fire("Success", "Selfie uploaded successfully!", "success").then(() => {
        // After closing the first SweetAlert, show the second SweetAlert
        Swal.fire({
          title: "You have successfully registered to Qualoan!",
          text: "Complete your loan application process.",
          icon: "info",
          confirmButtonText: "Go to Loan Application",
        }).then((result) => {
          // If the user clicks the button, redirect to the loan application page
          if (result.isConfirmed) {
            // Redirect to LoanApplication page
            navigate('/loan-application');
          }
        });
      });
    } else {
      Swal.fire("Error", response.data.message, "error");
    }
  } catch (error) {
    setIsUploading(false);
    setError("An error occurred while uploading the selfie.");
    console.error("Upload Error:", error);
  }
};


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 2,
        border: "2px solid",
        borderRadius: 3,
        margin: 1,
        width: "30%",
        minWidth: 200,
        cursor: "pointer",
        textAlign: "left",
        background: "linear-gradient(45deg, #4D4D4E, orange)",
        color: "white",
        "@media (max-width: 600px)": {
          width: "80%",
          margin: "auto",
        },
      }}
    >
      <IconButton sx={{ color: "white" }}>
        <InfoIcon />
      </IconButton>
      <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: 1 }}>
        Selfie Verification
      </Typography>
      <Typography variant="body2" sx={{ color: "white", marginBottom: 1 }}>
        Verify your identity by uploading a selfie.
      </Typography>
      <Button
        variant="contained"
        onClick={() => setOpenModal(true)}
        disabled={disabled}
        sx={{
          background: "linear-gradient(45deg, #4D4D4E, orange)",
          color: "white",
          "&:hover": { backgroundColor: "#ffcc00" },
        }}
      >
        <CameraAltIcon sx={{ marginRight: 1 }} />
        Start Verification
      </Button>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 4,
            boxShadow: 24,
            padding: 3,
            maxWidth: 400,
            margin: "auto",
            marginTop: "20%",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Upload Your Selfie
          </Typography>

          {selfie ? (
            <Typography sx={{ marginBottom: 2 }}>
              Selfie captured: {selfie.name}
            </Typography>
          ) : (
            <Typography sx={{ marginBottom: 2 }}>
              Please capture your selfie to proceed.
            </Typography>
          )}

          {error && <Typography color="error">{error}</Typography>}

          <Box
            sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSelfieCapture}
              disabled={isUploading}
              sx={{ marginBottom: 2 }}
            >
              {isUploading ? <CircularProgress size={24} /> : "Capture Selfie"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default SelfieVerification;
