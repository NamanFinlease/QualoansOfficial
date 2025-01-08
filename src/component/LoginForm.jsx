import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
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
import Header from "../navbar/Header";

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

const rotateIn = keyframes`
  from {
    opacity: 0;
    transform: rotateY(90deg);
  }
  to {
    opacity: 1;
    transform: rotateY(0deg);
  }
`;

const LoginForm = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Changed to an array of 6 characters
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [aadhaarError, setAadhaarError] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);  // Track loading for Resend OTP
  const [loadingVerify, setLoadingVerify] = useState(false);  // Track loading for Verify OTP
  
  const [transactionId, setTransactionId] = useState("");
  const [fwdp, setFwdp] = useState("");
  const [codeVerifier, setCodeVerifier] = useState("");
  
  // Add the missing state variables for mobile and user registration status
  const [mobileNumber, setMobileNumber] = useState("");  // For storing mobile number
  const [userAlreadyRegistered, setUserAlreadyRegistered] = useState(false);  // For tracking if the user is registered

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
    if (!aadhaar) {
      setErrorMessage("Please enter your Aadhaar number.");
      return;
    }
  
    setLoading(true);
    setErrorMessage("");
    console.log("Sending OTP...");
  
    try {
      const response = await axios.get(
        `http://localhost:8081/api/user/aadhaar-login/${aadhaar}`
        // { withCredentials: true }
      );
  
      console.log("API Full Response:", response.data); // Debugging Step
  
      if (response.data.success) {
        setOtpSent(true);
        setSuccessMessage("OTP sent successfully to your Aadhaar-linked mobile number.");
        setTransactionId(response.data.transactionId);
        setFwdp(response.data.fwdp);
        setCodeVerifier(response.data.codeVerifier);
        setMobileNumber(response.data.mobileNumber || "Unknown"); // Handle missing mobile gracefully
        setUserAlreadyRegistered(response.data.isAlreadyRegisterdUser);
  
        console.log("Mobile captured:", response.data.mobileNumber || "Unknown"); // Debugging Step
      } else {
        setErrorMessage(response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error.response || error); // Detailed Error
      setErrorMessage(error.response?.data?.message || "An error occurred while sending OTP.");
    } finally {
      setLoading(false);
    }
  };
  
  
  
  
  const verifyOtp = async () => {
    
    if (!otp.every((digit) => digit)) {
      setErrorMessage("Please enter the OTP.");
      return;
    }
  
    if (!mobileNumber) {
      setErrorMessage("Mobile number is missing. Please resend the OTP.");
      return;
    }
  
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");
  
    try {
      if (userAlreadyRegistered) {
        // Create the request body for mobile OTP verification
        const mobileOtpRequest = {
          mobile:mobileNumber,
          otp: otp.join(""), // Join the OTP array into a single string
          isAlreadyRegisterdUser: true,
        };
    
        console.log("Mobile OTP Request:", mobileOtpRequest);
    
        const mobileOtpResponse = await axios.post(
          "http://localhost:8081/api/verify/mobile/verify-otp", mobileOtpRequest, { withCredentials: true }
        );
    
        console.log("new ",mobileOtpResponse);
    
        if (mobileOtpResponse.data?.success) {
          setSuccessMessage("OTP verified successfully!");
          Swal.fire({
            title: "OTP Verified!",
            text: "You will now be redirected to your dashboard.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/dashboard");
          });
        } else {
          setErrorMessage(mobileOtpResponse.data.message || "Invalid OTP.");
        }
      } else {
        if (!transactionId || !fwdp || !codeVerifier) {
          setErrorMessage("Missing necessary data for OTP verification.");
          return;
        }
    
        // Create the request body for Aadhaar OTP verification
        const requestBody = {
          otp: otp.join(""),
          transactionId,
          fwdp,
          codeVerifier,
        };
    
        console.log("Aadhaar OTP Request Body:", requestBody);
    
        const response = await axios.post(
          "http://localhost:8081/api/user/submit-aadhaar-otp",
          requestBody,
          { withCredentials: true }
        );
    
        if (response.data?.success) {
          setSuccessMessage("OTP verified successfully!");
          Swal.fire({
            title: "OTP Verified!",
            text: "You will now be redirected to your dashboard.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/dashboard");
          });
        } else {
          setErrorMessage(response.data.message || "Invalid OTP.");
        }
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrorMessage(error.response?.data?.message || "An error occurred while verifying OTP.");
    } finally {
      setLoading(false);
    }
  };    
  

  
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) { // Only allow numbers
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next field automatically
      if (value && index < 5) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  const handleFocus = (index) => {
    // Ensure that the box is not selected after focus
    if (!otp[index]) {
      document.getElementById(`otp-input-${index}`).value = '';
    }
  };


  return (
    <>
      <Header />
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
            animation: `${rotateIn} 1s ease-in-out`,
          }}
        />
        <Box
          sx={{
            padding: 5,
            borderRadius: 2,
            textAlign: "center",
            backgroundColor: "#f9f9f9",
            width: { xs: "100%", md: "50%" },
            animation: `${rotateIn} 1.2s ease-in-out`,
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
                sx={{ mb: 3 }} // Increased margin for better spacing
              />
              <Button
                variant="contained"
                fullWidth
                onClick={sendOtp}
                disabled={!aadhaar || loading}
                sx={{
                  background: "orange",
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
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
                {otp.map((digit, index) => (
                  <TextField
                    key={index}
                    id={`otp-input-${index}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onFocus={() => handleFocus(index)}
                    inputProps={{
                      maxLength: 1,
                      style: {
                        textAlign: 'center',
                        fontSize: '1rem', // Smaller font size for OTP box
                        width: '40px', // Reduced width
                        height: '40px', // Reduced height
                        backgroundColor: "#f4f4f4",
                        boxShadow: "0 4px 6px rgba(255, 165, 0, 0.5)", // Orange shadow effect
                        borderRadius: '8px',
                      },
                    }}
                    variant="outlined"
                    size="small"
                    sx={{
                      mr: 1, // Add space between OTP boxes
                    }}
                  />
                ))}
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
    <Button
      variant="contained"
      onClick={sendOtp}
      disabled={loadingOtp}
      sx={{
        background: "#4D4D4E",
        py: 1.5,
        width: "48%",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      {loadingOtp ? <CircularProgress size={24} /> : "Resend OTP"}
    </Button>
    <Button
      variant="contained"
      onClick={verifyOtp}
      disabled={otp.some((digit) => !digit) || loadingVerify}
      sx={{
        background: "orange",
        py: 1.5,
        width: "48%",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      {loadingVerify ? <CircularProgress size={24} /> : "Verify OTP"}
    </Button>
  </Box>
              </>
          )}
          {errorMessage && (
            <Typography variant="body2" color="error" sx={{ mt: 3 }}>
              {errorMessage}
            </Typography>
          )}
          {successMessage && (
            <Typography variant="body2" color="success" sx={{ mt: 3 }}>
              {successMessage}
            </Typography>
          )}
        </Box>
      </Box>
    </>
  );
};

export default LoginForm;
