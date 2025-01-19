import React, { useState, useEffect } from "react";
import {
  Box,
  CircularProgress,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import DescriptionIcon from "@mui/icons-material/Description";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { BASE_URL } from "../../baseURL";
import Swal from "sweetalert2";

const PANValidation = ({ onComplete, disabled, prefillData }) => {
  console.log("PANValidation -> prefillData", prefillData);
  const [openDialog, setOpenDialog] = useState(false);
  const [pan, setPan] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [isPanValidated, setIsPanValidated] = useState(false);

  // Prefill PAN data if available
  useEffect(() => {
    if (prefillData && prefillData.pan) {
      setPan(prefillData.pan);
      setIsPanValidated(true);
    }
  }, [prefillData]);

  const handleCompleteStep = async () => {
    if (disabled) return;
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setPan(prefillData?.pan || "");
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
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/api/verify/verifyPAN/${pan}`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setIsPanValidated(true);
        onComplete({ pan }); // Pass validated PAN data to parent component
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
            ? "linear-gradient(45deg, #b5b5b5, #d6d6d6)"
            : "linear-gradient(45deg, #4D4D4E, orange)",
          color: disabled || isPanValidated ? "white" : "black",
          "&:hover": {
            background: disabled
              ? "linear-gradient(45deg, #b5b5b5, #d6d6d6)"
              : isPanValidated && "linear-gradient(45deg, #66BB6A, #A5D6A7)",
            // : "linear-gradient(45deg, #ffcc00, orange)",
          },
          "@media (max-width: 600px)": {
            width: "80%",
            margin: "auto",
          },
        }}
      >
        <IconButton
          sx={{ color: disabled || isPanValidated ? "white" : "black", ml: 1 }}
          disabled={disabled}
        >
          {isPanValidated ? (
            <CheckCircleIcon sx={{ color: "white" }} />
          ) : (
            <DescriptionIcon sx={{ color: disabled ? "#7f7f7f" : "white" }} />
          )}
        </IconButton>
        <Box sx={{ ml: 2, flexGrow: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: disabled ? "#7f7f7f" : "white" }}
          >
            PAN Verification
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: disabled || isPanValidated ? "#7f7f7f" : "white" }}
          >
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
            disabled={isFetching || disabled}
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
