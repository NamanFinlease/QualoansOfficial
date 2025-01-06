import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Slider,
  Container,
  Grid,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button
} from "@mui/material";
import { keyframes } from "@mui/system";
import loanImage from "../assets/image/Repay Now qua (1).webp"; // Example image import

// Keyframes for 3D hover effects
const popIn = keyframes`
  from {
    transform: scale(0.95);
    box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  }
  to {
    transform: scale(1);
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.2);
  }
`;

// Styling for 3D effect on sliders and inputs
const threeDEffect = {
  "&:hover": {
    animation: `${popIn} 0.3s forwards`,
  },
};

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanTenure, setLoanTenure] = useState(1);
  const [interestRate, setInterestRate] = useState(0.5);
  const [totalAmount, setTotalAmount] = useState(0);
  const [dailyPayment, setDailyPayment] = useState(0);
  const [purpose, setPurpose] = useState("");

  const calculateTotalAmount = () => {
    const totalInterest = (loanAmount * interestRate * loanTenure) / 100;
    const total = loanAmount + totalInterest;
    setTotalAmount(total);
    setDailyPayment((total / loanTenure).toFixed(2));
  };
  const calculateDailyPayment = () => {
    const totalInterest = (loanAmount * interestRate * loanTenure) / 100;
    const total = loanAmount + totalInterest;
    setDailyPayment((total / loanTenure).toFixed(2));
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [loanAmount, loanTenure, interestRate]);

  return (
    <Container maxWidth="lg">
      <Grid container spacing={4}>
        {/* Left Side - Image and Information */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={4}
            sx={{
              padding: 4,
              borderRadius: "20px",
              textAlign: "center",
              background: "#ffffff",
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
            }}
          >
            <img
              src={loanImage}
              alt="Loan"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "15px",
                boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.2)",
                marginBottom: "16px",
              }}
            />
            <Typography
              sx={{ fontWeight: "bold", fontSize: "1.2rem", color: "#333" }}
            >
              Get quick loans with transparent processes.
            </Typography>
            <Typography sx={{ marginTop: 2, color: "#555" }}>
              Experience fast approvals and easy repayments with flexible terms.
            </Typography>
          </Paper>
        </Grid>

        {/* Middle - Loan Purpose and Calculator */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={4}
            sx={{
              padding: 4,
              borderRadius: "20px",
              background: "#f8f9fa",
              boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
              position: "relative", // Positioning for the pseudo-element
            }}
          >
            {/* Purpose of Loan */}
            <FormControl fullWidth sx={{ marginBottom: 3 }}>
              <InputLabel>Purpose of Loan</InputLabel>
              <Select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "15px",
                  },
                  "& .MuiSelect-select": {
                    padding: "10px",
                  },
                }}
              >
                <MenuItem value="Education">Education</MenuItem>
                <MenuItem value="Medical">Medical</MenuItem>
                <MenuItem value="Business">Business</MenuItem>
                <MenuItem value="Personal">Personal</MenuItem>
              </Select>
            </FormControl>

            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{ fontWeight: "bold", color: "#444" }}
            >
              Loan Calculator
            </Typography>

            {/* Loan Amount Section */}
            <Box
              sx={{
                backgroundColor: "#FFA500", // Orange box
                padding: "10px 20px",
                borderRadius: "10px",
                width: "fit-content",
                marginBottom: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                Loan Amount (₹)
              </Typography>
            </Box>
            <Slider
              value={loanAmount}
              min={5000}
              max={100000}
              onChange={(e, newValue) => setLoanAmount(newValue)}
              valueLabelDisplay="auto"
              marks={[
                { value: 5000, label: "5K" },
                { value: 100000, label: "100K" },
              ]}
              sx={{
                marginBottom: 3,
                height: "8px",
                color: "#4D4D4E",
                borderRadius: "5px",
                "& .MuiSlider-thumb": {
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)", // Adding 3D shadow to thumb
                },
                "&:hover": {
                  animation: `${popIn} 0.3s forwards`, // 3D effect on hover
                },
              }}
            />

            {/* Loan Tenure Section */}
            <Box
              sx={{
                backgroundColor: "#FFA500", // Orange box
                padding: "10px 20px",
                borderRadius: "10px",
                width: "fit-content",
                marginBottom: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                Loan Tenure (Days)
              </Typography>
            </Box>
            <Slider
              value={loanTenure}
              min={1}
              max={90}
              onChange={(e, newValue) => setLoanTenure(newValue)}
              valueLabelDisplay="auto"
              marks={[
                { value: 1, label: "1" },
                { value: 90, label: "90" },
              ]}
              sx={{
                marginBottom: 3,
                height: "8px",
                color: "#4D4D4E",
                borderRadius: "5px",
                "& .MuiSlider-thumb": {
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)", // Adding 3D shadow to thumb
                },
                "&:hover": {
                  animation: `${popIn} 0.3s forwards`, // 3D effect on hover
                },
              }}
            />

            {/* Interest Rate Section */}
            <Box
              sx={{
                backgroundColor: "#FFA500", // Orange box
                padding: "10px 20px",
                borderRadius: "10px",
                width: "fit-content",
                marginBottom: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                }}
              >
                Interest Rate (%)
              </Typography>
            </Box>
            <Slider
              value={interestRate}
              min={0.5}
              max={2}
              step={0.1}
              onChange={(e, newValue) => setInterestRate(newValue)}
              valueLabelDisplay="auto"
              marks={[
                { value: 0.5, label: "0.5%" },
                { value: 2, label: "2%" },
              ]}
              sx={{
                marginBottom: 3,
                height: "8px",
                color: "#4D4D4E",
                borderRadius: "5px",
                "& .MuiSlider-thumb": {
                  boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)", // Adding 3D shadow to thumb
                },
                "&:hover": {
                  animation: `${popIn} 0.3s forwards`, // 3D effect on hover
                },
              }}
            />

            {/* Calculation Buttons */}
            <Grid container spacing={3} sx={{ textAlign: "center", marginTop: 3 }}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ textAlign: "center", border: "1px solid #ddd", padding: 2, borderRadius: "8px" }}>
                  <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>Total Loan</Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{
                      padding: "12px 24px",
                      fontSize: "1rem",
                      textTransform: "capitalize",
                      borderRadius: "20px",
                    }}
                    onClick={calculateTotalAmount}
                  >
                    ₹{totalAmount.toFixed(2)}
                  </Button>
                </Box>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Box sx={{ textAlign: "center", border: "1px solid #ddd", padding: 2, borderRadius: "8px" }}>
                  <Typography variant="subtitle2" sx={{ marginBottom: 1 }}>Daily Payment</Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{
                      padding: "12px 24px",
                      fontSize: "1rem",
                      textTransform: "capitalize",
                      borderRadius: "20px",
                    }}
                    onClick={calculateDailyPayment}
                  >
                    ₹{dailyPayment}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoanCalculator;
