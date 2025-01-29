import React, { useState } from "react";

import repayaImage from "../assets/image/Qua-Repayment.jpg";

import {
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import Swal from "sweetalert2";

const RepaymentLoan = () => {
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
    const value = e.target.value;
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

      const data = await response.json();

      // Concatenate fName, mName, and lName to form the full name
      const fullName = `${data.fName || ""} ${data.mName || ""} ${
        data.lName || ""
      }`.trim();

      // Update state with fetched data
      setName(fullName || "John Doe");
      setMobileNo(data.mobile || "1234567890");
      setLoanNo(data.loanNo || "Not Found");
      setEmail(data.personalEmail || "Not Found");
      setIsSubmitted(true); // Enable the next step (payment)
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
      amount: parseFloat(loanAmount), // Amount should be a number
      fName: name.split(" ")[0], // Extract first name from full name
      mName: name.split(" ")[1] || "", // Extract middle name if available
      lName: name.split(" ")[2] || "", // Extract last name if available
      email: email, // User email from state
      phone: mobileNo, // User phone number
      pan: pan, // User PAN
      loanNo: loanNo, // Loan number
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
      console.log("gjhjh>>", response);

      // Check if the response is successful
      if (!response.ok) {
        throw new Error(
          `Payment API call failed with status ${response.status}`
        );
      }

      const data = await response.json();
      if (data.status) {
        const paytring = new Paytring({
          order_id: data.order_id,
          success: (orderId) => {
            alert(`Payment Successful! Order ID: ${orderId}`);
          },
          failed: (orderId) => {
            alert(`Payment Failed! Order ID: ${orderId}`);
          },
          onClose: (orderId) => {
            alert(`Payment Popup Closed! Order ID: ${orderId}`);
          },
          events: (event) => {
            console.log(
              `Event Triggered: ${event.event_name} - ${event.event_value}`
            );
          },
        });

        paytring.open();

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
            background: "#f9f9f9",
            minHeight: "100vh",
            padding: { xs: "20px", sm: "45px" },
          }}
        >
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
            {/* PAN Input */}
            {!isSubmitted && (
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
            )}

            {/* Loan Details */}
            {isSubmitted && (
              <Box>
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
                  label="Loan Amount"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
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
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default RepaymentLoan;
