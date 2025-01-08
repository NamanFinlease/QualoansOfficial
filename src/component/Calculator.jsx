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
} from "@mui/material";
import { keyframes } from "@mui/system";
import loanImage from "../assets/image/Repay Now qua (1).webp";

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

  useEffect(() => {
    calculateTotalAmount();
  }, [loanAmount, loanTenure, interestRate]);

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{ fontWeight: "bold", color: "#444", marginBottom: 4 }}
      >
        Loan Calculator
      </Typography>

      <Box
  sx={{
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    gap: 4,
    alignItems: "stretch",
    padding: 4,
    borderRadius: "20px",
    background: "#4D4D4E",
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
  }}
>
  {/* Left Box - Image and Information */}
  <Box
  component={Paper}
  elevation={4}
  sx={{
    flex: 1,
    padding: 3, // Reduced padding
    borderRadius: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#ffffff",
    boxShadow: "0px 10px 20px rgba(255, 255, 255, 0.7)", // White shadow
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
      marginBottom: "12px", // Reduced margin
    }}
  />
  <Typography
    sx={{ fontWeight: "bold", fontSize: "1.2rem", color: "#333", marginBottom: 2 }}
  >
    Get quick loans with transparent processes.
  </Typography>

  {/* Interest Rate Display */}
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      padding: 2,
      background: "#f0f0f0",
      borderRadius: "10px",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
      marginBottom: 2,
      minWidth: "150px",
    }}
  >
    <Typography sx={{ fontWeight: "bold", fontSize: "1rem", color: "#333" }}>
      Interest Rate: {interestRate.toFixed(1)}%
    </Typography>
  </Box>

  {/* Processing Fee Display */}
  <Box
    sx={{
      padding: 1,
      background: "#ff5722",
      borderRadius: "20px",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "0.9rem",
      textAlign: "center",
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.2)",
    }}
  >
    Processing Fee: 10%
  </Box>

  <Typography sx={{ marginTop: 2, color: "#555", textAlign: "center" }}>
    Experience fast approvals and easy repayments with flexible terms.
  </Typography>
</Box>

  {/* Right Box - Loan Calculator */}
  <Box
    component={Paper}
    elevation={4}
    sx={{
      flex: 1,
      padding: 3, // Reduced padding
      borderRadius: "20px",
      background: "#f8f9fa",
      boxShadow: "0px 10px 20px rgba(255, 255, 255, 0.7)", // White shadow
      minHeight: "300px", // Set a lower minimum height
    }}
  >
    {/* Purpose of Loan */}
    <FormControl fullWidth sx={{ marginBottom: 2 }}>
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
      Customize Your Loan
    </Typography>

    {/* Loan Amount Section */}
    <Box sx={{ marginBottom: 3 }}>
      <Typography variant="subtitle1" gutterBottom>
        Loan Amount (₹)
      </Typography>
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
        sx={threeDEffect}
      />
    </Box>

    {/* Loan Tenure Section */}
    <Box sx={{ marginBottom: 3 }}>
      <Typography variant="subtitle1" gutterBottom>
        Loan Tenure (Days)
      </Typography>
      <Slider
        value={loanTenure}
        min={1}
        max={90}
        onChange={(e, newValue) => setLoanTenure(newValue)}
        valueLabelDisplay="auto"
        marks={[
          { value: 1, label: "1 Day" },
          { value: 90, label: "90 Days" },
        ]}
        sx={threeDEffect}
      />
    </Box>

    {/* Interest Rate Section */}
    <Box sx={{ marginBottom: 3 }}>
      <Typography variant="subtitle1" gutterBottom>
        Interest Rate (%)
      </Typography>
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
        sx={threeDEffect}
      />
    </Box>

    <Grid container spacing={3} sx={{ marginTop: 2 }}>
      <Grid item xs={12} sm={6}>
        <Paper
          elevation={2}
          sx={{
            padding: 2,
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <Typography>Total Loan</Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            ₹{totalAmount.toFixed(2)}
          </Typography>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6}>
        <Paper
          elevation={2}
          sx={{
            padding: 2,
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <Typography>Daily Payment</Typography>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            ₹{dailyPayment}
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  </Box>
</Box>

    </Container>
  );
};

export default LoanCalculator;
