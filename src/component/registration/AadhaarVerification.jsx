import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/PhoneIphone";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Swal from "sweetalert2";
import { BASE_URL } from "../../baseURL";
import { a } from "framer-motion/client";
import axios from "axios";

const InputField = ({ label, value, onChange, placeholder }) => (
  <TextField
    fullWidth
    variant="outlined"
    label={label}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    sx={{
      input: { color: "black" },
      "& .MuiOutlinedInput-root": {
        "& fieldset": { borderColor: "black" },
        "&:hover fieldset": { borderColor: "#ffcc00" },
      },
    }}
  />
);

const AadhaarVerification = ({
  onComplete,
  disabled,
  prefillData,
  isVerified,
  profileData,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  // const [mobile, setMobile] = useState("");
  const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState("aadhaar");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [formValues, setFormValues] = useState({
    aadhaar: "",
  });
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isResendingOtp, setIsResendingOtp] = useState(false);

  const sendOTP = async (aadhaar) => {
    setIsSendingOtp(true);
    try {
      const response = await axios.get(`${BASE_URL}/aadhaar/${aadhaar}`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) {
        alert("OTP sent to your Aadhaar registered mobile number");
        setCurrentStep("otp");
      } else {
        throw new Error(response.data.message || "Failed to fetch OTP.");
      }
    } catch (error) {
      alert("Error: " + (error.response?.data?.message || error.message));
    } finally {
      setIsSendingOtp(false);
    }
  };

  useEffect(() => {
    if (isOtpVerified) {
      console.log("OTP verified successfully! Moving to the next step.");
      onComplete({ aadhaar: aadhaar, verified: true });
      setOpenDialog(false); // Close modal
    }
  }, [isOtpVerified, aadhaar]);

  // useEffect(() => {
  //   if (isOtpVerified) {
  //     console.log("OTP verified successfully! State updated.");
  //     onComplete({ aadhaar: aadhaar, verified: true });
  //     setOpenDialog(false); // Modal close karne ke liye
  //   }
  // }, [isOtpVerified]);

  // const verifyOTP = async (aadhaar, otpCode) => {
  //   setIsVerifyingOtp(true);
  //   try {
  //     const response = await fetch(`${BASE_URL}/submit-aadhaar-otp`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       credentials: "include",
  //       body: JSON.stringify({
  //         otp: otpCode,
  //         aadhaar_number: aadhaar,
  //         consent: "Y",
  //       }),
  //     });

  //     if (response.status === 200) {
  //       Swal.fire(
  //         "Verified",
  //         "Aadhaar number verified successfully!",
  //         "success"
  //       );

  //       setIsOtpVerified(true); // OTP verified state update
  //       setOpenDialog(false);
  //     } else {
  //       alert("Invalid OTP. Please try again.");
  //     }
  //   } catch (error) {
  //     alert(error.response?.data?.message || "Error verifying OTP.");
  //   } finally {
  //     setIsVerifyingOtp(false);
  //   }
  // };

  const verifyOTP = async (aadhaar, otpCode) => {
    setIsVerifyingOtp(true);
    try {
      const response = await fetch(`${BASE_URL}/submit-aadhaar-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          otp: otpCode,
          aadhaar_number: aadhaar,
          consent: "Y",
        }),
      });

      if (response.status === 200) {
        Swal.fire(
          "Verified",
          "Aadhaar number verified successfully!",
          "success"
        );
        setIsOtpVerified(true);
        onComplete({ aadhaar: aadhaar, verified: true });

        setOpenDialog(false);
      } else {
        alert("Invalid OTP. Please try again.");
      }
    } catch (error) {
      alert(error.response.data.message);
    } finally {
      setIsVerifyingOtp(true);
    }
  };

  // useEffect(() => {}, [aadhaar]);

  const resendOTP = () => {
    setIsResendingOtp(true);
    setOtp("");

    if (aadhaar) {
      sendOTP(aadhaar);
    } else {
      alert("Please enter an Aadhaar number to resend OTP.");
    }

    setTimeout(() => setIsResendingOtp(false), 2000); // Simulate API delay
  };

  // const handleModalClick = async () => {
  //   setOpenDialog(true);
  //   setIsLoading(true);
  //   // Fetch dashboard details and set mobile number if available
  //   // ... (existing code)
  // };

  const handleModalClick = async () => {
    setOpenDialog(true);
    setIsLoading(true);

    try {
      const getDashboardDetailsResponse = await axios.get(
        `${BASE_URL}/getDashboardDetails`,
        { withCredentials: true }
      );

      if (getDashboardDetailsResponse.status === 200) {
        setIsLoading(false);
        const { isAadharVerify } = getDashboardDetailsResponse.data;

        console.log("isAadharVerify:", isAadharVerify);

        setAadhaar(isAadharVerify ? "Verified" : ""); // Set Aadhaar verification status
        console.log("aadhaar:>>>>>>>>", aadhaar);

        if (isAadharVerify) {
          setIsOtpVerified(true); // Mark as verified
          onComplete({ aadhaar: aadhaar, verified: true }); // Ensure parent state updates

          setOpenDialog(false); // Close modal if already verified
        } else {
          // Fetch Aadhaar-related profile details if not verified
          const getProfileDetailsResponse = await axios.get(
            `${BASE_URL}/getProfileDetails`,
            { withCredentials: true }
          );

          const aadhaarVerify =
            getProfileDetailsResponse?.data?.data?.aadhaarNumber;
          console.log("aadhaarVerify:>>>>>>>>", aadhaarVerify);

          setFormValues({
            aadhaar: aadhaarVerify?.aadhaar || "",
          });
        }
      }
    } catch (error) {
      setIsLoading(false);
      alert("Error fetching data: " + error.message);
    }
  };

  const StepBox = ({
    icon,
    title,
    description,
    onClick,
    disabled,
    completed,
  }) => (
    <Box
      onClick={!disabled ? onClick : null}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: 2,
        borderColor: disabled ? "#1c1c1c" : "#F26722",
        borderRadius: 3,
        margin: 1,
        width: "25%",
        minWidth: 200,
        cursor: disabled ? "not-allowed" : "pointer",
        textAlign: "left",
        background: disabled ? "#d9d9d9" : "rgb(72, 145, 193)",
        color: !disabled ? "white" : "#1c1c1c",
        "@media (max-width: 600px)": {
          width: "80%",
          margin: "auto",
        },
      }}
    >
      <IconButton
        sx={{
          color: disabled ? "grey" : "white",
          ml: 1,
        }}
      >
        {completed || isVerified ? (
          <CheckCircleIcon sx={{ color: "green" }} />
        ) : (
          icon
        )}
      </IconButton>
      <Box sx={{ ml: 2, flexGrow: 1 }}>
        <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Box>
  );

  // Use useEffect to set form values from profileData
  useEffect(() => {
    if (profileData?.data) {
      setFormValues({
        // fathersName: profileData?.data?.personalDetails?.fathersName || "",
        // pan: profileData.data.PAN || "",
        aadhaar: profileData.data.aadhaar || "",
      });
      setAadhaar(profileData.data.aadhaar || ""); // Set mobile number if available
    }
  }, [profileData]);

  return (
    <>
      <StepBox
        icon={<PhoneIcon />}
        title="Aadhar Verification"
        description="Verify your Aadhar number"
        onClick={handleModalClick}
        disabled={disabled}
        completed={isOtpVerified}
      />

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
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
          <Typography variant="h6">Enter Aadhaar Number</Typography>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: "#1c1c1c", margin: 2 }}>
            {currentStep === "aadhaar"
              ? "Please enter your addhaar number to receive an OTP."
              : "Please enter the OTP sent to your aadhaar registerd mobile number."}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <InputField
              label={currentStep === "aadhaar" ? "Aadhaar Number" : "OTP"}
              value={currentStep === "aadhaar" ? aadhaar : otp}
              onChange={(e) => {
                if (currentStep === "aadhaar") {
                  setAadhaar(e.target.value.trim());
                  setFormValues({
                    ...formValues,
                    aadhaar: e.target.value.trim(),
                  });
                } else {
                  setOtp(e.target.value.trim()); // OTP input field update hoga
                }
              }}
              disabled={isLoading || isOtpVerified}
              placeholder={
                currentStep === "aadhaar"
                  ? "Enter your Aadhaar number"
                  : "Enter OTP"
              }
            />

            {currentStep === "aadhaar" && (
              <Button
                variant="contained"
                onClick={() => {
                  const aadhaarRegex = /^\d{12}$/;
                  if (aadhaarRegex.test(aadhaar)) {
                    sendOTP(aadhaar);
                  } else {
                    alert(
                      "Invalid Input",
                      "Enter a valid 12-digit Aadhaar number.",
                      "warning"
                    );
                  }
                }}
                sx={{
                  marginLeft: 1,
                  backgroundColor: "#F26722",
                  color: "white",
                }}
              >
                {isSendingOtp ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Send OTP"
                )}
              </Button>
            )}
          </Box>
        </DialogContent>

        <DialogActions>
          <>
            {currentStep === "otp" && !isOtpVerified && (
              <Button
                variant="outlined"
                onClick={resendOTP}
                sx={{ color: "#1c1c1c", borderColor: "#1c1c1c" }}
              >
                {isResendingOtp ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Resend OTP"
                )}
              </Button>
            )}

            {currentStep === "otp" && (
              <Button
                variant="contained"
                onClick={() => {
                  if (otp.length === 6) {
                    verifyOTP(aadhaar, otp);
                  } else {
                    alert(
                      "Invalid Input",
                      "Enter a valid 6-digit OTP.",
                      "warning"
                    );
                  }
                }}
                sx={{ backgroundColor: "#F26722", color: "white" }}
              >
                {isVerifyingOtp ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  "Verify OTP"
                )}
              </Button>
            )}
          </>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AadhaarVerification;
