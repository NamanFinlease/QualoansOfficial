import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { BASE_URL } from "../../baseURL";

const MobileVerification = ({ onComplete, disabled }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState("mobile"); // "mobile" or "otp"

  const sendOTP = async (mobileNumber) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${BASE_URL}/api/verify/mobile/get-otp/${mobileNumber}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (data.success) {
        setCurrentStep("otp");
      } else {
        throw new Error("Failed to send OTP.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (mobileNumber, otpCode) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/api/verify/mobile/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: mobileNumber, otp: otpCode }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Mobile number verified successfully!");
        onComplete(); // Mark the step as completed
        setOpenDialog(false);
      } else {
        throw new Error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setOpenDialog(true)}
        disabled={disabled}
      >
        Verify Mobile Number
      </Button>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>
          {currentStep === "mobile"
            ? "Enter Mobile Number"
            : `Enter OTP for ${mobile}`}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ marginBottom: 2 }}>
            {currentStep === "mobile"
              ? "Please enter your mobile number to receive an OTP."
              : "Please enter the OTP sent to your mobile number."}
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            placeholder={
              currentStep === "mobile"
                ? "Enter your mobile number"
                : "Enter OTP"
            }
            value={currentStep === "mobile" ? mobile : otp}
            onChange={(e) =>
              currentStep === "mobile"
                ? setMobile(e.target.value)
                : setOtp(e.target.value)
            }
            disabled={isLoading}
          />
        </DialogContent>
        <DialogActions>
          {isLoading ? (
            <CircularProgress size={24} />
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => {
                  if (currentStep === "otp") {
                    sendOTP(mobile); // Resend OTP
                  } else {
                    setOpenDialog(false);
                  }
                }}
              >
                {currentStep === "otp" ? "Resend OTP" : "Cancel"}
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  if (currentStep === "mobile") {
                    const mobileRegex = /^[6-9]\d{9}$/;
                    if (mobileRegex.test(mobile)) {
                      sendOTP(mobile);
                    } else {
                      alert("Please enter a valid 10-digit mobile number.");
                    }
                  } else if (currentStep === "otp") {
                    if (otp.length === 6) {
                      verifyOTP(mobile, otp);
                    } else {
                      alert("Please enter a valid 6-digit OTP.");
                    }
                  }
                }}
              >
                {currentStep === "mobile" ? "Send OTP" : "Verify OTP"}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MobileVerification;
