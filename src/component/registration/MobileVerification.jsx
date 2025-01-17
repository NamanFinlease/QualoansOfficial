import React, { useState } from "react";
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
import Swal from "sweetalert2"; // Import SweetAlert2 for alerts
import { BASE_URL } from "../../baseURL";

// Reusable Input Component
const InputField = ({ label, value, onChange, disabled, placeholder }) => (
  <TextField
    fullWidth
    variant="outlined"
    label={label}
    value={value}
    onChange={onChange}
    disabled={disabled}
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

const MobileVerification = ({ onComplete, disabled }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState("mobile"); // "mobile" or "otp"
  const [isOtpVerified, setIsOtpVerified] = useState(false); // New state to track OTP verification status

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
      console.log("data",data);
      
      if (data.success) {
        setCurrentStep("otp");
        // Swal.fire("OTP Sent", "Please check your mobile for the OTP.", "success");
      } else {
        throw new Error("Failed to send OTP.");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to send OTP. Please try again.", "error");
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
        Swal.fire("Verified", "Mobile number verified successfully!", "success");
        setIsOtpVerified(true); // Mark OTP as verified
        onComplete(); // Mark the step as completed
        setOpenDialog(false);
      } else {
        throw new Error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      Swal.fire("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const StepBox = ({ icon, title, description, stepId, onComplete, isCompleted }) => (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start", // Align items to the left
        justifyContent: "center",
        padding: 2,
        border: "2px solid",
        borderRadius: 3,
        margin: 1,
        width: "30%", // Adjust width for larger screens
        minWidth: 200,
        cursor: "pointer",
        textAlign: "left", // Left align text
        color: "white",
        background: "linear-gradient(45deg, #4D4D4E, orange)",
        "@media (max-width: 600px)": {
          // For mobile responsiveness
          width: "80%", // Make the step box larger on smaller screens
          margin: "auto", // Center the boxes
        },
      }}
    >
      <IconButton sx={{ color: "white", ml: 1 }}>{icon}</IconButton>
      <Box sx={{ ml: 2, flexGrow: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: "white" }}>
          {description}
        </Typography>
      </Box>
      <Button
        variant="contained"
        onClick={onComplete}
        sx={{
          ml: 2,
          background: "linear-gradient(45deg, #4D4D4E, orange)",
          color: "white",
          "&:hover": { backgroundColor: "#ffcc00" },
        }}
        disabled={isCompleted} // Disable button if step is completed
      >
        Start
      </Button>
    </Box>
  );
  
  return (
    <>
          <StepBox
        icon={<PhoneIcon />}
        title="Mobile Verification"
        description="Verify your mobile number"
        stepId="mobile"
        onComplete={() => setOpenDialog(true)}
        isCompleted={isOtpVerified} // Pass OTP verification status
      />

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            padding: 3,
            borderRadius: 3,
            background: "white", // Set background to white
            boxShadow: 3, // Add a subtle shadow to the dialog
          },
        }}
      >
        <DialogTitle sx={{ color: "black", textAlign: "left" }}>
          {currentStep === "mobile"
            ? "Enter Mobile Number"
            : `Enter OTP for ${mobile}`}
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ color: "black", marginBottom: 2 }}>
            {currentStep === "mobile"
              ? "Please enter your mobile number to receive an OTP."
              : "Please enter the OTP sent to your mobile number."}
          </Typography>
          <InputField
            label={currentStep === "mobile" ? "Mobile Number" : "OTP"}
            value={currentStep === "mobile" ? mobile : otp}
            onChange={(e) =>
              currentStep === "mobile" ? setMobile(e.target.value) : setOtp(e.target.value)
            }
            disabled={isLoading}
            placeholder={
              currentStep === "mobile" ? "Enter your mobile number" : "Enter OTP"
            }
          />
        </DialogContent>
        <DialogActions>
          {isLoading ? (
            <CircularProgress size={24} />
          ) : (
            <>
              <Button
                variant="outlined"
                onClick={() => setOpenDialog(false)}
                sx={{ color: "black", borderColor: "black" }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  if (currentStep === "mobile") {
                    const mobileRegex = /^[6-9]\d{9}$/;
                    if (mobileRegex.test(mobile)) {
                      sendOTP(mobile);
                    } else {
                      Swal.fire("Invalid Input", "Enter a valid 10-digit number.", "warning");
                    }
                  } else if (currentStep === "otp") {
                    if (otp.length === 6) {
                      verifyOTP(mobile, otp);
                    } else {
                      Swal.fire("Invalid Input", "Enter a valid 6-digit OTP.", "warning");
                    }
                  }
                }}
                sx={{ backgroundColor: "#ffcc00", color: "black" }}
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
