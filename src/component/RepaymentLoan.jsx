import React, { useState } from "react";
import WarningIcon from "@mui/icons-material/Warning";
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
import { useNavigate } from "react-router-dom";
import HDFC_QR from "../assets/image/HDFC_QR.jpg";

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
      {/* Marquee Section */}
      <Box
        sx={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          width: "100%",
          padding: "8px 0",
        }}
      >
        <Typography
          component="div"
          sx={{
            display: "inline-block",
            animation: "marquee 20s linear infinite",
            fontWeight: "600",
            color: "#F26722",
            fontSize: "24px",
            fontFamily: "Inter",
          }}
        >
          ⚠️ Beware of fraud! Always use our secure Repayment Website Link for
          payments. Qua Loan is not responsible for payments made to other
          accounts.
        </Typography>

        <style>
          {`
              @keyframes marquee {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
              }
            `}
        </style>
      </Box>
      {/* <Header/> */}

      <Box
        sx={{
          background: "#fff",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          // minHeight: "100vh",  
          padding: { xs: "20px", sm: "45px" },
        }}
      >
        {/* Warning Message */}
        <Box
          sx={{
            background: "#F5F5F5",
            borderRadius: "16px",
            padding: "20px",
            maxWidth: "900px",
            margin: "0 auto",
            mb: 2,
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
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 1,
              }}
            >
              <WarningIcon sx={{ color: "#F26722", fontSize: "32px" }} />
            </Box>
            <Typography
              variant="body2"
              sx={{
                textAlign: "center",
                color: "#1c1c1c",
                fontSize: { xs: "14px", sm: "16px" },
                fontFamily: "Inter",
                //   mb: 2,
              }}
            >
              We are not liable for any payments made in <br />
              personal accounts of employees. Please make all <br />
              payments in the company’s account only.
            </Typography>
          </Typography>
        </Box>
        {!isSubmitted && (
          <Box
            sx={{
              width: "100%",
              maxWidth: "500px",
              margin: "auto",
              padding: 3,
              // boxShadow: 2,
              borderRadius: 2,
              backgroundColor: "#f5f5f5",
            }}
          >
            {/* PAN Input */}

            <>
              <Typography variant="h5" sx={{ marginBottom: 2, color: "#333" }}>
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
                helperText={isPanValid ? "PAN is valid" : "Invalid PAN format"}
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
        )}
        {isSubmitted && (
          <Box
            sx={{
              background: "#f9f9f9",
              minHeight: "100vh",
              // padding: { xs: "20px", sm: "45px" },
              // marginTop: "4rem",
            }}
          >
            <Box
              sx={{
                width: "100%",
                // maxWidth: "500px",
                margin: "auto",
                padding: 3,
                // boxShadow: 2,
                borderRadius: 2,
                backgroundColor: "#f5f5f5",
              }}
            >
              {/* Loan Details */}

              <div
                style={{
                  display: "flex",
                  width: "100%",
                  border: "2px solid red",
                  padding: "20px",
                }}
              >
                <Box sx={{ width: "50%" }}>
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

                  <Box
                      sx={{
                        textAlign: "center",
                        padding: "20px",
                        position: "relative",
                        marginTop: "2rem",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "rgba(255, 142, 83, 0.05)",
                          borderRadius: "12px",
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 500,
                          color: "black",
                          fontSize: { xs: "24px", sm: "28px" },
                          mb: 1,
                          fontFamily: "Inter",
                        }}
                      >
                        Share Your Payment Proof
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: { xs: "18px", sm: "20px" },
                          fontFamily: "Inter",
                          color: "black",
                          mb: 3,
                        }}
                      >
                        Please send your transfer screenshot to:
                      </Typography>

                      <a
                        href="mailto:collection@qualoan.com"
                        style={{
                          color: "#F26722",
                          backgroundColor: "#fff",
                          padding: "14px 34px",
                          borderRadius: "11px",
                          display: "inline-block",
                          fontWeight: "500",
                          fontSize: "20px",
                          cursor: "pointer",
                          textDecoration: "none",
                          fontFamily: "Inter",
                          animation: "pulse 2s infinite",
                        }}
                      >
                        collection@qualoan.com
                      </a>
                    </Box>
                </Box>
                

                <Box
                  container
                  spacing={3}
                  alignItems="center"
                  sx={{ width: "50%" }}
                >
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
                      <Box item>
                        <img
                          src={HDFC_QR}
                          alt="HDFC QR Code"
                          style={{
                            height: "33rem",
                            // maxWidth: "200px",
                            width: "20rem",
                            borderRadius: "12px",
                          }}
                        />
                      </Box>
                      <Box item>
                        <Typography
                          variant="body1"
                          sx={{ color: "black", fontFamily: "Inter" }}
                        >
                          <strong>Bank Name:</strong> HDFC
                          <br />
                          <strong>Name:</strong> Naman Finlease Private Limited
                          <br />
                          <strong>Account Number:</strong> 50200105867815
                          <br />
                          <strong>IFSC Code:</strong> HDFC0001203
                          <br />
                          <strong>UPI ID:</strong> vyapar.173031688235@hdfcbank
                          <br />
                          <strong>Account Type:</strong> Current Account
                        </Typography>
                      </Box>
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
              </div>

              {/* {isSubmitted && (
              <>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={12}>
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
                      <Grid item>
                        <img
                          src={HDFC_QR}
                          alt="HDFC QR Code"
                          style={{
                            height: "33rem",
                            // maxWidth: "200px",
                            width: "20rem",
                            borderRadius: "12px",
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          variant="body1"
                          sx={{ color: "black", fontFamily: "Inter" }}
                        >
                          <strong>Bank Name:</strong> HDFC
                          <br />
                          <strong>Name:</strong> Naman Finlease Private Limited
                          <br />
                          <strong>Account Number:</strong> 50200105867815
                          <br />
                          <strong>IFSC Code:</strong> HDFC0001203
                          <br />
                          <strong>UPI ID:</strong> vyapar.173031688235@hdfcbank
                          <br />
                          <strong>Account Type:</strong> Current Account
                        </Typography>
                      </Grid>
                    </Grid>
                    <Box
                      sx={{
                        textAlign: "center",
                        padding: "20px",
                        position: "relative",
                        marginTop: "2rem",
                        "&::before": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "rgba(255, 142, 83, 0.05)",
                          borderRadius: "12px",
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 500,
                          color: "black",
                          fontSize: { xs: "24px", sm: "28px" },
                          mb: 1,
                          fontFamily: "Inter",
                        }}
                      >
                        Share Your Payment Proof
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          fontSize: { xs: "18px", sm: "20px" },
                          fontFamily: "Inter",
                          color: "black",
                          mb: 3,
                        }}
                      >
                        Please send your transfer screenshot to:
                      </Typography>

                      <a
                        href="mailto:collection@qualoan.com"
                        style={{
                          color: "#F26722",
                          backgroundColor: "#fff",
                          padding: "14px 34px",
                          borderRadius: "11px",
                          display: "inline-block",
                          fontWeight: "500",
                          fontSize: "20px",
                          cursor: "pointer",
                          textDecoration: "none",
                          fontFamily: "Inter",
                          animation: "pulse 2s infinite",
                        }}
                      >
                        collection@qualoan.com
                      </a>
                    </Box>
                  </Grid>
                </Grid>

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
              </>
            )} */}
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default RepaymentLoan;
