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
import axios from "axios";
const PANValidation = ({ onComplete, disabled, prefillData, isVerified }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [pan, setPan] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState("");
  const [formValues, setFormValues] = useState({ pan: "" });

  const [isPanValidated, setIsPanValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  console.log(prefillData)

  // Prefill PAN data if available
  // useEffect(() => {
  //   if (prefillData) {
  //     setIsPanValidated(true);
  //   }
  // }, [prefillData]);

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
    setPan(e.target.value.toUpperCase().trim());
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
      const response = await fetch(`${BASE_URL}/verifyPAN/${pan}`, {
        method: "POST",
        credentials: "include",
      });

      const data = await response.json();

      console.log(data)

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

  const handleModalClick = async () => {
    setOpenDialog(true);
    setIsLoading(true);

    try {
      const getDashboardDetailsResponse = await axios.get(
        `${BASE_URL}/getDashboardDetails`,
        {
          withCredentials: true,
        }
      );

      if (getDashboardDetailsResponse.status === 200) {
        const { isPanVerify } = getDashboardDetailsResponse.data;
        setIsPanValidated(isPanVerify);

        if (isPanVerify) {
          const getProfileDetailsResponse = await axios.get(
            `${BASE_URL}/getProfileDetails`,
            { withCredentials: true }
          );

          // Retrieve the PAN number from the response
          const panNumber = getProfileDetailsResponse?.data?.data?.PAN;

          if (panNumber) {
            setPan(panNumber); // Set the PAN number here
            console.log("PAN set: ", panNumber); // Log for debugging
          } else {
            console.error("PAN number is not available in profile data.");
          }
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Reset loading state after API call completes
    }
  };

  return (
    <>
      <Box
        onClick={!disabled && handleModalClick}
        // onClick={handleCompleteStep}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 2,
          borderRadius: 3,
          margin: 1,
          width: "25%",
          minWidth: 200,
          cursor: disabled ? "not-allowed" : "pointer",
          textAlign: "left",
          background:
            // isPanValidated ? "linear-gradient(45deg, #28a745, #218838)":
            disabled ? "#d9d9d9" : "#F26722",
          color:
            // isPanValidated ||
            disabled ? "white" : "#1c1c1c",
          // "&:hover": {
          //   background: disabled
          //     ? "linear-gradient(45deg, #b5b5b5, #d6d6d6)"
          //     : isPanValidated && "linear-gradient(45deg, #66BB6A, #A5D6A7)",
          //   // : "linear-gradient(45deg, #ffcc00, orange)",
          // },
          "@media (max-width: 600px)": {
            width: "80%",
            margin: "auto",
          },
        }}
      >
        <IconButton
          sx={{
            color:
              //  isPanValidated ||
            
              disabled ? "grey" : "white",      
                    ml: 1,
          }}
          disabled={disabled}
        >
          {isPanValidated || isVerified ? (
            <CheckCircleIcon sx={{ color: "green" }} />
          ) : (
            <DescriptionIcon sx={{ color: disabled ? "#1c1c1c" : "white" }} />
          )}
        </IconButton>
        <Box sx={{ ml: 2, flexGrow: 1 }}>
          <Typography
            sx={{ fontWeight: "bold", color: disabled ? "#1c1c1c" : "white" }}
          >
            PAN Verification
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color:
                // isPanValidated ? "white" :
                disabled ? "#1c1c1c" : "white",
            }}
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
        <DialogTitle sx={{ color: "#1c1c1c", textAlign: "left" }}>
          Enter your PAN Number
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body2"
            sx={{ color: "#1c1c1c", marginBottom: 2 }}
          >
            Please enter your PAN number to verify it.
          </Typography>
          <TextField
            label="PAN Number"
            value={pan} // Bind to the pan state
            // onChange={handlePanChange}
            onChange={(e) => {
              const inputValue = e.target.value.toUpperCase(); // Convert to uppercase
              const formattedValue = inputValue.replace(/[^A-Z0-9]/g, ""); // Allow only alphanumeric characters
              if (formattedValue.length <= 10) {
                setPan(formattedValue); // Update state only if within limit
              }
            }}
            disabled={isFetching || disabled}
            fullWidth
            variant="outlined"
            maxLength={10}
            placeholder="Enter your PAN number"
            sx={{
              marginBottom: 2,
              input: { color: "#1c1c1c" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#1c1c1c" },
                "&:hover fieldset": { borderColor: "#F26722" },
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
                sx={{ color: "#1c1c1c", borderColor: "#1c1c1c" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSubmitPan}
                sx={{ backgroundColor: "#F26722", color: "white" }}
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
