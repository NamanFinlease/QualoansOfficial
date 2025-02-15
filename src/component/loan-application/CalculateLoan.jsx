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
  TextField,
} from "@mui/material";
import WorkIcon from "@mui/icons-material/Work";
import loanImage from "../../assets/image/Untitled design.gif";
import axios from "axios";
import { BASE_URL } from "../../baseURL";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { form } from "framer-motion/client";

const LoanCalculator = ({ onComplete, disabled, isUploaded }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isComplete, setIsComplete] = useState(false); // Add this state for completion tracking
  const [formValues, setFormValues] = useState({
    loanPurpose: "",
    principal: 5000,
    tenure: 1,
    roi: 0.5,
    totalPayble: 0,
  });

  const openLoanCalculatorModal = () => {
    if (!disabled) {
      setIsModalOpen(true);
    }
  };

  const closeLoanCalculatorModal = () => {
    setIsModalOpen(false);
  };

  // const calculateTotalAmount = () => {
  //   const totalInterest =
  //     (formValues.principal * formValues.roi * formValues.tenure) / 100;
  //   const total = formValues.principal + totalInterest;
  //   // setTotalAmount(total);
  //   setFormValues((prev) => ({ ...prev, totalPayble: total }));
  // };

  const calculateTotalAmount = () => {
    const principal = parseFloat(formValues.principal) || 0;
    const roi = parseFloat(formValues.roi) || 0;
    const tenure = parseFloat(formValues.tenure) || 0;

    const totalInterest = (principal * roi * tenure) / 100;
    const total = principal + totalInterest;

    setFormValues((prev) => ({ ...prev, totalPayble: total }));
  };

  useEffect(() => {
    calculateTotalAmount();
  }, [
    formValues.principal,
    formValues.tenure,
    formValues.roi,
    formValues.totalPayble,
  ]);

  console.log("Loan Amount:", formValues.totalPayble);

  const handleSubmit = async () => {
    if (!formValues.loanPurpose) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please select a loan purpose!",
      });
      return;
    }

    const payload = {
      principal: formValues.principal,
      totalPayble: formValues.totalPayble.toFixed(2),
      roi: formValues.roi,
      tenure: formValues.tenure,
      loanPurpose: formValues.loanPurpose.toUpperCase(),
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
      alert(error.response.data.message);
      setIsModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const cancelLoanApplication = () => {
    alert(
      "Process Cancelled: Your loan application process has been cancelled."
    );
    setIsModalOpen(false);
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
        // console.log(
        //   "getDashboardDetailsResponse >>> ",
        //   getDashboardDetailsResponse
        // );
        const { isLoanCalculated } = getDashboardDetailsResponse.data || {};

        // console.log("isLoanCalculated>>>>:", isLoanCalculated);

        // Set the value of isAddressVerified based on the fetched response
        setIsComplete(isLoanCalculated);

        //if (isLoanCalculated || isUploaded) {
        const getProfileDetailsResponse = await axios.get(
          `${BASE_URL}/getApplicationDetails?applicationStatus=loanDetails`,
          {
            withCredentials: true,
          }
        );

        console.log(
          "getProfileDetailsResponse >>> ",
          getProfileDetailsResponse?.data?.data
        );

        const LoanData = getProfileDetailsResponse?.data?.data;

        // Update formValues with residenceData
        setFormValues({
          principal: LoanData?.principal || "",
          totalPayble: LoanData?.totalPayble || "",
          roi: LoanData?.roi || "",
          tenure: LoanData?.tenure || "",
          loanPurpose: LoanData?.loanPurpose || "",
        });
        // }
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
          {isComplete || isUploaded ? (
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
                    value={formValues.loanPurpose}
                    label="Purpose of Loan"
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        loanPurpose: e.target.value,
                      })
                    }
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
                  <TextField
                    fullWidth
                    // label="Enter Loan Amount"
                    value={formValues.principal}
                    onChange={(e, newValue) => {
                      const value = Number(e.target.value);
                      if (value >= 5000 && value <= 100000) {
                        setFormValues(() => ({
                          ...formValues,
                          principal: newValue,
                        }));
                      }
                    }}
                    variant="outlined"
                    margin="normal"
                    type="number"
                  />
                  <Slider
                    value={formValues.principal}
                    min={5000}
                    max={100000}
                    step={500}
                    onChange={(e, newValue) =>
                      setFormValues(() => ({
                        ...formValues,
                        principal: newValue,
                      }))
                    }
                    valueLabelDisplay="auto"
                    sx={{ color: "#fc8403" }}
                  />
                </Box>

                <Box sx={{ marginBottom: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Loan Tenure (Days)
                  </Typography>
                  <TextField
                    fullWidth
                    // label="Enter Loan Amount"
                    value={formValues.tenure}
                    onChange={(e, newValue) => {
                      const value = Number(e.target.value);
                      if (value >= 1 && value <= 90) {
                        setFormValues(() => ({
                          ...formValues,
                          tenure: newValue,
                        }));
                      }
                    }}
                    variant="outlined"
                    margin="normal"
                    type="number"
                  />
                  <Slider
                    value={formValues.tenure}
                    min={1}
                    max={90}
                    onChange={(e, newValue) =>
                      setFormValues(() => ({
                        ...formValues,
                        tenure: newValue,
                      }))
                    }
                    valueLabelDisplay="auto"
                    sx={{ color: "#fc8403" }}
                  />
                </Box>

                <Box sx={{ marginBottom: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Interest Rate (%)
                  </Typography>
                  <TextField
                    fullWidth
                    // label="Enter Loan Amount"
                    value={formValues.roi}
                    onChange={(e, newValue) => {
                      const value = Number(e.target.value);
                      if (newValue >= 0.5 && newValue <= 2) {
                        setFormValues(() => ({
                          ...formValues,
                          roi: newValue,
                        }));
                      }
                    }}
                    variant="outlined"
                    margin="normal"
                    type="number"
                  />
                  <Slider
                    value={formValues.roi}
                    min={0.5}
                    max={2}
                    step={0.1}
                    onChange={(e, newValue) =>
                      setFormValues(() => ({
                        ...formValues,
                        roi: newValue,
                      }))
                    }
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
                      {formValues?.totalPayble}
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
