import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  Box,
  Grid,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Slider,
  Container,
  Paper,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import loanImage from "../../assets/image/Untitled design.gif";
import axios from "axios";
import { BASE_URL } from "../../baseURL";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const LoanCalculator = ({ onComplete, disabled, prefillData }) => {
  const [loanAmount, setLoanAmount] = useState(5000);
  const [loanTenure, setLoanTenure] = useState(1);
  const [interestRate, setInterestRate] = useState(0.5);
  const [totalAmount, setTotalAmount] = useState(0);
  const [purpose, setPurpose] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false); // Add this state for completion tracking

  const openLoanCalculatorModal = () => {
    if (!disabled) {
      setIsModalOpen(true);
    }
  };

  const closeLoanCalculatorModal = () => {
    setIsModalOpen(false);
  };

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
      const response = await axios.post(`${BASE_URL}/applyLoan`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      console.log("Loan Application Response:", response);
      onComplete({ success: true, data: payload });
      setIsModalOpen(false);

      // Set the box color to green after successful submission
      setIsComplete(true);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.data.message,
        });
      }
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
      setIsModalOpen(false);
    });
  };

  const handleModalClick = async () => {
    openLoanCalculatorModal(true);
    setIsLoading(true);

    try {
      const getDashboardDetailsResponse = await axios.get(
        `${BASE_URL}/getDashboardDetails`,
        {
          withCredentials: true,
        }
      );

      // console.log(
      //   "getDashboardDetailsResponse111111 >>> ",
      //   getDashboardDetailsResponse
      // );

      if (getDashboardDetailsResponse.status === 200) {
        setIsLoading(false);
        console.log(
          "getDashboardDetailsResponse >>> ",
          getDashboardDetailsResponse
        );
        const { isLoanCalculated } = getDashboardDetailsResponse.data || {};

        // console.log("isLoanCalculated>>>>:", isLoanCalculated);

        // Set the value of isAddressVerified based on the fetched response
        setIsComplete(isLoanCalculated);

        if (isLoanCalculated) {
          const getProfileDetailsResponse = await axios.get(
            `${BASE_URL}/getApplicationDetails?applicationStatus=loanDetails`,
            {
              withCredentials: true,
            }
          );

          // console.log(
          //   "getProfileDetailsResponse >>> ",
          //   getProfileDetailsResponse
          // );

          const LoanData = getProfileDetailsResponse?.data?.data;

          // Update formValues with residenceData
          setFormValues({
            principal: LoanData?.principal || "",
            totalPayble: LoanData?.totalPayble || "",
            intrestPerMonth: LoanData?.intrestPerMonth || "",
            tenureMonth: LoanData?.tenureMonth || "",
            loanPurpose: LoanData?.loanPurpose || "",
          });
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <Box
        onClick={handleModalClick}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          // justifyContent: "center",
          padding: 2,
          borderColor:
            // completed ? "green" :
            disabled ? "#1c1c1c" : "#F26722",
          borderRadius: 3,
          margin: 1,
          width: "25%",
          minWidth: 200,
          cursor: disabled ? "not-allowed" : "pointer",
          textAlign: "left",
          background:
            //  completed
            //   ? "linear-gradient(45deg, #28a745, #218838)" // Green gradient when step is complete
            //   :
            disabled ? "#d9d9d9" : "#F26722",
          color:
            //  completed ||
            !disabled ? "white" : "#1c1c1c",
          "@media (max-width: 600px)": {
            width: "80%",
            margin: "auto",
          },
        }}
      >
        <IconButton
          disabled={disabled || isComplete}
          sx={{
            marginBottom: 1,
            color: "white",
            "&:hover": {
              backgroundColor: "white",
            },
          }}
        >
          {isComplete ? (
            <CheckCircleIcon sx={{ color: "white" }} />
          ) : (
            <WorkIcon />
          )}
        </IconButton>
        <Typography
          sx={{ fontWeight: "bold", marginBottom: 1, color: "white" }}
        >
          Open Loan Calculator
        </Typography>
        <Typography variant="body2" sx={{ color: "white" }}>
          Choose the loan amount and tenure
        </Typography>
      </Box>

      {/* Modal for Loan Calculator */}
      <Dialog
        open={isModalOpen}
        onClose={closeLoanCalculatorModal}
        fullWidth
        maxWidth="md"
      >
        <DialogContent>
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
              {/* Loan Image and Details */}
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
                  Experience fast approvals and easy repayments with flexible
                  terms.
                </Typography>
              </Box>

              {/* Loan Calculator Inputs */}
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

                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography variant="h6">
                      Total Amount Payable (₹)
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                    >
                      {totalAmount.toFixed(2)}
                    </Typography>
                  </Grid>
                </Grid>

                <Box
                  sx={{
                    marginTop: 3,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Button
                    variant="contained"
                    color="error"
                    onClick={cancelLoanApplication}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    disabled={isLoading}
                    sx={{ backgroundColor: "#F26722", color: "white" }}
                  >
                    {isLoading ? "Submitting..." : "Submit"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoanCalculator;
