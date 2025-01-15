import React, { useState } from "react";
import {
  Modal,
  Box,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import axios from "axios";
import { BASE_URL } from "../../baseURL";

const SelfieVerification = ({ onComplete, disabled }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selfie, setSelfie] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  // Function to handle file input and upload
  const handleSelfieCapture = () => {
    const inputFile = document.createElement("input");
    inputFile.type = "file";
    inputFile.accept = "image/*";
    inputFile.capture = "environment";

    inputFile.onchange = async (event) => {
      const file = event.target.files[0];
      if (file) {
        setSelfie(file);
        try {
          await uploadSelfieToBackend(file); // Trigger upload after capturing
        } catch (error) {
          setError("Failed to upload the selfie.");
        }
      }
    };

    inputFile.click();
  };

  // Function to upload selfie to the backend
  const uploadSelfieToBackend = async (file) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("selfie", file);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/user/uploadSelfie`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("Selfie uploaded successfully!");
        setOpenModal(false); // Close the modal on success
        if (onComplete) onComplete(); // Notify parent component when selfie upload is complete
      } else {
        throw new Error("Failed to upload the selfie.");
      }
    } catch (error) {
      setError(
        error.message || "An error occurred while uploading the selfie."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpenModal(true)}
        disabled={disabled} // Disable button if `disabled` prop is true
      >
        <CameraAltIcon /> Selfie Verification
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

          {/* Error message */}
          {error && <Typography color="error">{error}</Typography>}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
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
    </>
  );
};

export default SelfieVerification;
