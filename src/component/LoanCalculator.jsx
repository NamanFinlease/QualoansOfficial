import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Slider,
  Button,
  Link,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import { useInView } from "react-intersection-observer";
import { keyframes } from "@mui/system";
import Header from "../navbar/Header";

// Define keyframes for the animations
const slideInLeft = keyframes`
    from {
        transform: translateX(-100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`;

const slideInRight = keyframes`
    from {
        transform: translateX(100%);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
`;

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanTenure, setLoanTenure] = useState(1);
  const [interestRate, setInterestRate] = useState(0.5);
  const [totalAmount, setTotalAmount] = useState(51000);
  const [dailyPayment, setDailyPayment] = useState(0);
  const [showDialog, setShowDialog] = useState(false); // State for dialog visibility

  const handleLoanAmountChange = (event, newValue) => {
    setLoanAmount(newValue);
  };

  const handleLoanTenureChange = (event, newValue) => {
    setLoanTenure(newValue);
  };

  const handleInterestRateChange = (event, newValue) => {
    setInterestRate(newValue);
  };

  const calculateTotalAmount = () => {
    const totalInterest = (loanAmount * interestRate * loanTenure) / 100;
    const total = loanAmount + totalInterest;
    setTotalAmount(total);
    setDailyPayment((total / loanTenure).toFixed(2)); // Calculate daily payment
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [loanAmount, loanTenure, interestRate]);

  const { ref: calculatorRef, inView: calculatorInView } = useInView({
    triggerOnce: false,
  });
  const { ref: detailsRef, inView: detailsInView } = useInView({
    triggerOnce: false,
  });

  // Function to handle showing the calculated amount in a dialog
  const handleShowCalculatedAmount = () => {
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
  };

  return (
    <>
      {/* <Header/> */}
      <Box
        sx={{
          borderRadius: { xs: "40px", md: "0" }, // No border radius on small screens, 40px on larger screens

          paddingY: 4, // Adds vertical padding
          // backgroundColor: "#f9f9f9", // Dark overlay for readability
        }}
      >
        <Box
          sx={{
            marginTop: 0,
            paddingBottom: 10,
            backgroundColor: "rgb(47, 47, 47)", // Dark overlay for readability
            // Dark overlay for readability
            marginBottom: 10,
            border: "2px solid gray",
            borderRadius: "50px",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          <Container style={{ marginTop: 50 }}>
            <Typography
              align="center"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "white",
                fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" }, // Adjust font size based on screen size
              }}
            >
              Personal Loan Calculator
            </Typography>
            <Typography
              align="center"
              gutterBottom
              sx={{
                color: "white",
                fontFamily: "italic",
                fontSize: { xs: "16px", sm: "22px" },
              }}
            >
              Calculate your loan effortlessly with our user-friendly platform.
              Adjust amounts, tenure, and interest rates to see the total cost
              and make informed financial decisions.{" "}
            </Typography>

            <Grid
              container
              spacing={4}
              id="calculator-grid-container"
              justifyContent="center"
            >
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={4}
                  sx={{
                    mt: 4,
                    padding: 3,
                    borderRadius: 10,
                    textAlign: "center",
                    background: "white", // Transparent background to see blur effect
                    color: "black",
                    minHeight: "400px",
                    animation: calculatorInView
                      ? `${slideInLeft} 0.5s ease`
                      : "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  ref={calculatorRef}
                >
                  <Typography
                    variant="h6"
                    sx={{ marginBottom: 1, textAlign: "left" }}
                  >
                    Loan Amount (₹)
                  </Typography>
                  <TextField
                    type="text" // Set to "text" to prevent the browser's number input behavior
                    value={loanAmount || ""} // Ensure loanAmount is a valid number or empty string
                    onChange={(e) => {
                      const value = e.target.value;

                      // Allow the input to be empty
                      if (value === "") {
                        setLoanAmount(""); // Allow the input to be cleared
                      } else if (/^\d+$/.test(value)) {
                        // Check if the input contains only digits (no decimals)
                        const numericValue = Number(value); // Convert the value to a number

                        // Ensure the value is within the range (5000 to 100000)
                        if (numericValue > 100000) {
                          setLoanAmount(100000); // Set to minimum if below range
                        } else {
                          setLoanAmount(numericValue); // Set value if within range
                        }
                      }
                    }}
                    variant="outlined"
                    fullWidth
                    sx={{
                      marginBottom: 2,
                      background: "transparent",
                      borderRadius: "16px",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0, 0, 0, 0.23)", // Default border color
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#1976d2", // Border color on hover
                      },
                      // Remove spinner arrows
                      '& input[type="text"]': {
                        MozAppearance: "textfield", // For Firefox
                      },
                      '& input[type="text"]::-webkit-outer-spin-button, & input[type="text"]::-webkit-inner-spin-button':
                        {
                          WebkitAppearance: "none", // For Chrome, Safari, Edge
                          margin: 0,
                        },
                    }}
                  />

                  <Slider
                    value={loanAmount}
                    min={5000}
                    max={100000}
                    onChange={handleLoanAmountChange}
                    valueLabelDisplay="auto"
                    marks={[
                      { value: 5000, label: "5K" },
                      { value: 100000, label: "100K" },
                    ]}
                    sx={{
                      color: "black",
                      height: 8,
                      marginBottom: 2,
                      '& .MuiSlider-markLabel[data-index="0"]': {
                        transform: "translateX(5%)", // Shift min label to the right
                      },
                      '& .MuiSlider-markLabel[data-index="1"]': {
                        transform: "translateX(-90%)", // Shift max label to the left
                      },
                    }}
                  />

                  <Typography
                    variant="h6"
                    sx={{ marginBottom: 1, textAlign: "left" }}
                  >
                    Loan Tenure (Days)
                  </Typography>
                  <TextField
                    type="text" // Change to "text" to allow full flexibility and prevent number input behavior (like spinners)
                    value={loanTenure || ""} // Ensure loanTenure is a valid number or empty string
                    onChange={(e) => {
                      const value = e.target.value;

                      // Allow the input to be cleared
                      if (value === "") {
                        setLoanTenure(""); // Allow the input to be cleared
                      } else if (/^\d+$/.test(value)) {
                        // Check if the input contains only digits
                        const numericValue = Number(value); // Convert the value to a number

                        // Ensure the value is within the range (1 to 90)
                        if (numericValue < 1) {
                          setLoanTenure(1); // Set to minimum (1) if below range
                        } else if (numericValue > 90) {
                          setLoanTenure(90); // Set to maximum (90) if above range
                        } else {
                          setLoanTenure(numericValue); // Set value if within range
                        }
                      }
                    }}
                    variant="outlined"
                    fullWidth
                    sx={{
                      marginBottom: 2, // margin at the bottom
                      background: "transparent",
                      borderRadius: "16px", // Rounded border
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px", // Ensure the border radius applies to the input field
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0, 0, 0, 0.23)", // Default border color
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#1976d2", // Border color on hover
                      },
                      // Remove spinner arrows
                      '& input[type="text"]': {
                        MozAppearance: "textfield", // For Firefox
                      },
                      '& input[type="text"]::-webkit-outer-spin-button, & input[type="text"]::-webkit-inner-spin-button':
                        {
                          WebkitAppearance: "none", // For Chrome, Safari, Edge
                          margin: 0,
                        },
                    }}
                  />

                  <Slider
                    value={loanTenure}
                    min={1}
                    max={90}
                    onChange={handleLoanTenureChange}
                    valueLabelDisplay="auto"
                    marks={[
                      { value: 1, label: "1" },
                      { value: 90, label: "90" },
                    ]}
                    sx={{
                      color: "black",
                      height: 8,
                      marginBottom: 2,
                      '& .MuiSlider-markLabel[data-index="0"]': {
                        transform: "translateX(5%)", // Shift min label to the right
                      },
                      '& .MuiSlider-markLabel[data-index="1"]': {
                        transform: "translateX(-90%)", // Shift max label to the left
                      },
                    }}
                  />

                  <Typography
                    variant="h6"
                    sx={{ marginBottom: 1, textAlign: "left" }}
                  >
                    Interest Rate (%)
                  </Typography>
                  <TextField
                    type="text" // Use 'text' for fine-grained control
                    value={interestRate || ""} // Allow the value to be empty
                    onChange={(e) => {
                      let value = e.target.value;

                      // Allow clearing the input
                      if (value === "") {
                        setInterestRate(""); // Clear the state
                      } else if (/^\d*\.?\d*$/.test(value)) {
                        // Allow only valid numeric input
                        const numericValue = parseFloat(value);

                        // If the value is greater than 2.75, set it to 2.75
                        if (numericValue > 2.75) {
                          setInterestRate(2.75); // Set to maximum value
                        } else {
                          setInterestRate(value); // Temporarily set the value to allow typing
                        }
                      }
                    }}
                    onBlur={() => {
                      // Final validation on blur
                      const numericValue = parseFloat(interestRate);

                      // Apply range restrictions after typing is done
                      if (interestRate === "" || numericValue < 0.5) {
                        setInterestRate(0.5); // Set to minimum if below range or empty
                      } else if (numericValue > 2.75) {
                        setInterestRate(2.75); // Set to maximum if above range
                      } else {
                        setInterestRate(numericValue); // Ensure the value is within the valid range
                      }
                    }}
                    variant="outlined"
                    fullWidth
                    sx={{
                      marginBottom: 1, // Margin at the bottom
                      background: "transparent",
                      borderRadius: "16px", // Rounded border
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "16px", // Ensure the border radius applies to the input field
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(0, 0, 0, 0.23)", // Default border color
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#1976d2", // Border color on hover
                      },
                      // Remove spinner arrows
                      "& input[type=text]": {
                        MozAppearance: "textfield", // For Firefox
                      },
                      "& input[type=text]::-webkit-outer-spin-button, & input[type=text]::-webkit-inner-spin-button":
                        {
                          WebkitAppearance: "none", // For Chrome, Safari, Edge
                          margin: 0,
                        },
                    }}
                  />

                  <Slider
                    value={interestRate}
                    min={0.5}
                    max={2.75}
                    step={0.1}
                    onChange={handleInterestRateChange}
                    valueLabelDisplay="auto"
                    marks={[
                      { value: 0.5, label: "0.5%" },
                      { value: 2.75, label: "2.75%" },
                    ]}
                    sx={{
                      color: "black",
                      height: 8,
                      marginBottom: 2,
                      '& .MuiSlider-markLabel[data-index="0"]': {
                        transform: "translateX(5%)", // Shift min label to the right
                      },
                      '& .MuiSlider-markLabel[data-index="1"]': {
                        transform: "translateX(-90%)", // Shift max label to the left
                      },
                    }}
                  />
                  <Button
                    // component={Link}
                    // href="/apply-now"
                    variant="contained"
                    sx={{
                      marginTop: 2,
                      backgroundColor: "rgb(47, 47, 47)",
                      fontWeight: "700",
                      borderRadius: "16px",
                      padding: 2,
                      "&:hover": {
                        background: "orange",
                        color: "white",
                      },
                    }}
                  >
                    <Typography>₹{totalAmount}</Typography>
                  </Button>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  elevation={6}
                  sx={{
                    mt: 4,
                    padding: 3,
                    borderRadius: "30px",
                    textAlign: "center",
                    background: "white",
                    color: "black",
                    minHeight: "400px",
                    animation: detailsInView
                      ? `${slideInRight} 0.5s ease`
                      : "none",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative", // Enables absolute positioning within the Paper
                  }}
                  ref={detailsRef}
                >
                  <Typography
                    variant="h4"
                    gutterBottom
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      fontSize: { xs: "1.8rem", sm: "2.5rem", md: "3rem" },
                    }}
                  >
                    Clarity in Lending
                  </Typography>
                  <Typography variant="h6">
                    Detailed information to help you understand your financial
                    commitment.
                  </Typography>
                  <Typography
                    style={{
                      marginTop: "50px",
                      fontSize: "25px",
                      font: "bold",
                    }}
                  >
                    You have to pay
                  </Typography>

                  <Typography style={{ fontSize: "25px", font: "bold" }}>
                    ₹{totalAmount}
                  </Typography>

                  <TableContainer>
                    <Table>
                      <TableBody>
                        <TableRow
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "40px",
                            padding: "16px 0",
                          }}
                        >
                          <TableCell
                            align="center"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              borderBottom: "none",
                              fontFamily: "Inter, sans-serif",
                              fontWeight: 500,
                            }}
                          >
                            <Typography variant="subtitle1">
                              Interest Rate:
                            </Typography>
                            <Typography variant="h6">
                              {interestRate}%
                            </Typography>
                          </TableCell>

                          <div
                            style={{
                              borderLeft: "2px solid black",
                              height: "50px",
                              margin: "0 16px",
                            }}
                          ></div>

                          <TableCell
                            align="center"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              borderBottom: "none",
                            }}
                          >
                            <Typography variant="subtitle1">
                              Loan Tenure:
                            </Typography>
                            <Typography variant="h6">
                              {loanTenure} days
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>

                  {/* T&C Apply positioned above Apply Now button */}
                  <Tooltip
                    title="Terms and Conditions apply. Please read carefully."
                    arrow
                  >
                    <Typography
                      component={Link}
                      href="/terms-condition"
                      variant="contained"
                      sx={{
                        position: "absolute",
                        bottom: "80px", // Position it just above the Apply Now button
                        right: "26px", // Align it to the right
                        fontSize: "12px",
                        padding: "4px 8px",
                        background: "rgba(0, 0, 0, 0.1)",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      * T & C Apply
                    </Typography>
                  </Tooltip>

                  <Button
                    component={Link}
                    href="/login-form"
                    variant="contained"
                    sx={{
                      marginTop: 16,
                      backgroundColor: "black",
                      fontWeight: "700",
                      borderRadius: "16px",
                      padding: 2,
                      textDecoration: "none",
                      "&:hover": {
                        background: "orange",
                        color: "white",
                      },
                    }}
                  >
                    Apply Now
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default LoanCalculator;
