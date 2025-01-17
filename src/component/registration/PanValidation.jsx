import React, { useState } from "react";
import { Box, CircularProgress, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, IconButton } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description'; // Import Description icon
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; // Import CheckCircle icon for validated state
import { BASE_URL } from "../../baseURL";
import Swal from "sweetalert2"; // Import SweetAlert2 for alerts

const PANValidation = ({ onComplete, disabled }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [pan, setPan] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [isPanValidated, setIsPanValidated] = useState(false); // State to track if PAN is validated

  const showPanDetails = async () => {
    setIsFetching(true);
  };

  const handleCompleteStep = async () => {
    if (disabled) return; // Prevent opening dialog if mobile verification is not complete
    setOpenDialog(true); // Open PAN input dialog when the box is clicked
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setPan("");
    setError("");
  };

  const handlePanChange = (e) => {
    setPan(e.target.value);
    setError("");
  };

  const handleSubmitPan = async () => {
    const panFormat = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
    if (!panFormat.test(pan)) {
      setError("Invalid PAN card format.");
      return;
    }

    setIsFetching(true);
    setError(""); // Clear any previous error

    try {
      const response = await fetch(
        `${BASE_URL}/api/verify/verifyPAN/${pan}`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setIsPanValidated(true); // Mark PAN as validated
        onComplete(); // Notify parent component that the step is complete
        Swal.fire("PAN card validated successfully!");
        setOpenDialog(false);
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
<Box
  onClick={handleCompleteStep}
  sx={{
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: 2,
    borderRadius: 3,
    margin: 1,
    width: "30%",
    minWidth: 200,
    cursor: disabled ? "not-allowed" : "pointer",
    textAlign: "left",
    background: isPanValidated
    ? "linear-gradient(45deg, #28a745, #218838)"
    : disabled
      ? "linear-gradient(45deg, #b5b5b5, #d6d6d6)" // Grey background when disabled
      : "linear-gradient(45deg, #4D4D4E, orange)", // Normal gradient background
    color: disabled || isPanValidated ? "white" : "black", // White text for green or grey backgrounds
    "&:hover": {
      background: disabled
        ? "linear-gradient(45deg, #b5b5b5, #d6d6d6)"
        : isPanValidated
        ? "linear-gradient(45deg, #66BB6A, #A5D6A7)" // Hover effect for green background
        : "linear-gradient(45deg, #ffcc00, orange)", // Hover effect for normal background
    },
    "@media (max-width: 600px)": {
      width: "80%",
      margin: "auto",
    },
  }}
>
  <IconButton sx={{ color: disabled || isPanValidated ? "white" : "black", ml: 1 }} disabled={disabled}>
    {isPanValidated ? (
      <CheckCircleIcon sx={{ color: "white" }} /> // White tick icon for green background
    ) : (
      <DescriptionIcon sx={{ color: disabled ? "#7f7f7f" : "white" }} />
    )}
  </IconButton>
  <Box sx={{ ml: 2, flexGrow: 1 }}>
    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
      PAN Verification
    </Typography>
    <Typography variant="body2" sx={{ color: disabled || isPanValidated ? "white" : "black" }}>
      Verify your PAN card number
    </Typography>
  </Box>
</Box>

      {/* Dialog for PAN input */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            padding: 3,
            borderRadius: 3,
            background: "white",
            boxShadow: 3,
          },
        }}
      >
        <DialogTitle sx={{ color: "black", textAlign: "left" }}>
          Enter your PAN Number
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: "black", marginBottom: 2 }}>
            Please enter your PAN number to verify it.
          </Typography>
          <TextField
            label="PAN Number"
            value={pan}
            onChange={handlePanChange}
            disabled={isFetching || disabled} // Disable input when fetching or disabled
            fullWidth
            variant="outlined"
            placeholder="Enter your PAN number"
            sx={{
              marginBottom: 2,
              input: { color: "black" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "black" },
                "&:hover fieldset": { borderColor: "#ffcc00" },
              },
            }}
          />
          {error && (
            <Typography variant="body2" sx={{ color: "red", marginTop: 2 }}>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          {isFetching ? (
            <CircularProgress size={24} />
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={handleCloseDialog}
                sx={{ color: "black", borderColor: "black" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmitPan}
                sx={{ backgroundColor: "#ffcc00", color: "black" }}
              >
                Submit
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PANValidation;
