import React, { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
  keyframes,
} from "@mui/material";
import axios from "axios";
import loginImage from "../assets/image/Our-Mission.jpg"; // Adjust the path based on your project structure

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const LoginForm = () => {
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [aadhaarError, setAadhaarError] = useState(false);

  const apiBaseUrl = "https://example.com/api"; // Replace with your actual API base URL

  const handleAadhaarChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,12}$/.test(value)) {
      setAadhaar(value);
      setAadhaarError(false); // Reset error when input is valid
    }
  };

  const validateAadhaar = () => {
    if (aadhaar.length !== 12 || !/^\d{12}$/.test(aadhaar)) {
      setAadhaarError(true);
      return false;
    }
    return true;
  };

  const sendOtp = async () => {
    if (!validateAadhaar()) return;
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(`${apiBaseUrl}/send-otp`, { aadhaar });
      if (response.data.success) {
        setOtpSent(true);
        setSuccessMessage(
          "OTP sent successfully to your Aadhaar-linked mobile number."
        );
      } else {
        setErrorMessage(response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred while sending OTP."
      );
    }
    setLoading(false);
  };

  const resendOtp = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(`${apiBaseUrl}/resend-otp`, { aadhaar });
      if (response.data.success) {
        setSuccessMessage("OTP resent successfully.");
      } else {
        setErrorMessage(response.data.message || "Failed to resend OTP.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred while resending OTP."
      );
    }
    setLoading(false);
  };

  const verifyOtp = async () => {
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await axios.post(`${apiBaseUrl}/verify-otp`, {
        aadhaar,
        otp,
      });
      if (response.data.success) {
        setSuccessMessage("OTP verified successfully. You are logged in!");
      } else {
        setErrorMessage(response.data.message || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred while verifying OTP."
      );
    }
    setLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
        boxShadow: 4,
        borderRadius: 3,
        padding: 4,
        backgroundColor: "#ffffff",
        maxWidth: "900px",
        margin: "auto",
        mt: 8,
        mb: 8,
        animation: `${fadeIn} 0.8s ease-in-out`,
      }}
    >
      <Box
        component="img"
        src={loginImage}
        alt="Login Illustration"
        sx={{
          width: { xs: "100%", md: "50%" },
          borderRadius: 2,
          boxShadow: 3,
          marginBottom: { xs: 3, md: 0 },
          animation: `${slideIn} 1s ease-in-out`,
        }}
      />
      <Box
        sx={{
          padding: 5,
          borderRadius: 2,
          textAlign: "center",
          backgroundColor: "#f9f9f9",
          width: { xs: "100%", md: "50%" },
          animation: `${fadeIn} 1.2s ease-in-out`,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 3,
            fontWeight: "bold",
            color: "#4D4D4E",
          }}
        >
          Login with Aadhaar
        </Typography>
        {!otpSent ? (
          <>
            <TextField
              fullWidth
              label="Aadhaar Number"
              value={aadhaar}
              onChange={handleAadhaarChange}
              inputProps={{ maxLength: 12 }}
              error={aadhaarError}
              helperText={aadhaarError ? "Aadhaar number must be 12 digits." : ""}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={sendOtp}
              disabled={!aadhaar || loading}
              sx={{
                py: 1.5,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Send OTP"}
            </Button>
          </>
        ) : (
          <>
            <TextField
              fullWidth
              label="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={verifyOtp}
              disabled={!otp || loading}
              sx={{
                py: 1.5,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Verify OTP"}
            </Button>
            <Button
              variant="text"
              color="secondary"
              fullWidth
              onClick={resendOtp}
              sx={{
                mt: 1,
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
              disabled={loading}
            >
              Resend OTP
            </Button>
          </>
        )}
        {errorMessage && (
          <Typography
            color="error"
            sx={{
              mt: 2,
              animation: `${fadeIn} 0.5s ease-in-out`,
            }}
          >
            {errorMessage}
          </Typography>
        )}
        {successMessage && (
          <Typography
            color="primary"
            sx={{
              mt: 2,
              animation: `${fadeIn} 0.5s ease-in-out`,
            }}
          >
            {successMessage}
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default LoginForm;
