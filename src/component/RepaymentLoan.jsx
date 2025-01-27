import React, { useState } from "react";
import { Link } from "react-router-dom";
import WarningIcon from "@mui/icons-material/Warning"; // Import Warning icon
import HDFC from "../assets/image/download (1) (1).png";
import repayaImage from "../assets/image/Qua-Repayment.jpg";
import {
  Grid,
  Box,
  Typography,
  Button,
  Divider,
  TextField,
} from "@mui/material";
import Header from "../navbar/Header";
import Swal from "sweetalert2";

const RepaymentLoan = () => {
  const [pan, setPan] = useState("");
  const [isPanValid, setIsPanValid] = useState(false);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [loanNo, setLoanNo] = useState("");
  const [repaymentAmount, setRepaymentAmount] = useState("");
  const [isPaymentStep, setIsPaymentStep] = useState(false);

  const handlePanChange = (e) => {
    const value = e.target.value.trim();
    setPan(value);

    // PAN validation (simplified for the demo)
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // Example format
    if (panRegex.test(value)) {
      setIsPanValid(true);
      setIsSubmitEnabled(true);
    } else {
      setIsPanValid(false);
      setIsSubmitEnabled(false);
    }
  };

  const handleSubmit = async () => {
    if (isPanValid) {
      // Make your API call for PAN submission
      Swal.fire("PAN Verified", "Proceed to loan details", "success");
      setIsPaymentStep(true); // Show the next step
    } else {
      Swal.fire("Invalid PAN", "Please enter a valid PAN number.", "error");
    }
  };

  const handlePaymentSubmit = () => {
    // Make API call for payment details
    Swal.fire("Payment Successful", "Loan details submitted!", "success");
  };

  return (
    <>
      {/* <Header/> */}

      <Box
        sx={{
          background: "#f9f9f9",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          padding: { xs: "20px", sm: "45px" }, // Adjust padding for small screens
        }}
      >
        {/* Image Section */}

        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: { xs: "20vh", md: "60vh" },
            overflow: "hidden",
            borderRadius: "20px",
            mb: 5,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            component="img"
            src={repayaImage}
            alt="Repay Loan"
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </Box>
        {/* Marquee Section */}
        <Box
          sx={{
            overflow: "hidden",
            whiteSpace: "nowrap",
            width: "100%",
            backgroundColor: "#f9f9f9",
            border: "none !important",
            py: 1,
          }}
        >
          <Typography
            variant="body1"
            sx={{
              display: "inline-block",
              animation: "scroll-text 20s linear infinite",
              fontSize: { xs: "14px", sm: "18px" },
              color: "#B22222",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            "Beware of fraud! Always use our secure Repayment Website Link for
            loan payments. Qua Loan is not responsible for payments made to
            other accounts."
          </Typography>

          {/* Keyframe animation using Material-UI */}
          <style>
            {`
            @keyframes scroll-text {
              from {
                transform: translateX(100%);
              }
              to {
                transform: translateX(-100%);
              }
            }
          `}
          </style>
        </Box>

        {/* Warning Message */}
        <Box
          sx={{
            textAlign: "center",
            borderRadius: "30px",
            padding: "16px",
            maxWidth: "80vw",
            margin: "0 auto",
            mt: 6,
          }}
        >
          <Typography
            variant="h5"
            color="black"
            sx={{
              fontFamily: "Inter",
              fontSize: { xs: "22px", sm: "30px" }, // Adjust font size for small screens
              lineHeight: "50px",
              letterSpacing: "-0.408px",
              mb: 2,
            }}
          >
            <strong style={{ fontSize: "30px", color: "#fc8403" }}>
              Warning:
            </strong>{" "}
            We are not liable for any payments made in <br />
            personal accounts of employees. Please make all <br />
            payments in the company’s account only.
          </Typography>
        </Box>
        <Box
          sx={{
            width: "100%",
            maxWidth: "500px",
            margin: "auto",
            padding: 3,
            boxShadow: 2,
            borderRadius: 2,
            backgroundColor: "#fff",
          }}
        >



          {/* PAN Input Box */}
          <TextField
            label="Enter Your name"
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
            helperText={isPanValid ? "PAN is valid" : "Invalid PAN format"}
            error={!isPanValid && pan.length > 0}
          />
                    <Typography variant="h5" sx={{ marginBottom: 2, color: "#333" }}>
            Enter Your PAN
          </Typography>

          {/* PAN Input Box */}
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
            helperText={isPanValid ? "PAN is valid" : "Invalid PAN format"}
            error={!isPanValid && pan.length > 0}
          />
          <Typography variant="h5" sx={{ marginBottom: 2, color: "#333" }}>
            Enter Your PAN
          </Typography>

          {/* PAN Input Box */}
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
            helperText={isPanValid ? "PAN is valid" : "Invalid PAN format"}
            error={!isPanValid && pan.length > 0}
          />

          {/* Submit Button */}
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
            Submit
          </Button>

          {/* Second Step: Loan Details Form */}
          {/* Second Step: Loan Details Form */}
          {isPaymentStep && (
            <Box sx={{ marginTop: 3 }}>
              <Typography variant="h6" sx={{ marginBottom: 2, color: "#333" }}>
                Enter Loan Details
              </Typography>

              {/* Loan Number Input (only numbers) */}
              <TextField
                label="Loan Number"
                variant="outlined"
                value={loanNo}
                onChange={(e) => handleNumericInputChange(e, setLoanNo)}
                fullWidth
                sx={{
                  marginBottom: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#F26722",
                    },
                    "&:hover fieldset": {
                      borderColor: "#F26722",
                    },
                  },
                }}
              />

              {/* Repayment Amount Input (only numbers) */}
              <TextField
                label="Repayment Amount"
                variant="outlined"
                value={repaymentAmount}
                onChange={(e) =>
                  handleNumericInputChange(e, setRepaymentAmount)
                }
                fullWidth
                sx={{
                  marginBottom: 2,
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "#F26722",
                    },
                    "&:hover fieldset": {
                      borderColor: "#F26722",
                    },
                  },
                }}
              />
              {/* Payment Button */}
              <Button
                onClick={handlePaymentSubmit}
                disabled={!loanNo || !repaymentAmount}
                sx={{
                  backgroundColor:
                    loanNo && repaymentAmount ? "#F26722" : "#D3D3D3",
                  color: "white",
                  width: "100%",
                  padding: "12px",
                  borderRadius: 1,
                  "&:hover": {
                    backgroundColor:
                      loanNo && repaymentAmount ? "#FF7F32" : "#D3D3D3",
                  },
                }}
              >
                Payment
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default RepaymentLoan;
