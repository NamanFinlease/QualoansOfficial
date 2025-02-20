import React, { useState } from "react";

import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import PaymentProof from "./PaymentProof";
import BankDetails from "./BankDetails";
import HDFC_QR from "./HDFC_QR";
import MarqueeAlert from "./MarqueeAlert.jsx";
import WarningMessage from "./WarningMessage";

const RepaymentLoan = () => {
  const navigate = useNavigate();
  const [pan, setPan] = useState("");
  const [isPanValid, setIsPanValid] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loanNo, setLoanNo] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [name, setName] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handlePanChange = (e) => {
    const value = e.target.value.toUpperCase();
    setPan(value);
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // PAN format
    setIsPanValid(panRegex.test(value));
    setIsSubmitEnabled(panRegex.test(value));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Fetch user details by PAN
      const response = await fetch(
        `https://staging.qualoan.com/api/repayment/getLoanNumber/${pan}`
      );

      if (response.status === 200) {
        const data = await response.json();

        // Concatenate fName, mName, and lName to form the full name
        const fullName = `${data.fName || ""} ${data.mName || ""} ${
          data.lName || ""
        }`.trim();

        // Update state with fetched data
        setName(fullName);
        setMobileNo(data.mobile);
        setLoanNo(data.loanNo);
        setEmail(data.personalEmail);
        setIsSubmitted(true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid PAN",
          text: "Please enter your valid PAN number",
        });
      }
    } catch (error) {
      console.error("Error fetching loan details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentSubmit = async () => {
    // Validate loan amount
    if (!loanAmount || isNaN(loanAmount) || parseFloat(loanAmount) <= 0) {
      Swal.fire("Invalid Amount", "Please enter a valid loan amount.", "error");
      return;
    }

    // Prepare data for payment API
    const paymentData = {
      amount: parseFloat(loanAmount),
      fName: name.split(" ")[0],
      mName: name.split(" ")[1] || "",
      lName: name.split(" ")[2] || "",
      email: email,
      phone: mobileNo,
      pan: pan,
      loanNo: loanNo,
    };

    setLoading(true);
    try {
      // Make API call to the payNow endpoint
      const response = await fetch(
        "https://staging.qualoan.com/api/repayment/payNow",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(paymentData),
        }
      );

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(
          `Payment API call failed with status ${response.status}`
        );
      }

      const data = await response.json();
      if (data.status) {
        window.location.href =
          "https://api.paytring.com/pay/token/" + data.order_id;
        navigate("/verify-repayment");

        console.log("paytring", paytring);
      }
    } catch (error) {
      // Handle error response
      console.error("Error processing payment:", error);
      Swal.fire(
        "Error",
        "Failed to process the payment. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <MarqueeAlert />

      <Box
        sx={{
          background: "#fff",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: { xs: "20px", sm: "45px" },
        }}
      >
        <WarningMessage />
        {!isSubmitted && (
          <>
            <Box spacing={3} alignItems="center" sx={{ width: "100%" }}>
              <Grid
                container
                spacing={2}
                alignItems="center"
                mt={3}
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                }}
              >
                <HDFC_QR />
                <div>
                  <BankDetails />
                  <PaymentProof />
                </div>
              </Grid>
            </Box>

            <style>
              {`
                  @keyframes scroll-text {
                    from { transform: translateX(100%); }
                    to { transform: translateX(-100%); }
                  }
                  @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                  }
                `}
            </style>

            <Box
              sx={{
                width: "100%",
                maxWidth: "500px",
                margin: "auto",
                padding: 3,
                borderRadius: 2,
                backgroundColor: "#f5f5f5",
                marginTop: "2rem",
              }}
            >
              {/* PAN Input */}

              <>
                <Typography
                  variant="h5"
                  sx={{ marginBottom: 2, color: "#333" }}
                >
                  Enter Your PAN
                </Typography>
                <TextField
                  label="Enter Your PAN"
                  variant="outlined"
                  value={pan}
                  onChange={handlePanChange}
                  fullWidth
                  sx={{
                    marginBottom: 2,
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: isPanValid ? "#F26722" : "#ccc",
                      },
                      "&:hover fieldset": {
                        borderColor: "#F26722",
                      },
                    },
                  }}
                  helperText={
                    isPanValid ? "PAN is valid" : "Invalid PAN format"
                  }
                  error={!isPanValid && pan.length > 0}
                />

                <Button
                  onClick={handleSubmit}
                  disabled={!isSubmitEnabled}
                  sx={{
                    backgroundColor: isSubmitEnabled ? "#F26722" : "#D3D3D3",
                    color: "white",
                    width: "100%",
                    padding: "12px",
                    borderRadius: 1,
                    "&:hover": {
                      backgroundColor: isSubmitEnabled ? "#FF7F32" : "#D3D3D3",
                    },
                  }}
                >
                  {loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Submit"
                  )}
                </Button>
              </>
            </Box>
          </>
        )}
        {isSubmitted && (
          <Box
            sx={{
              // background: "#f9f9f9",
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: { xs: 2, md: 4 },
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: "900px",
                margin: "auto",
                padding: { xs: 2, md: 3 },
                borderRadius: 2,
                backgroundColor: "#f5f5f5",
              }}
            >
              {/* Loan Details */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  width: "100%",
                  justifyContent: { xs: "center" },
                  // padding: "20px",
                }}
              >
                {/* Left Section */}
                <Box
                  sx={{
                    width: { xs: "100%", md: "50%" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <HDFC_QR />
                  <BankDetails />
                </Box>

                {/* Right Section */}
                <Box sx={{ width: { xs: "100%", md: "50%" } }}>
                  <Typography
                    variant="h6"
                    sx={{ marginBottom: 2, color: "#333" }}
                  >
                    Loan Details
                  </Typography>

                  <TextField
                    label="Name"
                    value={name}
                    disabled
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />

                  <TextField
                    label="Mobile Number"
                    value={mobileNo}
                    disabled
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Email"
                    value={email}
                    disabled
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />
                  <TextField
                    label="Loan Number"
                    value={loanNo}
                    disabled
                    fullWidth
                    sx={{ marginBottom: 2 }}
                  />

                  <TextField
                    label="Enter your payment amount"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    fullWidth
                    sx={{
                      marginBottom: 2,
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": { borderColor: "#F26722" },
                        "&:hover fieldset": { borderColor: "#F26722" },
                      },
                    }}
                  />

                  <Button
                    onClick={handlePaymentSubmit}
                    sx={{
                      backgroundColor: "#F26722",
                      color: "white",
                      width: "100%",
                      padding: "12px",
                      borderRadius: 1,
                      "&:hover": {
                        backgroundColor: "#FF7F32",
                      },
                    }}
                  >
                    Proceed
                  </Button>

                  <PaymentProof />
                </Box>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default RepaymentLoan;
