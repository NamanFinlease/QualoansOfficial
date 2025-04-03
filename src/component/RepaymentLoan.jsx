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
import QuaLoanQR from "./QuaLoanQR.jsx";
import repay from "../assets/image/Qua-Repayment.jpg"; // Correct image path for about us

const RepaymentLoan = () => {
  const navigate = useNavigate();
  // const [pan, setPan] = useState("");
  // const [isPanValid, setIsPanValid] = useState(false);
  // const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loanNo, setLoanNo] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [name, setName] = useState("");
  const [loanAmount, setLoanAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  // const handlePanChange = (e) => {
  //   const value = e.target.value.toUpperCase();
  //   setPan(value);
  //   const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // PAN format
  //   setIsPanValid(panRegex.test(value));
  //   setIsSubmitEnabled(panRegex.test(value));
  // };

  // const handleSubmit = async () => {
  //   setLoading(true);
  //   try {
  //     // Fetch user details by PAN
  //     const response = await fetch(
  //       `https://staging.qualoan.com/api/repayment/getLoanNumber/${pan}`
  //     );

  //     if (response.status === 200) {
  //       const data = await response.json();

  //       // Concatenate fName, mName, and lName to form the full name
  //       const fullName = `${data.fName || ""} ${data.mName || ""} ${
  //         data.lName || ""
  //       }`.trim();

  //       // Update state with fetched data
  //       setName(fullName);
  //       setMobileNo(data.mobile);
  //       setLoanNo(data.loanNo);
  //       setEmail(data.personalEmail);
  //       setIsSubmitted(true);
  //     } else {
  //       Swal.fire({
  //         icon: "error",
  //         title: "Invalid PAN",
  //         text: "Please enter your valid PAN number",
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error fetching loan details:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
      {/* <MarqueeAlert /> */}

      <Box>
        {/* Banner Section */}
        <Box
          sx={{
            marginTop: { xs: "25%", md: "5%" },
            // background: '#f9f9f9',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            // minHeight: "100vh",
            padding: { xs: "20px", sm: "45px" }, // Adjust padding for small screens
          }}
        >
          <Box
            sx={{
              position: "relative",
              width: "100%",
              height: { xs: "20vh", md: "65vh" },
              overflow: "hidden",
              borderRadius: "20px",
              // mb: 5,
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              component="img"
              src={repay}
              alt="Repay Loan"
              sx={{
                position: "absolute",
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>
        </Box>

        {/* Main Content Section */}
        <Box>
          <WarningMessage />
          {!isSubmitted && (
            <>
              <Box sx={{ width: "100%", backgroundColor: "#fff" }}>
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
                  <Box
                    sx={{
                      backgroundColor: "#f5f5f5",
                      border: "2px solid #ccc",
                      padding: 3,
                      borderRadius: 2,
                      boxShadow: 2,
                      display: "flex",
                      flexDirection: { xs: "column", md: "row" },
                      gap: 2,
                      justifyContent: "space-between",
                      width: "auto",
                    }}
                  >
                    <HDFC_QR />
                    <BankDetails />
                  </Box>

                  <div
                    style={{
                      backgroundColor: "#f5f5f5",
                      border: "3px solid #ccc",
                      padding: 25,
                      borderRadius: 4,
                      boxShadow: 2,
                      display: "flex",
                      flexDirection: "row",
                      gap: 2,
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "auto",
                    }}
                  >
                    <QuaLoanQR />
                  </div>
                </Grid>
              </Box>
              <div>
                <PaymentProof />
              </div>
            </>
          )}
        </Box>
      </Box>
    </>
  );
};

export default RepaymentLoan;
