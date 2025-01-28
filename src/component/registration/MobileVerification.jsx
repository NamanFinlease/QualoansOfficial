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

const MobileVerification = ({
  onComplete,
  disabled,
  prefillData,
  // isVerified,
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState("mobile");
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isMobileVerified, setIsMobileVerified] = useState(false);
  // const [formValues, setFormValues] = useState({
  //   mobile: null,
  // });
  // useEffect(() => {
  //   if (prefillData && prefillData.mobile && prefillData.verified) {
  //     setMobile(prefillData.mobile);
  //     setIsOtpVerified(true);
  //   }
  // }, [prefillData]);

  // useEffect(async () => {
  //   // const fetchProfileDetails = async () => {
  //   // try {
  //   if (isVerified) {
  //     const response = await axios.get(
  //       `${BASE_URL}/api/loanApplication/getProfileDetails`,
  //       { withCredentials: true }
  //     );
  //     console.log("mobbbb sdfsdfsd>>><<<<<", response.data.documents);
  //     // setFormValues({ mobile });
  //   }
  //   // } catch (error) {
  //   //   console.error("Error fetching profile details:", error);
  //   // }
  //   // };
  //   // fetchProfileDetails();
  // }, []);

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
      Swal.fire("Error", error.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const resendOTP = () => {
    if (mobile) {
      sendOTP(mobile);
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

    try {
      // Fetch dashboard details
      const getDashboardDetailsResponse = await axios.get(
        `${BASE_URL}/api/user/getDashboardDetails`,
        {
          withCredentials: true,
        }
      );

      if (getDashboardDetailsResponse.status === 200) {
        const { isMobileVerify } = getDashboardDetailsResponse.data;
        setIsMobileVerified(isMobileVerify);

        if (isMobileVerify) {
          // Fetch profile details if mobile is verified
          const getProfileDetailsResponse = await axios.get(
            `${BASE_URL}/api/user/getProfileDetails`,
            { withCredentials: true }
          );

          // Update mobile number if available in response
          const mobileNumber = getProfileDetailsResponse?.data?.data?.mobile;
          if (mobileNumber) {
            setMobile(mobileNumber);
            console.log("Mobile set: ", mobileNumber);
          } else {
            console.error("Mobile number is not available in profile data.");
          }
        } else {
          console.log(
            "Mobile is not verified. Skipping profile details fetch."
          );
        }
      } else {
        console.error("Failed to fetch dashboard details.");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
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
        borderColor:
          // completed ? "green" :
          disabled ? "#1c1c1c" : "#F26722",
        borderRadius: 3,
        margin: 1,
        width: "25%",
        minWidth: 200,
        cursor: disabled ? "not-allowed" : "pointer",
        textAlign: "left",
        background:
          //  completed
          //   ? "linear-gradient(45deg, #28a745, #218838)" // Green gradient when step is complete
          //   :
          disabled ? "#d9d9d9" : "#F26722",
        color:
          //  completed ||
          !disabled ? "white" : "#1c1c1c",
        "@media (max-width: 600px)": {
          width: "80%",
          margin: "auto",
        },
      }}
    >
      <IconButton
        sx={{
          color:
            // completed ? "white" :
            disabled ? "grey" : "white",
          ml: 1,
        }}
      >
        {completed ? <CheckCircleIcon /> : icon}
      </IconButton>
      <Box sx={{ ml: 2, flexGrow: 1 }}>
        <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </Box>
    </Box>
  );

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
          {currentStep === "mobile"
            ? "Enter Mobile Number"
            : `Enter OTP for ${mobile}`}
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body2"
            sx={{ color: "#1c1c1c", marginBottom: 2 }}
          >
            {currentStep === "mobile"
              ? "Please enter your mobile number to receive an OTP."
              : "Please enter the OTP sent to your mobile number."}
          </Typography>
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
          />
        </DialogContent>
        <DialogActions>
          {isLoading ? (
            <CircularProgress size={24} />
          ) : (
            <>
              <Button
                variant="contained"
                onClick={() => {
                  if (currentStep === "mobile") {
                    const mobileRegex = /^[6-9]\d{9}$/;
                    if (mobileRegex.test(mobile)) {
                      sendOTP(mobile);
                    } else {
                      Swal.fire(
                        "Invalid Input",
                        "Enter a valid 10-digit number.",
                        "warning"
                      );
                    }
                  } else if (currentStep === "otp") {
                    if (otp.length === 6) {
                      verifyOTP(mobile, otp);
                    } else {
                      Swal.fire(
                        "Invalid Input",
                        "Enter a valid 6-digit OTP.",
                        "warning"
                      );
                    }
                  }
                }}
                sx={{ backgroundColor: "#F26722", color: "white" }}
              >
                {currentStep === "mobile" ? "Send OTP" : "Verify OTP"}
              </Button>
              {currentStep === "otp" && !isOtpVerified && (
                <Button
                  variant="outlined"
                  onClick={resendOTP}
                  sx={{ color: "#1c1c1c", borderColor: "#1c1c1c" }}
                >
                  Resend OTP
                </Button>
              )}
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MobileVerification;
