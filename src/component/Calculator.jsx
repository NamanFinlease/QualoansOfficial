import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
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
  Button,
} from "@mui/material";
import loanImage from "../assets/image/Untitled design.gif";
import axios from "axios";
import { BASE_URL } from "../baseURL";
import Dashboard from "./Dashboard";

const LoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanTenure, setLoanTenure] = useState(1);
  const [interestRate, setInterestRate] = useState(0.5);
  const [totalAmount, setTotalAmount] = useState(0);
  const [purpose, setPurpose] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for API call
  const [responseMessage, setResponseMessage] = useState(""); // To store API response message
  const [isModalOpen, setIsModalOpen] = useState(true); // Modal visibility state
  const token = getToken();

  const calculateTotalAmount = () => {
    const totalInterest = (loanAmount * interestRate * loanTenure) / 100;
    const total = loanAmount + totalInterest;
    setTotalAmount(total);
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [loanAmount, loanTenure, interestRate]);

  const handleSubmit = async () => {
    if (!purpose) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please select a loan purpose!",
      });
      return;
    }

    const payload = {
      principal: loanAmount,
      totalPayble: totalAmount.toFixed(2),
      intrestPerMonth: interestRate,
      tenureMonth: loanTenure,
      loanPurpose: purpose.toUpperCase(),
    };

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${BASE_URL}/api/loanApplication/applyLoan`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      setResponseMessage(response.data.message);
      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
      }).then(() => {
        setIsModalOpen(false); // Close modal on success
      });
    } catch (error) {
      console.error("Error applying for loan:", error);
      Swal.fire({
        icon: "error",
        title: "Application Failed",
        text: "Failed to apply for loan. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const cancelLoanApplication = () => {
    Swal.fire({
      icon: "info",
      title: "Process Cancelled",
      text: "Your loan application process has been cancelled.",
    }).then(() => {
      setIsModalOpen(false); // Close modal when canceled
    });
  };

  if (!isModalOpen) {
    return null; // Don't render anything if modal is closed
  }

  return (
    <>
      <Dashboard />
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ fontWeight: "bold", color: "#444", marginBottom: 1 }}
        >
          Loan Calculator
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 1,
            alignItems: "stretch",
            padding: 1,
            borderRadius: "5px",
            background: "#4D4D4E",
            boxShadow: "0px 2px 2px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box
            component={Paper}
            elevation={4}
            sx={{
              flex: 1,
              padding: 3,
              borderRadius: "4px",
              background: "#ffffff",
              boxShadow: "0px 0px 0px rgba(255, 255, 255, 0.7)",
            }}
          >
            <img
              src={loanImage}
              alt="Loan"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "15px",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
                marginBottom: "12px",
              }}
            />
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: "1.2rem",
                color: "#333",
                marginBottom: 2,
              }}
            >
              Get quick loans with transparent processes.
            </Typography>

            <Box
              sx={{
                padding: 1,
                background: "#ff5722",
                borderRadius: "3px",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "0.9rem",
                textAlign: "center",
                boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.2)",
              }}
            >
              Processing Fee: 10%
            </Box>

            <Typography
              sx={{ marginTop: 2, color: "#555", textAlign: "center" }}
            >
              Experience fast approvals and easy repayments with flexible terms.
            </Typography>
          </Box>

          <Box
            component={Paper}
            elevation={4}
            sx={{
              flex: 1,
              padding: 3,
              borderRadius: "4px",
              background: "#f8f9fa",
              minHeight: "300px",
            }}
          >
            <FormControl required fullWidth sx={{ marginBottom: 3 }}>
              <InputLabel>Purpose of Loan</InputLabel>
              <Select
                value={purpose}
                label="Purpose of Loan"
                onChange={(e) => setPurpose(e.target.value)}
              >
                <MenuItem value="TRAVEL">TRAVEL</MenuItem>
                <MenuItem value="MEDICAL">MEDICAL</MenuItem>
                <MenuItem value="ACADEMICS">ACADEMICS</MenuItem>
                <MenuItem value="OBLIGATIONS">OBLIGATIONS</MenuItem>
                <MenuItem value="FESTIVAL">FESTIVAL</MenuItem>
                <MenuItem value="PURCHASE">PURCHASE</MenuItem>
                <MenuItem value="OTHERS">OTHERS</MenuItem>
              </Select>
            </FormControl>

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
                sx={{ color: "#fc8403" }}
              />
            </Box>

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
                sx={{ color: "#fc8403" }}
              />
            </Box>

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
                sx={{ color: "#fc8403" }}
              />
            </Box>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "2rem",
              }}
            >
              <Grid item xs={12} sm={6}>
                <Paper
                  elevation={2}
                  sx={{
                    padding: 2,
                    borderRadius: "10px",
                    textAlign: "center",
                    backgroundColor: "#fcf8e3",
                  }}
                >
                  <Typography>Total Loan</Typography>
                  <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                    ₹{totalAmount.toFixed(2)}
                  </Typography>
                </Paper>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "80px",
                    backgroundColor: "#fc8403",
                    color: "white",
                    fontWeight: "bold",
                    fontSize: { xs: "14px", sm: "16px" },
                    padding: { xs: "8px 16px", sm: "6px 30px" },
                    "&:hover": {
                      backgroundColor: "black",
                    },
                  }}
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Submit"}
                </Button>

                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "80px",
                    color: "#fc8403",
                    fontWeight: "bold",
                    fontSize: { xs: "14px", sm: "16px" },
                    padding: { xs: "8px 16px", sm: "6px 30px" },
                    marginTop: 2,
                    "&:hover": {
                      backgroundColor: "#fc8403",
                      color: "white",
                    },
                  }}
                  onClick={cancelLoanApplication}
                >
                  Cancel
                </Button>
              </Grid>
            </div>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default LoanCalculator;
