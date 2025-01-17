import React, { useState } from "react";
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography, IconButton } from "@mui/material";
import DescriptionIcon from '@mui/icons-material/Description'; // Import Description icon
import { BASE_URL } from "../../baseURL";
import Swal from "sweetalert2"; // Import SweetAlert2 for alerts

const PANValidation = ({ onComplete, disabled }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [pan, setPan] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");

  const showPanDetails = async () => {
    setIsFetching(true);
  };

  const handleCompleteStep = async () => {
    if (disabled) return;
    setOpenDialog(true); // Open PAN input dialog when the step starts
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
        <IconButton sx={{ color: "white", ml: 1 }} disabled={disabled}>
        <DescriptionIcon sx={{ color: "white" }} /> {/* Set icon color to white */}        </IconButton>
        <Box sx={{ ml: 2, flexGrow: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            PAN Verification
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            Verify your PAN card number
          </Typography>
        </Box>
        <Button
          variant="contained"
          onClick={handleCompleteStep} // Trigger dialog on click
          sx={{
            ml: 2,
            background: "linear-gradient(45deg, #4D4D4E, orange)",
            color: "white",
            "&:hover": { backgroundColor: "#ffcc00" },
          }}
          disabled={disabled} // Disable button when step is completed
        >
          Start
        </Button>
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
            disabled={isFetching}
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
