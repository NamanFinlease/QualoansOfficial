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

const MobileVerification = ({
  onComplete,
  disabled,
  prefillData,
  isVerified,
  profileData,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState("mobile");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [formValues, setFormValues] = useState({
    fathersName: "",
    pan: "",
    mobile: "",
  });

  const sendOTP = async (mobileNumber, fathersName, pan) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${BASE_URL}/mobile/get-otp/${mobileNumber}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ fathersName, PAN: pan }), // Pass father's name and PAN
        }
      );
      const data = await response.json();
      if (data.success) {
        setCurrentStep("otp");
      } else {
        throw new Error("Failed to send OTP.");
      }
    } catch (error) {
      alert("Error", error.message, "error");
      console.error("Error sending OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOTP = async (mobileNumber, otpCode) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/mobile/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: mobileNumber, otp: otpCode }),
      });
      const data = await response.json();
      if (data.success) {
        Swal.fire(
          "Verified",
          "Mobile number verified successfully!",
          "success"
        );
        setIsOtpVerified(true);
        onComplete({ mobile: mobileNumber, verified: true });
        setOpenDialog(false);
      } else {
        throw new Error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      alert("Invalid OTP. Please Enter Valid OTP", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = () => {
    setOtp("");
    if (mobile) {
      sendOTP(mobile, formValues.fathersName, formValues.pan);
    } else {
      Swal.fire(
        "Error",
        "Please enter a mobile number to resend OTP.",
        "warning"
      );
    }
  };

  const handleModalClick = async () => {
    setOpenDialog(true);
    setIsLoading(true);
    // Fetch dashboard details and set mobile number if available
    // ... (existing code)
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
        background: disabled ? "#d9d9d9" : "#F26722",
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
        fathersName: profileData?.data?.personalDetails?.fathersName || "",
        pan: profileData.data.PAN || "",
        mobile: profileData.data.mobile || "",
      });
      setMobile(profileData.data.mobile || ""); // Set mobile number if available
    }
  }, [profileData]);

  return (
    <>
      <StepBox
        icon={<PhoneIcon />}
        title="Mobile Verification"
        description="Verify your mobile number"
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
          <Typography variant="h6">Enter Mobile Number and Details</Typography>
        </DialogTitle>
        <DialogContent>
          {currentStep === "mobile" && ( // Hide fields when OTP step starts
            <>
              <Typography variant="body2" sx={{ color: "#1c1c1c", margin: 2 }}>
                Enter Your Father's Name
              </Typography>
              <InputField
                label="Father's Name"
                name="fathersName"
                value={formValues.fathersName}
                onChange={(e) => {
                  setFormValues((prev) => ({
                    ...prev,
                    fathersName: e.target.value,
                  }));
                }}
                placeholder="Enter your father's name"
                required
              />

              <Typography variant="body2" sx={{ color: "#1c1c1c", margin: 2 }}>
                Enter Your PAN
              </Typography>
              <InputField
                label="PAN"
                name="pan"
                value={formValues.pan}
                onChange={(e) => {
                  let panValue = e.target.value.toUpperCase().trim();
                  if (panValue.length > 10) {
                    panValue = panValue.slice(0, 10);
                  }
                  setFormValues((prev) => ({
                    ...prev,
                    pan: panValue,
                  }));
                }}
                placeholder="Enter your PAN"
                maxLength={10}
                error={
                  formValues.pan !== "" &&
                  !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formValues.pan)
                }
                helperText={
                  formValues.pan !== "" &&
                  !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(formValues.pan)
                    ? "Invalid PAN format (e.g., ABCDE1234F)"
                    : ""
                }
              />
            </>
          )}

          <Typography variant="body2" sx={{ color: "#1c1c1c", margin: 2 }}>
            {currentStep === "mobile"
              ? "Please enter your mobile number to receive an OTP."
              : "Please enter the OTP sent to your mobile number."}
          </Typography>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <InputField
              label={currentStep === "mobile" ? "Mobile Number" : "OTP"}
              value={currentStep === "mobile" ? mobile : otp}
              onChange={(e) =>
                currentStep === "mobile"
                  ? setMobile(e.target.value.trim())
                  : setOtp(e.target.value.trim())
              }
              disabled={isLoading || isOtpVerified}
              placeholder={
                currentStep === "mobile"
                  ? "Enter your mobile number"
                  : "Enter OTP"
              }
              sx={{ flexGrow: 1 }}
            />
            {currentStep === "mobile" && (
              <Button
                variant="contained"
                onClick={() => {
                  const mobileRegex = /^[6-9]\d{9}$/;
                  if (mobileRegex.test(mobile)) {
                    sendOTP(mobile, formValues.fathersName, formValues.pan);
                  } else {
                    alert(
                      "Invalid Input",
                      "Enter a valid 10-digit number.",
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
                Send OTP
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
                Resend OTP
              </Button>
            )}
            {currentStep === "otp" && (
              <Button
                variant="contained"
                onClick={() => {
                  if (otp.length === 6) {
                    verifyOTP(mobile, otp);
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
                Verify OTP
              </Button>
            )}
          </>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MobileVerification;
