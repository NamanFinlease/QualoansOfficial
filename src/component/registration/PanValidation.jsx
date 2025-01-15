import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { BASE_URL } from "../../baseURL";

const PANValidation = ({ onComplete, disabled }) => {
  const [openModal, setOpenModal] = useState(false);
  const [formValues, setFormValues] = useState({ pan: "" });
  const [error, setError] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [completedSteps, setCompletedSteps] = useState({});
  const [progress, setProgress] = useState(0);

  const handleCompleteStep = async (step) => {
    if (step === "pan") {
      setOpenModal(true);
    } else if (!completedSteps[step]) {
      // Mark the step as completed
      setCompletedSteps((prev) => ({ ...prev, [step]: true }));

      // Update the progress
      const completedCount =
        Object.values(completedSteps).filter(Boolean).length;
      setProgress((completedCount + 1) * (100 / 6)); // Update progress percentage
    }
  };

  const handlePanChange = (e) => {
    setFormValues((prev) => ({ ...prev, pan: e.target.value }));
    setError("");
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFormValues({ pan: "" });
    setError("");
  };

  const handleSubmitPan = async () => {
    const panFormat = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panFormat.test(formValues.pan)) {
      setError("Invalid PAN card format.");
      return;
    }

    setIsFetching(true);
    setError(""); // Clear any previous error

    try {
      const response = await fetch(
        `${BASE_URL}/api/verify/verifyPAN/${formValues.pan}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setCompletedSteps((prev) => ({ ...prev, pan: true }));
        setProgress((prev) => (prev === 100 ? 100 : prev + 16.67)); // 16.67% per step
        handleCloseModal();
        onComplete(); // Notify parent component that the step is complete
        alert("PAN card validated successfully!");
      } else {
        setError(data.message || "Error validating PAN.");
      }
    } catch (err) {
      console.error("Request Error:", err);
      setError("Error validating PAN. Please try again.");
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => handleCompleteStep("pan")}
        disabled={disabled} // Disable the button if step is already completed
      >
        Validate PAN
      </Button>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          sx={{
            backgroundColor: "white",
            borderRadius: 4,
            boxShadow: 24,
            padding: 3,
            maxWidth: 400,
            margin: "auto",
            marginTop: "20%",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Enter your PAN Number
          </Typography>
          <TextField
            label="PAN Number"
            variant="outlined"
            fullWidth
            value={formValues.pan}
            onChange={handlePanChange}
            sx={{ marginBottom: 2 }}
            error={!!error}
            helperText={error}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleCloseModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmitPan}
              disabled={isFetching}
            >
              {isFetching ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default PANValidation;
