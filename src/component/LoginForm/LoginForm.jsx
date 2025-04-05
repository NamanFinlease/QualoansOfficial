import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Button,
  TextField,
  Typography,
  Box,
  CircularProgress,
  keyframes,
  Grid,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import loginGif from "../../assets/image/Untitled design (2) (1).gif"; // Adjust the path based on your project structure
import Header from "../../navbar/Header";
import { BASE_URL } from "../../baseURL";
import BlueBoxCard from "./BlueBoxCard";
import SimpleBarChart from "../../Bar/SimpleBarChart";
import EligibilityCriteria from "./EligiblityCriteria";
import backgroundImage from "../../assets/image/QUA Loan logo cover.png"; // Adjust the path based on your project structure
import RatesAndFees from "./RatesAndFees";
import AddressAndCredential from "./AddressAndCredential";
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

const LoginForm = ({ setLoginComleted }) => {
  const navigate = useNavigate(); // Initialize the navigate function
  // const [aadhaar, setAadhaar] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Changed to an array of 6 characters
  const [otpSent, setOtpSent] = useState(false);
  // const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [mobileError, setMobileError] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false); // Track loading for Resend OTP
  const [loadingVerify, setLoadingVerify] = useState(false); // Track loading for Verify OTP
  // const [mobile, setMobile] = useState("");
  const [checkedIn, setCheckedIn] = useState(false);

  const [transactionId, setTransactionId] = useState("");
  const [fwdp, setFwdp] = useState("");
  const [codeVerifier, setCodeVerifier] = useState("");

  // Add the missing state variables for mobile and user registration status
  const [mobileNumber, setMobileNumber] = useState(""); // For storing mobile number
  const [userAlreadyRegistered, setUserAlreadyRegistered] = useState(false); // For tracking if the user is registered

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,10}$/.test(value)) {
      setMobileNumber(value);
      setMobileError(false); // Reset error when input is valid
    }
  };

  const sendOtp = async () => {
    console.log("Mobile Number:", mobileNumber); // Debugging Step

    if (!mobileNumber || mobileNumber.length !== 10) {
      setErrorMessage("Please enter valid 10 digit mobile number.");
      return;
    }

    setLoadingOtp(true); // Start resend loading
    if (setLoadingOtp) {
      setOtp(["", "", "", "", "", ""]); // Clear OTP input fields
    }
    setErrorMessage("");

    console.log("Sending OTP to ...", mobileNumber);

    try {
      const response = await axios.post(
        `${BASE_URL}/mobile/get-otp/${mobileNumber}`
        // { withCredentials: true }
      );

      if (response.data.success) {
        setOtpSent(true);

        // Display appropriate message based on mobile number availability

        // Set additional response data
        setTransactionId(response.data.transactionId);
        setFwdp(response.data.fwdp);
        setCodeVerifier(response.data.codeVerifier);
        setMobileNumber(response.data.mobileNumber || mobileNumber); // Handle missing mobile gracefully
        setUserAlreadyRegistered(response.data.isAlreadyRegisterdUser);

        console.log(
          "Mobile captured:",
          response.data.mobileNumber || mobileNumber
        ); // Debugging Step
      } else {
        setErrorMessage(response.data.message || "Failed to send OTP.");
      }
    } catch (error) {
      console.error("Error sending OTP:", error.response || error); // Detailed Error
      setErrorMessage(
        error.response?.data?.message || "An error occurred while sending OTP."
      );
    } finally {
      setLoadingOtp(false);
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

    setLoadingVerify(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const requestBody = {
        mobile: mobileNumber,
        otp: otp.join(""), // Join OTP array into a string
      };

      console.log("Verifying OTP with:", requestBody);

      const response = await axios.post(
        `${BASE_URL}/mobile/verify-otp`, // API URL
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Include cookies
        }
      );

      console.log("OTP Verification Response:", response);

      if (response.status === 200) {
        setSuccessMessage("OTP verified successfully!");
        localStorage.setItem("isLogin", "true");

        Swal.fire({
          title: "OTP Verified!",
          text: "You will now be redirected to your dashboard.",
          icon: "success",
          confirmButtonText: "OK",
        }).then(() => {
          navigate("/ourjourney"); // Redirect after success
        });
      } else {
        setErrorMessage(response.data.message || "Invalid OTP.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred while verifying OTP."
      );
    } finally {
      setLoadingVerify(false);
    }
  };

  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    const value = e.target.value;

    if (/[^0-9]/.test(value)) {
      return; // Only allow digits
    }

    newOtp[index] = value;

    // If the user presses backspace, clear the digit at the current index
    if (value === "") {
      newOtp[index] = "";
    }

    setOtp(newOtp);

    // Automatically move focus to the next field if the OTP field is filled
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && otp[index] === "") {
      // Move focus to the previous field when backspace is pressed on an empty input
      if (index > 0) {
        document.getElementById(`otp-input-${index - 1}`).focus();
      }
    }
  };

  const handleFocus = (index) => {
    // Ensure that the box is not selected after focus
    if (!otp[index]) {
      document.getElementById(`otp-input-${index}`).value = "";
    }
  };

  return (
    <>
      {/* <Header /> */}
      <Box
        sx={{
          mt: { xs: 15, md: 10 },
          minHeight: "100vh",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: 4,
            padding: { xs: 2, sm: 3, md: 4 },
            backgroundColor: "white",
            maxWidth: "900px",
            margin: "auto",
            mb: 5,
            gap: { xs: 2, md: 4 },
            borderRadius: 2, // Rounded corners for better appearance
          }}
        >
          {/* GIF Box */}
          <Box
            component="img"
            src={loginGif}
            alt="Login Illustration"
            sx={{
              mixBlendMode: "darken",
              width: { xs: "80%", sm: "60%", md: "40%" },
              height: "auto",
              borderRadius: 2,
              animation: `${rotateIn} 1s ease-in-out`,
              objectFit: "cover",
            }}
          />

          {/* Form Box */}
          <Box
            sx={{
              padding: { xs: 2, md: 3 },
              borderRadius: 3,
              width: "100%",
              animation: `${fadeIn} 1s ease-in-out`,
            }}
          >
            <Typography
              variant="h5"
              align="center"
              sx={{
                marginBottom: 2,
                fontWeight: "bold",
                color: "#4D4D4E",
              }}
            >
              Login
            </Typography>

            {/* Error & Success Messages */}
            {errorMessage && (
              <Typography
                color="error"
                variant="body2"
                sx={{
                  marginBottom: 2,
                  backgroundColor: "#f44336",
                  color: "#fff",
                  padding: 1,
                  borderRadius: 1,
                  textAlign: "center",
                }}
              >
                {errorMessage}
              </Typography>
            )}
            {successMessage && (
              <Typography
                color="success"
                variant="body2"
                sx={{
                  marginBottom: 2,
                  backgroundColor: "#4caf50",
                  color: "#fff",
                  padding: 1,
                  borderRadius: 1,
                  textAlign: "center",
                }}
              >
                {successMessage}
              </Typography>
            )}

            {/* OTP Section */}
            {!otpSent ? (
              <>
                <TextField
                  label="Mobile Number"
                  variant="outlined"
                  fullWidth
                  value={mobileNumber}
                  onChange={handleMobileChange}
                  error={mobileError}
                  helperText={
                    mobileError ? "Enter a valid 10-digit Mobile number" : ""
                  }
                  sx={{ marginBottom: 2 }}
                />

                <FormControlLabel
                  sx={{ alignItems: "flex-start", marginBottom: 2 }}
                  control={
                    <Checkbox
                      checked={checkedIn}
                      onChange={(e) => setCheckedIn(e.target.checked)}
                      sx={{ color: "rgb(72, 145, 193)", paddingTop: "4px" }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: "#4D4D4E" }}>
                      By checking this box, I give my consent to receive digital
                      communications, including calls, SMS, emails, and WhatsApp
                      messages, on my provided phone number, email address, and
                      app from qualoan. Additionally, I confirm that I have read
                      and agree to your{" "}
                      <a href="/terms-condition" style={{ color: "blue" }}>
                        Terms and Conditions
                      </a>{" "}
                      and{" "}
                      <a href="/privacy-policy" style={{ color: "blue" }}>
                        Privacy Policy
                      </a>
                      .
                    </Typography>
                  }
                />

                <Button
                  variant="contained"
                  fullWidth
                  onClick={sendOtp}
                  sx={{
                    marginBottom: 2,
                    backgroundColor: "rgb(72, 145, 193)",
                    "&:hover": { backgroundColor: "darkorange" },
                    fontWeight: "bold",
                  }}
                  disabled={!checkedIn || loadingOtp} // <-- important
                >
                  {loadingOtp ? <CircularProgress size={24} /> : "Send OTP"}
                </Button>
              </>
            ) : (
              <>
                <Typography
                  variant="h6"
                  sx={{ marginBottom: 2, color: "#4D4D4E" }}
                >
                  Enter OTP sent to your mobile
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1,
                  }}
                >
                  {otp.map((digit, index) => (
                    <TextField
                      key={index}
                      id={`otp-input-${index}`}
                      value={digit}
                      onChange={(e) => handleOtpChange(e, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onFocus={() => handleFocus(index)}
                      variant="outlined"
                      inputProps={{ maxLength: 1 }}
                      sx={{
                        width: "40px",
                        textAlign: "center",
                      }}
                    />
                  ))}
                </Box>
                <Grid container spacing={2} sx={{ marginTop: 2 }}>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={verifyOtp}
                      sx={{
                        backgroundColor: "rgb(72, 145, 193)",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#FF8C00" },
                      }}
                      disabled={loadingOtp || loadingVerify} // Disable if either is loading
                    >
                      {loadingVerify ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Verify OTP"
                      )}
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={sendOtp}
                      sx={{
                        borderColor: "#4D4D4E",
                        color: "#4D4D4E",
                        fontWeight: "bold",
                        "&:hover": { backgroundColor: "#f1f1f1" },
                      }}
                      disabled={loadingVerify || loadingOtp} // Disable if either is loading
                    >
                      {loadingOtp ? (
                        <CircularProgress size={24} color="inherit" />
                      ) : (
                        "Resend OTP"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </Box>
        </Box>

        <BlueBoxCard />
        <SimpleBarChart />
      </Box>
      <EligibilityCriteria />
      <RatesAndFees />
      <AddressAndCredential />
    </>
  );
};

export default LoginForm;
